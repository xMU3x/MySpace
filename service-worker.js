const V='myspace-v4',CORE=['./','index.html','manifest.json','css/tokens.css','css/base.css','css/components.css','css/pages.css','js/icons.js','js/core.js','js/ui.js','js/sync.js','js/views/common.js','js/views/lines.js','js/views/inventory.js','js/views/lists.js','js/app.js','fonts/outfit-latin-wght-normal.woff2','fonts/ibm-plex-sans-arabic-arabic-400-normal.woff2','fonts/ibm-plex-sans-arabic-arabic-500-normal.woff2','fonts/ibm-plex-sans-arabic-arabic-700-normal.woff2','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);
 if(r.method!=='GET'||u.origin!==location.origin)return;
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>{
  const net=fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res}).catch(()=>hit||(r.mode==='navigate'?caches.match('index.html'):Response.error()));
  if(hit)e.waitUntil(net);return hit||net}))});
