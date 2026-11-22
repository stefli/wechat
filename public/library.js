/* The module URL follows this script, so article and TVP share one implementation. */
(function(){
 'use strict';
 var source=document.currentScript.src;
 import(new URL('library-ui.mjs',source).href).catch(function(){
  var h=document.querySelector('header.mast,header.top');
  if(h){var p=document.createElement('p');p.textContent='发布状态组件未加载；旧状态未改动，请检查网络后刷新。';p.setAttribute('role','alert');h.appendChild(p);}
 });
})();
