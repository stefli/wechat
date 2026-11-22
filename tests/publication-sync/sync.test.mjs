import {test,before,after} from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {SyncCore,HttpTransport,keyOf,LEGACY_KEY,CACHE_KEY,normalize} from '../../public/sync-core.mjs';
// HTTP + disk-backed test fixture, deliberately NOT a deployable authentication service.
// Production uses GitHub authentication, repo permissions and Contents SHA CAS, not this fixture.
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'library-sync-'));
const disk=path.join(dir,'records.json');fs.writeFileSync(disk,'{}');
const readDisk=()=>JSON.parse(fs.readFileSync(disk,'utf8'));
const server=http.createServer(async(req,res)=>{
 res.setHeader('Cache-Control','no-store');res.setHeader('Content-Type','application/json');
 if(!['Bearer TEST_DEVICE_A','Bearer TEST_DEVICE_B'].includes(req.headers.authorization)){res.writeHead(401);res.end('{}');return;}
 if(req.url==='/records'&&req.method==='GET'){res.end(JSON.stringify(readDisk()));return;}
 if(req.url!=='/record'||req.method!=='PUT'){res.writeHead(405);res.end('{}');return;}
 let body='';for await(const part of req)body+=part;
 let op;try{op=JSON.parse(body);keyOf(...JSON.parse(op.key));normalize(op.value);if(!Number.isSafeInteger(op.expectedRevision)||op.expectedRevision<0||!op.operationId)throw Error();}catch{res.writeHead(400);res.end('{}');return;}
 // Synchronous CAS+atomic rename after body collection; no async gap in critical section.
 const all=readDisk(),current=all[op.key];
 if(current?.operationId===op.operationId){res.end(JSON.stringify({record:current}));return;}
 if((current?.revision||0)!==op.expectedRevision){res.writeHead(409);res.end(JSON.stringify({current}));return;}
 const record={value:normalize(op.value),revision:(current?.revision||0)+1,operationId:op.operationId};all[op.key]=record;
 fs.writeFileSync(disk+'.tmp',JSON.stringify(all));fs.renameSync(disk+'.tmp',disk);res.end(JSON.stringify({record}));
});
let base;
before(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));base='http://127.0.0.1:'+server.address().port;});
after(()=>{server.close();});
class MemoryStorage{map=new Map();getItem(k){return this.map.get(k)||null;}setItem(k,v){this.map.set(k,String(v));}}
let seq=0;
function client(who='A',storage=new MemoryStorage()){
 const state={offline:false,token:'TEST_DEVICE_'+who};
 const transport=new HttpTransport({baseUrl:base,getAccessToken:async()=>state.token,fetchImpl:(...args)=>{if(state.offline)throw new Error('network offline');return fetch(...args);}});
 return {storage,state,transport,core:new SyncCore({storage,transport,idFactory:()=>who+'-'+(++seq)})};
}
const key=(s,p='douyin')=>keyOf('tvp',s,p);
test('two independent HTTP clients: A published + date -> B sees; B skip -> A sees and preserves date',async()=>{
 const a=client(),b=client('B'),k=key('pika-enact');
 a.core.set(k,{s:'published',at:'2026-11-21'});assert.equal((await a.core.sync()).phase,'synced');
 await b.core.sync();assert.deepEqual(b.core.get(k),{s:'published',at:'2026-11-21'});
 b.core.set(k,{s:'skip',at:''});await b.core.sync();await a.core.sync();
 assert.deepEqual(a.core.get(k),{s:'skip',at:'2026-11-21'});
});
test('non-overlapping concurrent per-platform writes do not overwrite either record',async()=>{
 const a=client(),b=client('B'),d=key('kyutai-aura'),c=key('kyutai-aura','channels');
 await Promise.all([a.core.sync(),b.core.sync()]);a.core.set(d,{s:'published',at:'2026-11-20'});b.core.set(c,{s:'skip',at:''});
 await Promise.all([a.core.sync(),b.core.sync()]);await Promise.all([a.core.sync(),b.core.sync()]);
 assert.equal(a.core.get(c).s,'skip');assert.equal(b.core.get(d).s,'published');
});
test('same-key race rejects stale revision; requires explicit conflict resolution',async()=>{
 const a=client(),b=client('B'),k=key('gestalt-stealth-design');await Promise.all([a.core.sync(),b.core.sync()]);
 a.core.set(k,{s:'published',at:'2026-11-19'});b.core.set(k,{s:'skip',at:''});await Promise.all([a.core.sync(),b.core.sync()]);
 const loser=a.core.status().conflicts?a:b;assert.equal(loser.core.status().conflicts,1);
 const winnerValue=readDisk()[k].value;assert.ok(['published','skip'].includes(winnerValue.s));
 loser.core.resolve(k,'local');await loser.core.sync();assert.equal(loser.core.status().phase,'synced');
});
test('legacy backup byte-for-byte; defaults cannot overwrite real remote record; historical date preserved',async()=>{
 const a=client(),k=key('legacy-existing');a.core.set(k,{s:'published',at:'2026-10-01'});await a.core.sync();
 const b=client('B');const raw=JSON.stringify({tvp:{'legacy-existing':{douyin:{s:'unset',at:''}},'legacy-only':{channels:{s:'published',at:'2026-10-02'}}}});
 b.storage.setItem(LEGACY_KEY,raw);await b.core.sync();const report=b.core.migrateLegacy();
 assert.equal(b.storage.getItem(report.backup),raw);assert.equal(b.storage.getItem(LEGACY_KEY),raw);assert.equal(report.ignoredDefaults,1);
 await b.core.sync();assert.equal(readDisk()[k].value.at,'2026-10-01');assert.equal(readDisk()[key('legacy-only','channels')].value.at,'2026-10-02');
 assert.equal(b.core.migrateLegacy().imported,0);
});
test('legacy valid disagreement becomes conflict, not last-writer-wins',async()=>{
 const a=client(),k=key('legacy-conflict');a.core.set(k,{s:'published',at:'2026-10-03'});await a.core.sync();
 const b=client('B');b.storage.setItem(LEGACY_KEY,JSON.stringify({tvp:{'legacy-conflict':{douyin:'skip'}}}));await b.core.sync();b.core.migrateLegacy();await b.core.sync();
 assert.equal(b.core.status().conflicts,1);assert.equal(readDisk()[k].value.s,'published');b.core.resolve(k,'remote');assert.equal(b.core.get(k).at,'2026-10-03');
});
test('old remote seed is imported only when key absent; never overwrite explicit remote unset',async()=>{
 const a=client(),k=key('explicit-unset');a.core.set(k,{s:'unset',at:''});await a.core.sync();
 const b=client('B');await b.core.sync();b.storage.setItem(LEGACY_KEY,JSON.stringify({tvp:{'explicit-unset':{douyin:{s:'published',at:'2026-10-04'}}}}));b.core.migrateLegacy();
 assert.equal(b.core.status().conflicts,1);assert.equal(readDisk()[k].value.s,'unset');
});
test('offline queue survives client restart; does not claim synced; retries after network returns',async()=>{
 const a=client(),k=key('offline');await a.core.sync();a.state.offline=true;a.core.set(k,{s:'published',at:'2026-11-22'});
 assert.equal((await a.core.sync()).phase,'offline');assert.equal(a.core.status().pending,1);assert.equal(readDisk()[k],undefined);
 const reloaded=client('A',a.storage);assert.equal(reloaded.core.status().pending,1);await reloaded.core.sync();assert.equal(reloaded.core.status().phase,'synced');assert.equal(readDisk()[k].value.at,'2026-11-22');
});
test('offline queue does not clobber another device change when reconnecting',async()=>{
 const a=client(),b=client('B'),k=key('offline-conflict');await Promise.all([a.core.sync(),b.core.sync()]);a.state.offline=true;a.core.set(k,{s:'published',at:'2026-11-21'});await a.core.sync();
 b.core.set(k,{s:'skip',at:''});await b.core.sync();a.state.offline=false;await a.core.sync();assert.equal(a.core.status().phase,'conflict');assert.equal(readDisk()[k].value.s,'skip');
});
test('unauthorized and missing session writes refused, pending retained',async()=>{
 const a=client(),k=key('unauthorized');a.state.token='NOT_ALLOWED';a.core.set(k,{s:'published',at:'2026-11-22'});
 assert.equal((await a.core.sync()).phase,'auth-required');assert.equal(a.core.status().pending,1);assert.equal(readDisk()[k],undefined);
 const r=await fetch(base+'/record',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({key:k,value:{s:'skip',at:''},expectedRevision:0,operationId:'evil'})});assert.equal(r.status,401);
});
test('malformed legacy remains unchanged and backed up; no invented dates',()=>{
 const a=client();a.storage.setItem(LEGACY_KEY,'{bad');assert.throws(()=>a.core.migrateLegacy());assert.equal(a.storage.getItem(LEGACY_KEY),'{bad');
 const b=client();b.storage.setItem(LEGACY_KEY,JSON.stringify({tvp:{'no-date':{douyin:'published'}}}));b.core.migrateLegacy();assert.equal(b.core.get(key('no-date')).at,'');
});
test('invalid dates/states/keys rejected and corrupt v2 cache never silently cleared',()=>{
 assert.throws(()=>normalize({s:'published',at:'2026-02-31'}));assert.throws(()=>normalize({s:'bogus'}));assert.throws(()=>keyOf('tvp','../bad','douyin'));
 const storage=new MemoryStorage();storage.setItem(CACHE_KEY,'bad');assert.throws(()=>client('A',storage));assert.equal(storage.getItem(CACHE_KEY),'bad');
});
test('article platform and tvp platform namespaces remain isolated',async()=>{
 const a=client(),article=keyOf('articles','same-slug','weixin'),tvp=key('same-slug');a.core.set(article,{s:'published',at:'2026-11-01'});a.core.set(tvp,{s:'skip',at:''});await a.core.sync();
 const b=client('B');await b.core.sync();assert.equal(b.core.get(article).s,'published');assert.equal(b.core.get(tvp).s,'skip');
});
test('commit acknowledgement lost: retry reads operation id and does not increment revision twice',async()=>{
 const a=client(),k=key('lost-ack');await a.core.sync();a.core.set(k,{s:'published',at:'2026-11-22'});
 const original=a.transport.write.bind(a.transport);let once=true;
 a.transport.write=async op=>{const r=await original(op);if(once){once=false;throw new Error('response lost');}return r;};
 assert.equal((await a.core.sync()).phase,'offline');assert.equal(a.core.status().pending,1);
 const rev=readDisk()[k].revision;await a.core.sync();assert.equal(a.core.status().phase,'synced');assert.equal(readDisk()[k].revision,rev);
});
test('fixture writes persist on disk independently of either client cache',async()=>{
 const a=client(),k=key('durable-record');a.core.set(k,{s:'published',at:'2026-11-15'});await a.core.sync();
 const raw=JSON.parse(fs.readFileSync(disk,'utf8'));assert.equal(raw[k].value.at,'2026-11-15');
 const fresh=client('B',new MemoryStorage());await fresh.core.sync();assert.equal(fresh.core.get(k).at,'2026-11-15');
});
