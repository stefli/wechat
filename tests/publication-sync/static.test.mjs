import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import path from 'node:path';
const root=new URL('../../',import.meta.url).pathname;
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const assets=['library.js','library.css','library-ui.mjs','sync-core.mjs','github-transport.mjs','pat-session.mjs','publication-sync-help.html'];
test('public and pages have identical shared sync assets and builder preserves modules',()=>{
 for(const f of assets){assert.equal(read('public/'+f),read('pages/'+f));assert.ok(read('scripts/build-index.py').includes('"'+f+'"'));}
});
test('89 TVP and 78 article entries remain intact, including recent shorts',()=>{
 const catalog=JSON.parse(read('public/tvp/catalog.json'));assert.equal(catalog.topics.length,89);
 for(const slug of ['pika-enact','obsbot-tail-air-2','kyutai-aura','gestalt-stealth-design'])assert.ok(catalog.topics.some(x=>x.slug===slug));
 assert.equal((read('public/index.html').match(/<li data-slug=/g)||[]).length,78);
});
test('state-only commits skip Actions without altering content deployment workflow',()=>{
 const workflow=read('.github/workflows/pages.yml');assert.match(workflow,/branches: \[main\]/);assert.match(workflow,/workflow_dispatch:/);
 const transport=read('public/github-transport.mjs');assert.match(transport,/message:'state: update one publication platform \[skip actions\]'/);
 // This adapter only PUTs one authorized state JSON file. It never commits content.
 assert.match(transport,/Status file outside allowed directory/);assert.doesNotMatch(workflow,/skip actions|paths-ignore/);
});
test('PAT input is masked and neither seeded, serialized with states, nor put in URL',()=>{
 const ui=read('public/library-ui.mjs'),transport=read('public/github-transport.mjs');assert.match(ui,/input\.type='password'/);assert.match(ui,/remember\.type='checkbox'/);assert.doesNotMatch(ui,/input\.value\s*=\s*(credentials|localStorage|sessionStorage)/);
 assert.doesNotMatch(ui,/console\./);assert.doesNotMatch(transport,/console\./);assert.doesNotMatch(ui,/GITHUB_NEWSDesk_PAT/);
 assert.match(transport,/Authorization:'Bearer '\+token/);assert.match(transport,/cache:'no-store'/);assert.match(transport,/credentials:'omit'/);
 const exporting=ui.slice(ui.indexOf('function downloadBackup()'),ui.indexOf('function chrome()'));assert.doesNotMatch(exporting,/credentials\.|PAT_KEY/);
 for(const f of ['public/index.html','public/tvp/index.html']){
  for(const match of read(f).matchAll(/<script[^>]+src=["']([^"']+)/g))assert.doesNotMatch(match[1],/^https?:|^\/\//);
 }
});
