import {test} from 'node:test';import assert from 'node:assert/strict';
import {GitHubTransport} from '../../public/github-transport.mjs';
import {keyOf} from '../../public/sync-core.mjs';
const k=s=>keyOf('tvp',s,'douyin');
const op=(slug,s='published',id=slug)=>({key:k(slug),value:{s,at:s==='published'?'2026-11-21':''},expectedRevision:0,operationId:id});
function github(){
 let doc=null,sha=0;const events=[];let force409=0;
 const fetch=async(url,opt)=>{
  events.push({url,method:opt.method||'GET',cache:opt.cache});
  const reply=(obj,status=200)=>new Response(JSON.stringify(obj),{status});
  const token=opt.headers.Authorization;
  if(token==='Bearer denied')return reply({},403);if(token!=='Bearer VALID_USER_OAUTH_TEST')return reply({},401);
  if(url.endsWith('/user'))return reply({login:'stefli'});
  if(url.endsWith('/repos/stefli/wechat'))return reply({full_name:'stefli/wechat',private:false,permissions:{push:true}});
  if(opt.method!=='PUT')return doc?reply({encoding:'base64',sha:String(sha),content:Buffer.from(JSON.stringify(doc)).toString('base64')}):reply({},404);
  const b=JSON.parse(opt.body);if(force409-- >0)return reply({},409);
  if((doc?String(sha):undefined)!==b.sha)return reply({},409);
  doc=JSON.parse(Buffer.from(b.content,'base64').toString());sha++;return reply({content:{sha:String(sha)}},201);
 };
 return {fetch,events,doc:()=>doc,set409:n=>force409=n};
}
function t(f,token='VALID_USER_OAUTH_TEST'){return new GitHubTransport({getUserAccessToken:async()=>token,fetchImpl:f.fetch,sleep:async()=>{}});}
test('independent GitHub clients round-trip and preserve publication date',async()=>{
 const f=github(),a=t(f),b=t(f);const x=op('roundtrip');await a.write(x);
 const seen=(await b.read())[x.key];assert.deepEqual(seen.value,x.value);
 await b.write({...x,value:{s:'skip',at:seen.value.at},expectedRevision:seen.revision,operationId:'skip-roundtrip'});
 assert.deepEqual((await a.read())[x.key].value,{s:'skip',at:'2026-11-21'});assert.ok(f.events.every(x=>x.cache==='no-store'));
});
test('Contents SHA race re-reads and merges other platforms instead of whole-store overwrite',async()=>{
 const f=github(),a=t(f),b=t(f);await Promise.all([a.write(op('a')),b.write(op('b'))]);assert.equal(Object.keys(f.doc().records).length,2);
});
test('same-platform semantic revision conflict is surfaced even after SHA retry',async()=>{
 const f=github(),a=t(f),b=t(f);const x=op('same','published','one'),y=op('same','skip','two');const outcomes=await Promise.all([a.write(x),b.write(y)]);
 assert.equal(outcomes.filter(x=>x.conflict).length,1);assert.equal(f.doc().records[x.key].revision,1);
});
test('401, 403 and missing session never fall back to anonymous public access',async()=>{
 const f=github();for(const token of ['bad','denied',''])await assert.rejects(()=>t(f,token).write(op('denied')));
 assert.equal(f.doc(),null);
});
test('same operation ID retry does not create another state commit',async()=>{
 const f=github(),a=t(f),x=op('idempotent');await a.write(x);const before=f.events.filter(x=>x.method==='PUT').length;await a.write(x);assert.equal(f.events.filter(x=>x.method==='PUT').length,before);
});
test('bounded retries preserve failure rather than pretend synced',async()=>{
 const f=github();f.set409(10);await assert.rejects(()=>t(f).write(op('retry')));assert.equal(f.doc(),null);
});
test('only designated repo and status directory are writable',()=>{
 assert.throws(()=>new GitHubTransport({getUserAccessToken:()=>'',repo:'elsewhere'}));assert.throws(()=>new GitHubTransport({getUserAccessToken:()=>'',file:'.github/workflows/pages.yml'}));
});
test('initial create 422 retries only after another writer advances remote SHA',async()=>{
 const f=github();let race=true;
 const wrapped={fetch:async(url,opt)=>{
  if(opt.method==='PUT'&&race){
   race=false;const body=JSON.parse(opt.body),other=op('other');
   body.content=Buffer.from(JSON.stringify({schema:1,records:{[other.key]:{value:other.value,revision:1,operationId:other.operationId}}})).toString('base64');
   await f.fetch(url,{...opt,body:JSON.stringify(body)});
   return new Response('{}',{status:422});
  }
  return f.fetch(url,opt);
 }};
 await t(wrapped).write(op('mine'));
 assert.deepEqual(Object.keys(f.doc().records).sort(),[k('mine'),k('other')].sort());
});
test('ordinary 422 validation failure is not retried or called synced',async()=>{
 const f=github();let puts=0;
 const wrapped={fetch:async(url,opt)=>opt.method==='PUT'?(puts++,new Response('{}',{status:422})):f.fetch(url,opt)};
 await assert.rejects(()=>t(wrapped).write(op('invalid')),e=>e.status===422);
 assert.equal(puts,1);assert.equal(f.doc(),null);
});
test('remote missing previously observed record surfaces explicit conflict',async()=>{
 const f=github();const result=await t(f).write({...op('missing'),expectedRevision:1});
 assert.deepEqual(result,{conflict:true,current:null});assert.equal(f.doc(),null);
});
