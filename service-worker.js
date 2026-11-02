const V='myspace-v2',CORE=['./','index.html','manifest.json','icons/icon-192.png','icons/icon-512.png','fonts/ping-ar-lt-light.woff2'];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);
 if(r.method!=='GET'||!(u.origin===location.origin||u.hostname.startsWith('fonts.g')))return;
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>{
  const net=fetch(r).then(res=>{if(res.ok||res.type==='opaque'){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res}).catch(()=>hit||(r.mode==='navigate'?caches.match('index.html'):Response.error()));
  if(hit)e.waitUntil(net);return hit||net}))});
