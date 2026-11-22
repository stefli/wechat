/* Publication-state engine. GitHub transport authenticates every request and
 * merges semantic per-platform revisions against the latest Contents SHA.
 * Callers serialize shared-cache operations with the browser Web Locks API. */
export const LEGACY_KEY = 'laoli-library-status-v1';
export const CACHE_KEY = 'laoli-library-sync-v2';
const BACKUP_PREFIX = 'laoli-library-v1-backup:';
const PLATFORMS = {articles: ['weixin', 'toutiao', 'xiaohongshu'], tvp: ['douyin', 'channels']};
const STATES = ['unset', 'published', 'skip'];
const clone = x => JSON.parse(JSON.stringify(x));
const same = (a,b) => !!a && !!b && a.s === b.s && a.at === b.at;
export function keyOf(bucket,slug,platform) {
  if (!PLATFORMS[bucket]?.includes(platform) || !/^[a-z0-9][a-z0-9_-]{0,159}$/.test(slug)) throw new Error('invalid key');
  return JSON.stringify([bucket,slug,platform]);
}
export function normalize(input) {
  const r = typeof input === 'string' ? {s:input,at:''} : input;
  if (!r || !STATES.includes(r.s)) throw new Error('invalid state');
  const at = r.at || '';
  if (typeof at !== 'string' || (at && !/^\d{4}-\d{2}-\d{2}$/.test(at))) throw new Error('invalid date');
  if (at && new Date(at+'T00:00:00Z').toISOString().slice(0,10)!==at) throw new Error('invalid date');
  return {s:r.s,at}; // Never infer a historical publication date.
}
export class SyncCore {
  constructor({storage, transport, idFactory=()=>globalThis.crypto.randomUUID()}) {
    this.storage=storage; this.transport=transport; this.id=idFactory;
    const raw=storage.getItem(CACHE_KEY);
    // Corrupt v2 cache is not silently replaced; caller must show recovery UI.
    this.data=raw?JSON.parse(raw):{version:2,server:{},pending:{},conflicts:{},migrated:{},legacyScan:{}};
    if (this.data.version!==2) throw new Error('unsupported cache version');
    this.phase='idle'; this.lastError=''; this.busy=null;
  }
  save(){this.storage.setItem(CACHE_KEY,JSON.stringify(this.data));}
  snapshot(){return clone(this.data);}
  get(key){return clone(this.data.pending[key]?.value || this.data.server[key]?.value || {s:'unset',at:''});}
  status(){return {phase:this.phase,error:this.lastError,pending:Object.keys(this.data.pending).length,conflicts:Object.keys(this.data.conflicts).length};}
  // Caller must first pull, display source/remote status, and let owner confirm conflicts.
  // The legacy key is never deleted or rewritten. Back up raw bytes BEFORE parsing.
  migrateLegacy(){
    const raw=this.storage.getItem(LEGACY_KEY);
    if(!raw || this.data.legacyBackupRaw===raw)return {imported:0,ignoredDefaults:0};
    if(this.data.legacyInvalidRaw===raw)throw new Error('旧状态无法解析；原文已备份，未改动');
    const backup=BACKUP_PREFIX+this.id(); this.storage.setItem(backup,raw);
    let legacy;
    try{legacy=JSON.parse(raw);}catch(e){this.lastError='旧状态无法解析；原文已备份，未改动';this.data.legacyInvalidRaw=raw;this.save();throw e;}
    let imported=0,ignoredDefaults=0; const errors=[];
    for(const bucket of Object.keys(PLATFORMS)) {
      for(const [slug,item] of Object.entries(legacy[bucket]||{})) {
        for(const platform of PLATFORMS[bucket]) {
          if (!Object.hasOwn(item,platform))continue;
          let key,value;
          try{key=keyOf(bucket,slug,platform);value=normalize(item[platform]);}catch(e){errors.push([bucket,slug,platform,e.message]);continue;}
          if(value.s==='unset'){ignoredDefaults++;continue;}
          const signature=JSON.stringify(value);
          if(this.data.legacyScan[key]===signature)continue; // this browser's previously handled value
          this.data.legacyScan[key]=signature;
          if(this.data.pending[key] || this.data.conflicts[key]) {
            if(!same(this.data.pending[key]?.value,value))this.data.conflicts[key]={source:'legacy',local:value,remote:this.data.server[key]||null,reason:'另有待同步修改；需人工选择'};
            continue;
          }
          const remote=this.data.server[key];
          if(remote && !same(remote.value,value)){
            this.data.conflicts[key]={source:'legacy',local:value,remote:clone(remote),reason:'旧设备状态与远端不同；不自动覆盖'};
          }else if(!remote){
            this.data.pending[key]={id:this.id(),source:'migration',value,expectedRevision:0};imported++;
          }else this.data.migrated[key]=signature;
        }
      }
    }
    this.data.legacyBackupRaw=raw;this.save(); return {imported,ignoredDefaults,errors,backup};
  }
  set(key,input){
    JSON.parse(keyOf(...JSON.parse(key))); const value=normalize(input);
    if(this.data.conflicts[key])throw new Error('resolve conflict before editing');
    const remote=this.data.server[key];
    // Preserve known publication date when switching to skip/unset; never invent one.
    if(value.s!=='published' && !value.at)value.at=this.get(key).at || '';
    this.data.pending[key]={id:this.id(),source:'edit',value,expectedRevision:remote?.revision||0};
    this.save();return this.get(key);
  }
  resolve(key,choice){
    const c=this.data.conflicts[key];if(!c)throw new Error('no conflict');
    if(choice==='remote'){
      if(c.remote)this.data.server[key]=clone(c.remote);
      delete this.data.pending[key];
    }else if(choice==='local'){
      // Explicit owner confirmation is the ONLY path to overwrite a differing record.
      const remote=this.data.server[key] || c.remote;
      this.data.pending[key]={id:this.id(),source:'resolution',value:normalize(c.local),expectedRevision:remote?.revision||0};
    }else throw new Error('invalid resolution');
    delete this.data.conflicts[key];this.save();
  }
  async sync(){
    if(this.busy)return this.busy;
    this.busy=this._sync().finally(()=>{this.busy=null;});return this.busy;
  }
  async _sync(){
    this.phase='syncing';this.lastError='';
    try{
      const records=await this.transport.read();
      // Validate the complete read before changing the local confirmed snapshot.
      for(const [key,remote] of Object.entries(records)){
        keyOf(...JSON.parse(key));normalize(remote.value);
        if(!Number.isSafeInteger(remote.revision)||remote.revision<1)throw new Error('invalid server revision');
      }
      this.data.server=clone(records);this.data.remoteRead=true;
      for(const [key,p] of Object.entries(this.data.pending)){
        if(!records[key] && p.expectedRevision>0)this.data.conflicts[key]={source:p.source,local:clone(p.value),remote:null,reason:'远端记录缺失；需人工选择'};
      }
      for(const [key,remote] of Object.entries(records)){
        const p=this.data.pending[key];
        if(p && remote.revision!==p.expectedRevision){
          // Handles an acknowledgement lost after commit, without inventing success.
          if(remote.operationId===p.id){delete this.data.pending[key];}
          else if(same(remote.value,p.value)){delete this.data.pending[key];}
          else this.data.conflicts[key]={source:p.source,local:clone(p.value),remote:clone(remote),reason:'另一设备已修改；需人工选择'};
        }
      }
      this.save();
      for(const [key,p] of Object.entries(this.data.pending)){
        if(this.data.conflicts[key])continue;
        // A live edit after this loop snapshot gets a new id; never delete that new op.
        const response=await this.transport.write({key,value:p.value,expectedRevision:p.expectedRevision,operationId:p.id});
        if(response.conflict){
          this.data.server[key]=clone(response.current);
          this.data.conflicts[key]={source:p.source,local:clone(p.value),remote:clone(response.current),reason:'并发修改；需人工选择'};
        }else{
          this.data.server[key]=clone(response.record);
          if(this.data.pending[key]?.id===p.id)delete this.data.pending[key];
          // New edit may be in flight: force a CAS conflict/review rather than bulk overwrite.
        }
        this.save();
      }
      this.phase=Object.keys(this.data.conflicts).length?'conflict':Object.keys(this.data.pending).length?'pending':'synced';
    }catch(e){this.phase=e.status===401||e.status===403?'auth-required':'offline';this.lastError=e.message;}
    return this.status();
  }
}
export class HttpTransport {
  constructor({baseUrl,getAccessToken,fetchImpl=globalThis.fetch}){
    this.base=baseUrl;this.token=getAccessToken;this.fetch=fetchImpl;
  }
  async request(path,options={}){
    const token=await this.token();
    if(!token){const e=new Error('请登录后同步；待同步修改仍保留在本机');e.status=401;throw e;}
    const r=await this.fetch(this.base+path,{...options,cache:'no-store',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token,...options.headers}});
    if(r.status===409)return {conflict:true,...await r.json()};
    if(!r.ok){const e=new Error('同步失败 HTTP '+r.status+'；未确认远端保存');e.status=r.status;throw e;}
    return r.json();
  }
  read(){return this.request('/records');}
  write(operation){return this.request('/record',{method:'PUT',body:JSON.stringify(operation)});}
}
