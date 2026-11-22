import {SyncCore,keyOf,normalize,LEGACY_KEY,CACHE_KEY} from './sync-core.mjs';
import {GitHubTransport} from './github-transport.mjs';
import {PATSession,REMEMBER_PAT_KEY} from './pat-session.mjs';

const labels={unset:'未发',published:'已发',skip:'不发'};
const stateOrder=['unset','published','skip'];
const kind=document.documentElement.dataset.lib==='tvp'?'tvp':'article';
const bucket=kind==='tvp'?'tvp':'articles';
const platforms=kind==='tvp'?[['douyin','抖音'],['channels','视频号']]:[['weixin','公众号'],['toutiao','头条'],['xiaohongshu','小红书']];
const platformLabels={douyin:'抖音',channels:'视频号',weixin:'公众号',toutiao:'头条',xiaohongshu:'小红书'};
const base=new URL('.',import.meta.url);
const lockName='laoli-library-state-v2';
const credentials=new PATSession({sessionStorage,localStorage});
const transport=new GitHubTransport({getUserAccessToken:()=>credentials.get()});
let core,filter='all',notice='',working=false,lastSuccess='',legacy={articles:{},tvp:{}};
let connected=false;
const locksSupported=!!navigator.locks?.request;
try{legacy=JSON.parse(localStorage.getItem(LEGACY_KEY)||'{}');}catch{notice='旧状态无法解析，原数据未改动；请先下载备份。';}
const hosts=()=>Array.from(document.querySelectorAll(kind==='tvp'?'article.card[data-slug]':'ul.articles li[data-slug]'));
const shanghaiDate=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
function el(tag,text,className){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(className)n.className=className;return n;}
function button(text,handler){const b=el('button',text);b.type='button';b.addEventListener('click',handler);return b;}
function fresh(){core=new SyncCore({storage:localStorage,transport});}
function value(slug,platform){
 const key=keyOf(bucket,slug,platform);
 if(core.data.pending[key]||core.data.server[key]||core.data.remoteRead)return core.get(key);
 try{return normalize(legacy?.[bucket]?.[slug]?.[platform]||'unset');}catch{return {s:'unset',at:''};}
}
function pending(slug){return platforms.some(([p])=>value(slug,p).s==='unset');}
async function transaction(fn){
 if(!locksSupported){notice='此浏览器不支持 Web Locks，已禁用修改以避免多标签丢数据；请升级浏览器。';render();return;}
 try{
  await navigator.locks.request(lockName,async()=>{
   working=true;fresh();render();
   try{await fn();}finally{working=false;render();}
  });
 }catch{
  working=false;notice='操作未完成；本机数据未主动清除。请检查存储权限、网络或重新配置 PAT。';render();
 }
}
async function synchronize(migrate=true){
 if(!credentials.get()){connected=false;notice='尚未配置 PAT：修改只保留本机待同步，不代表其他设备已更新。';return;}
 const status=await core.sync();
 if(status.phase==='auth-required'){connected=false;notice='PAT 已失效或无权限（401/403）；请重新配置，待同步及旧状态保留。';return;}
 if(status.phase==='offline'){notice='远端保存未确认：'+status.error;return;}
 connected=true;
 if(migrate){
  try{core.migrateLegacy();}catch{notice='旧数据解析/备份失败；原数据未删除，停止自动迁移，请下载备份。';return;}
  if(Object.keys(core.data.pending).length){await core.sync();}
 }
 const final=core.status();
 if(final.phase==='synced'){
  lastSuccess=new Date().toLocaleTimeString('zh-CN',{timeZone:'Asia/Shanghai'});notice='';
 }else if(final.phase==='auth-required'){
  connected=false;notice='PAT 已失效或无权限，请重新配置；未确认远端保存。';
 }else if(final.phase==='offline'){notice='远端保存未确认：'+final.error;}
}
async function edit(slug,platform,next,date){
 await transaction(async()=>{
  const previous=value(slug,platform);
  core.set(keyOf(bucket,slug,platform),{s:next,at:date===undefined?(previous.at||(next==='published'?shanghaiDate():'')):date});
  notice='已保留本机修改，等待 GitHub 确认。';render();
  await synchronize();
 });
}
function renderItems(){
 let todo=0;
 for(const host of hosts()){
  const slug=host.dataset.slug;
  let status=host.querySelector('.pub-status');
  if(!status){status=el('div',undefined,'pub-status');const body=kind==='tvp'?(host.querySelector('.body')||host):host;body.insertBefore(status,kind==='tvp'?body.querySelector('.links'):null);}
  status.replaceChildren();
  for(const [platform,label]of platforms){
   const rec=value(slug,platform),key=keyOf(bucket,slug,platform);
   const chip=button(label+' · '+(rec.s==='published'&&rec.at?rec.at.slice(5):labels[rec.s]),ev=>{
    ev.preventDefault();ev.stopPropagation();
    edit(slug,platform,stateOrder[(stateOrder.indexOf(rec.s)+1)%3]);
   });
   chip.className='pub-chip is-'+rec.s;chip.disabled=!locksSupported||working||!!core.data.conflicts[key];
   chip.title='点击切换：未发 → 已发 → 不发'+(rec.at?'；保留发布日期 '+rec.at:'');
   status.append(chip);
   if(rec.s==='published'){
    const date=el('input');date.type='date';date.className='pub-date';date.value=rec.at;
    date.setAttribute('aria-label',slug+' '+label+' 已发日期');date.disabled=chip.disabled;
    date.addEventListener('change',()=>{if(date.value)edit(slug,platform,'published',date.value);});status.append(date);
   }
  }
  const isPending=pending(slug);if(isPending)todo++;
  host.classList.toggle('is-filtered',(filter==='pending'&&!isPending)||(filter==='done'&&isPending));
 }
 document.querySelectorAll('[data-filter]').forEach(b=>b.classList.toggle('is-current',b.dataset.filter===filter));
 document.getElementById('lib-summary').textContent=`共 ${hosts().length} 篇，还有 ${todo} 篇未发完。`;
}
function renderConflicts(){
 const section=document.getElementById('lib-conflicts');section.replaceChildren();
 const entries=Object.entries(core.data.conflicts);section.hidden=!entries.length;
 if(!entries.length)return;
 section.append(el('strong',`有 ${entries.length} 项冲突，需逐项选择；不会整库覆盖。`));
 for(const[key,c]of entries){
  const [b,slug,p]=JSON.parse(key);const row=el('div',undefined,'lib-conflict');
  const describe=v=>v?`${labels[v.s]} ${v.at||'日期未记录'}`:'无记录';
  row.append(el('span',`${b==='tvp'?'快播':'图文'} / ${slug} / ${platformLabels[p]}：本机 ${describe(c.local)}；GitHub ${describe(c.remote?.value)}`));
  for(const [choice,text]of [['remote','采用 GitHub'],['local','保留本机并同步']]){
   const b=button(text,()=>transaction(async()=>{core.resolve(key,choice);await synchronize();}));b.disabled=working||!locksSupported;row.append(b);
  }
  section.append(row);
 }
}
function render(){
 if(!core)return;
 renderItems();renderConflicts();
 const state=core.status();const auth=credentials.get();
 const text=working?'正在读取/同步 GitHub，请稍候…':notice||
 (state.conflicts?`有 ${state.conflicts} 项冲突待处理；未自动覆盖。`:
 state.pending?`本机有 ${state.pending} 项待同步，远端尚未全部确认。`:
 connected&&state.phase==='synced'?`GitHub 已确认同步${lastSuccess?' · '+lastSuccess+' 上海时间':''}；其他设备需连接后自动刷新。`:
 '尚未连接 GitHub；显示本机缓存/旧记录，不代表跨设备已同步。');
 const banner=document.getElementById('lib-sync-state');banner.textContent=text;banner.dataset.phase=working?'syncing':state.phase;
 document.getElementById('lib-credential-mode').textContent=auth?(credentials.remembered()?'PAT 已保存在此浏览器（明文，可清除）。':'PAT 仅保留本标签页会话，关页后需重新输入。'):'本浏览器尚未配置 PAT。';
 document.getElementById('lib-connect').disabled=working||!locksSupported;
 document.getElementById('lib-sync').disabled=working||!locksSupported;
 document.getElementById('lib-disconnect').disabled=working;
 document.getElementById('lib-clear').disabled=working;
}
function downloadBackup(){
 // Deliberate allowlist: credential keys must NEVER be included in exports.
 const backup={format:'laoli-publication-backup-v2',exportedAt:new Date().toISOString(),cache:core.snapshot(),legacyRaw:localStorage.getItem(LEGACY_KEY),legacyBackups:{}};
 for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k.startsWith('laoli-library-v1-backup:'))backup.legacyBackups[k]=localStorage.getItem(k);}
 const url=URL.createObjectURL(new Blob([JSON.stringify(backup,null,2)],{type:'application/json'}));
 const a=el('a');a.href=url;a.download='library-status-backup-'+shanghaiDate()+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function chrome(){
 const header=document.querySelector('header.mast,header.top');if(!header)throw new Error('Missing library header');
 if(!header.querySelector('.lib-nav')){
  const nav=el('nav',undefined,'lib-nav');nav.setAttribute('aria-label','稿件库分区');
  for(const[id,text,url]of [['article','图文',kind==='tvp'?'../':'./'],['tvp','科技快播',kind==='tvp'?'./':'./tvp/']]){const a=el('a',text,id===kind?'is-current':'');a.href=url;nav.append(a);}header.prepend(nav);
 }
 const bar=el('div',undefined,'lib-toolbar');bar.id='lib-toolbar';
 const filters=el('span',undefined,'lib-filter');filters.setAttribute('role','group');filters.setAttribute('aria-label','按发布状态筛选');
 for(const[id,text]of [['all','全部'],['pending','还有未发'],['done','已齐发']]){const b=button(text,()=>{filter=id;render();});b.dataset.filter=id;filters.append(b);}
 const summary=el('span',undefined,'lib-hint');summary.id='lib-summary';
 const sync=button('立即同步',()=>transaction(()=>synchronize()));sync.id='lib-sync';
 bar.append(filters,sync,button('下载状态备份（不含 PAT）',downloadBackup),summary);header.append(bar);
 const banner=el('p',undefined,'lib-sync-state');banner.id='lib-sync-state';banner.setAttribute('role','status');banner.setAttribute('aria-live','polite');header.append(banner);
 const details=el('details',undefined,'lib-settings');details.append(el('summary','发布状态设置 · GitHub PAT'));
 details.append(el('p','统一源：stefli/wechat 的 publication-state/status.json。状态、日期与提交历史公开；正文只读，不会替你发布到社交平台。'));
 details.append(el('p','手机和电脑分别输入你自己的 fine-grained PAT：仅选择 stefli/wechat，Contents 读写（Metadata 自动只读），无需 Actions/Workflows/Administration。仅接受 stefli 账号。不要把 PAT 发到聊天、链接或截图。'));
 const instructions=el('a','打开 GitHub fine-grained PAT 设置');instructions.href='https://github.com/settings/personal-access-tokens';instructions.target='_blank';instructions.rel='noopener noreferrer';details.append(instructions);
 const form=el('div',undefined,'lib-pat-form');form.setAttribute('role','form');
 const inputLabel=el('label','本浏览器的 PAT ');const input=el('input');input.type='password';input.id='lib-pat';input.name='publication-pat';input.autocomplete='off';input.spellcheck=false;input.setAttribute('autocapitalize','none');input.setAttribute('aria-label','GitHub PAT（不会发送到聊天）');inputLabel.append(input);
 const rememberLabel=el('label',undefined,'lib-remember');const remember=el('input');remember.type='checkbox';remember.id='lib-remember';rememberLabel.append(remember,document.createTextNode('记住 PAT（非加密存本浏览器；同源脚本可读取）'));
 const submit=el('button','验证并连接');submit.type='button';submit.id='lib-connect';
 form.append(inputLabel,rememberLabel,submit);
 input.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();submit.click();}});
 submit.addEventListener('click',async event=>{
  event.preventDefault();const entered=input.value;input.value='';const shouldRemember=remember.checked;remember.checked=false;
  if(!entered.trim()){notice='请输入自己的 PAT；不会预填现有发布凭证。';render();return;}
  await transaction(async()=>{
   // First verify the candidate in memory. Failed attempts never overwrite a valid saved PAT.
   const check=new GitHubTransport({getUserAccessToken:()=>entered.trim()});
   try{await check.verifyIdentity();}catch{notice='连接失败：PAT 无效、账号不是 stefli，或没有仓库权限；原配置和待同步保留。';return;}
   credentials.set(entered,shouldRemember);notice='身份及账号仓库写权限已验证；正在读取统一源，实际 token 写权限以保存结果为准。';
   await synchronize();
  });
 });
 details.append(form);
 details.append(el('p','默认使用 sessionStorage，仅此标签页会话；跨图文/快播沿用。勾选记住才写入 localStorage，均非加密；stefli.github.io 同源页面/扩展或 XSS 可能读取。建议最小权限、短有效期，用后撤销；不要在不信任的电脑保存。'));
 const mode=el('p');mode.id='lib-credential-mode';details.append(mode);
 const disconnect=button('断开并清除本浏览器 PAT',()=>transaction(async()=>{credentials.clear();connected=false;notice='已清除本标签页会话与此浏览器记住的 PAT；状态、备份、待同步保留。其他已打开标签页的会话 PAT 请分别断开。';}));disconnect.id='lib-disconnect';details.append(disconnect);
 const clear=button('清空输入框',()=>{input.value='';remember.checked=false;});clear.id='lib-clear';details.append(clear);
 const help=el('a','查看安全与迁移说明');help.href=new URL('publication-sync-help.html',base);details.append(help);header.append(details);
 const conflicts=el('section',undefined,'lib-conflicts');conflicts.id='lib-conflicts';conflicts.setAttribute('aria-label','发布状态冲突');header.append(conflicts);
}
async function start(){
 chrome();
 try{fresh();}catch{
  const message=document.getElementById('lib-sync-state');message.textContent='本机缓存无法解析；未覆盖原数据。请保留浏览器数据并联系维护者恢复。';return;
 }
 render();
 if(!locksSupported){notice='此浏览器不支持安全多标签锁；已禁用修改和同步，请升级浏览器。';render();return;}
 if(credentials.get())await transaction(()=>synchronize());
 setInterval(()=>{if(!document.hidden&&!working&&credentials.get())transaction(()=>synchronize());},20000);
 addEventListener('online',()=>{if(!working&&credentials.get())transaction(()=>synchronize());});
 document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!working&&credentials.get())transaction(()=>synchronize());});
 addEventListener('storage',event=>{
  if(event.key===CACHE_KEY&&!working){try{fresh();render();}catch{notice='其他标签页更新的缓存异常，已停止覆盖。';render();}}
  if(event.key===REMEMBER_PAT_KEY){connected=false;if(credentials.get()&&!working)transaction(()=>synchronize());else render();}
 });
}
start().catch(()=>{const n=document.getElementById('lib-sync-state');if(n)n.textContent='同步组件未完成初始化；没有清除旧状态，请检查浏览器存储/网络权限后刷新。';});
