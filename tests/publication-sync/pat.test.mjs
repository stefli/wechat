import {test} from 'node:test';import assert from 'node:assert/strict';
import {PATSession,SESSION_PAT_KEY,REMEMBER_PAT_KEY} from '../../public/pat-session.mjs';
class Store{map=new Map();getItem(k){return this.map.get(k)||null}setItem(k,v){this.map.set(k,String(v))}removeItem(k){this.map.delete(k)}}
const stores=()=>({sessionStorage:new Store(),localStorage:new Store()});
test('PAT defaults to session only; remember requires explicit opt-in',()=>{
 const s=stores(),c=new PATSession(s);c.set('FAKE_TEST_PAT');assert.equal(c.get(),'FAKE_TEST_PAT');assert.equal(c.remembered(),false);assert.equal(s.localStorage.getItem(REMEMBER_PAT_KEY),null);
 c.set('FAKE_REMEMBERED_PAT',true);assert.equal(s.sessionStorage.getItem(SESSION_PAT_KEY),null);assert.equal(c.remembered(),true);
 c.set('FAKE_NEW_SESSION_PAT');assert.equal(s.localStorage.getItem(REMEMBER_PAT_KEY),null);assert.equal(c.remembered(),false);
});
test('disconnect clears credential stores but not status cache or legacy',()=>{
 const s=stores();s.localStorage.setItem('laoli-library-status-v1','OLD_STATUS');s.localStorage.setItem('laoli-library-sync-v2','QUEUE');const c=new PATSession(s);c.set('FAKE',true);c.clear();assert.equal(c.get(),'');assert.equal(s.localStorage.getItem('laoli-library-status-v1'),'OLD_STATUS');assert.equal(s.localStorage.getItem('laoli-library-sync-v2'),'QUEUE');
});
test('independent browser sessions do not inherit PAT without deliberate persistence',()=>{
 const a=stores(),b=stores();new PATSession(a).set('FAKE_DEVICE_A');assert.equal(new PATSession(b).get(),'');
 const navigation=new PATSession(a);assert.equal(navigation.get(),'FAKE_DEVICE_A');
});
test('empty or malformed credentials never replace saved credentials',()=>{
 const s=stores(),c=new PATSession(s);c.set('FAKE_EXISTING');for(const bad of ['', ' ', 'FAKE WITH SPACE'])assert.throws(()=>c.set(bad));assert.equal(c.get(),'FAKE_EXISTING');
});
import {SyncCore,keyOf,LEGACY_KEY} from '../../public/sync-core.mjs';
test('a successful fresh pull replaces stale cached server state, not remote data',async()=>{
 const storage=new Store(),key=keyOf('tvp','deleted-record','douyin');let records={[key]:{value:{s:'published',at:'2026-11-18'},revision:1,operationId:'old'}};
 const core=new SyncCore({storage,transport:{read:async()=>records}});await core.sync();assert.equal(core.get(key).s,'published');records={};await core.sync();assert.equal(core.get(key).s,'unset');
});
test('missing remote record with pending edit asks for conflict resolution',async()=>{
 const storage=new Store(),key=keyOf('tvp','missing-pending','douyin');let records={[key]:{value:{s:'published',at:'2026-11-18'},revision:1,operationId:'old'}};
 const core=new SyncCore({storage,transport:{read:async()=>records},idFactory:()=> 'operation-new'});await core.sync();core.set(key,{s:'skip',at:''});records={};await core.sync();assert.equal(core.status().conflicts,1);assert.equal(core.snapshot().conflicts[key].remote,null);assert.equal(core.status().phase,'conflict');
});
test('malformed legacy raw is backed up once, never repeatedly or silently discarded',()=>{
 const storage=new Store();storage.setItem(LEGACY_KEY,'{bad');let n=0;const core=new SyncCore({storage,transport:{},idFactory:()=> 'backup-'+(++n)});assert.throws(()=>core.migrateLegacy());assert.throws(()=>core.migrateLegacy());assert.equal(n,1);assert.equal(storage.getItem(LEGACY_KEY),'{bad');
});
