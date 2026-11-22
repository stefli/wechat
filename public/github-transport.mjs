/* GitHub publication storage. The browser owner supplies their own PAT using
 * the password settings form. NEVER embed a publisher credential here. */
import {keyOf,normalize} from './sync-core.mjs';
const clone = x => JSON.parse(JSON.stringify(x));
const same = (a,b) => !!a && !!b && a.s===b.s && a.at===b.at;
function fail(message,status){const e=new Error(message);e.status=status;return e;}
function validate(doc){
 if(doc.schema!==1 || !doc.records || Array.isArray(doc.records))throw fail('Invalid GitHub status schema');
 for(const [key,r] of Object.entries(doc.records)){
  keyOf(...JSON.parse(key));normalize(r.value);
  if(!Number.isSafeInteger(r.revision)||r.revision<1||typeof r.operationId!=='string')throw fail('Invalid remote status record');
 }
 return doc;
}
function encode(text){const bytes=new TextEncoder().encode(text);let binary='';for(const b of bytes)binary+=String.fromCharCode(b);return btoa(binary);}
function decode(b64){return new TextDecoder('utf-8',{fatal:true}).decode(Uint8Array.from(atob(b64.replace(/\s/g,'')),c=>c.charCodeAt(0)));}
export class GitHubTransport {
 constructor({getUserAccessToken,fetchImpl=globalThis.fetch,owner='stefli',repo='wechat',branch='main',file='publication-state/status.json',allowedLogin='stefli',maxRetries=5,sleep=ms=>new Promise(r=>setTimeout(r,ms))}){
  if(owner!=='stefli'||repo!=='wechat')throw fail('Repository outside authorized scope');
  if(!/^publication-state\/[a-zA-Z0-9_-]+\.json$/.test(file))throw fail('Status file outside allowed directory');
  Object.assign(this,{token:getUserAccessToken,fetch:fetchImpl,owner,repo,branch,file,allowedLogin,maxRetries,sleep});
  this.endpoint=`https://api.github.com/repos/${owner}/${repo}`;
 }
 async request(url,options={}){
  const token=await this.token();if(!token)throw fail('请先通过GitHub正式授权；本机待同步修改已保留',401);
  const r=await this.fetch(url,{...options,cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',redirect:'error',headers:{Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28',Authorization:'Bearer '+token,...(options.body?{'Content-Type':'application/json'}:{}),...options.headers}});
  if(r.status===401||r.status===403)throw fail('GitHub授权失败或无权限；远端保存未确认',r.status);
  return r;
 }
 async verifyIdentity(){
  let r=await this.request('https://api.github.com/user');if(!r.ok)throw fail('GitHub身份检查失败',r.status);
  const u=await r.json();if(u.login!==this.allowedLogin)throw fail('当前GitHub账号未获准修改本稿件库',403);
  r=await this.request(this.endpoint);if(!r.ok)throw fail('GitHub仓库权限检查失败',r.status);
  const repo=await r.json();if(!repo.permissions?.push)throw fail('当前账号没有仓库写权限',403);
  return {login:u.login,repository:repo.full_name,public:!repo.private};
 }
 async load(){
  const url=`${this.endpoint}/contents/${this.file}?ref=${encodeURIComponent(this.branch)}`;
  const r=await this.request(url);
  // A 404 is treated as a missing file only AFTER identity/repo permission check
  // by the application, not as a successful login. Failed read never clears cache.
  if(r.status===404)return {sha:null,doc:{schema:1,records:{}}};
  if(!r.ok)throw fail('GitHub状态读取失败 HTTP '+r.status,r.status);
  const file=await r.json();
  if(file.encoding!=='base64'||typeof file.sha!=='string')throw fail('Unexpected GitHub Contents response');
  return {sha:file.sha,doc:validate(JSON.parse(decode(file.content)))};
 }
 async read(){await this.verifyIdentity();return (await this.load()).doc.records;}
 async write(op){
  await this.verifyIdentity();keyOf(...JSON.parse(op.key));const value=normalize(op.value);
  if(!Number.isSafeInteger(op.expectedRevision)||op.expectedRevision<0||!/^[a-zA-Z0-9_-]{1,160}$/.test(op.operationId))throw fail('Invalid operation');
  for(let attempt=0;attempt<this.maxRetries;attempt++){
   // Always re-read the latest document on every SHA retry. Never PUT a stale
   // cached whole-store snapshot over other platforms' new records.
   const {sha,doc}=await this.load();const current=doc.records[op.key];
   if(current?.operationId===op.operationId)return {record:current};
   if((current?.revision||0)!==op.expectedRevision){
    if(current&&same(current.value,value))return {record:current};
    return {conflict:true,current:current?clone(current):null};
   }
   const record={value,revision:(current?.revision||0)+1,operationId:op.operationId};
   const merged=clone(doc);merged.records[op.key]=record;
   const body={message:'state: update one publication platform [skip actions]',branch:this.branch,content:encode(JSON.stringify(merged,null,2)+'\n'),...(sha?{sha}:{})};
   const r=await this.request(`${this.endpoint}/contents/${this.file}`,{method:'PUT',body:JSON.stringify(body)});
   if(r.status===409){await this.sleep(100*(attempt+1));continue;}
   if(r.status===422){
    // GitHub may reject two concurrent initial creates as 'sha missing'. Retry
    // ONLY when a fresh read proves the remote SHA actually advanced.
    const latest=await this.load();
    if(latest.sha && latest.sha!==sha){await this.sleep(100*(attempt+1));continue;}
   }
   if(!r.ok)throw fail('GitHub状态写入未确认 HTTP '+r.status,r.status);
   return {record};
  }
  throw fail('并发更新频繁，已保留待同步队列；请重试',409);
 }
}
