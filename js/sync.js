/* ===== sync: Supabase (نفس المنطق السابق) ===== */
const setSt=t=>{ST=t;const e=$('#st');if(!e)return;const ic=/جاري/.test(t)?'<span class="spin" style="width:13px;height:13px"></span>':/متزامن/.test(t)?I('clouddone'):/أوفلاين/.test(t)?I('cloudoff'):I('db');e.innerHTML=ic+'<span class="lbs">'+esc(t)+'</span>'},setSt0=()=>setSt(ST||(DB.cfg.tok?'':'محلي'));
async function auth(body,type){const c=DB.cfg,r=await fetch(c.url+'/auth/v1/token?grant_type='+type,{method:'POST',headers:{apikey:c.key,'Content-Type':'application/json'},body:JSON.stringify(body)}),j=await r.json();if(!r.ok)throw Error(j.error_description||j.msg||'فشل تسجيل الدخول');c.tok=j.access_token;c.ref=j.refresh_token;c.exp=Date.now()+j.expires_in*1e3-6e4;save()}
async function sx(path,o={}){const c=DB.cfg,r=await fetch(c.url+path,{...o,headers:{apikey:c.key,Authorization:'Bearer '+c.tok,'Content-Type':'application/json',...o.headers}});if(!r.ok)throw Error(r.status);const tx=await r.text();return tx?JSON.parse(tx):null}
async function sync(){const c=DB.cfg;if(busy||!c.tok||!navigator.onLine)return;busy=1;setSt('جاري المزامنة...');
 try{if(c.exp<Date.now())await auth({refresh_token:c.ref},'refresh_token');
  const d=Object.values(DB.recs).filter(r=>r.dirty);
  if(d.length){await sx('/rest/v1/records?on_conflict=id',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=minimal'},body:JSON.stringify(d.map(r=>({id:r.id,kind:r.kind,data:{...r.d,_c:r.c},deleted:!!r.del})))});d.forEach(r=>{if(DB.recs[r.id]===r)delete r.dirty})}
  const rows=await sx('/rest/v1/records?select=*&order=updated_at.asc&limit=1000&updated_at=gt.'+encodeURIComponent(DB.lastPull||'1970-01-01T00:00:00Z'));let ch=0;
  rows.forEach(w=>{const l=DB.recs[w.id];DB.lastPull=w.updated_at;if(l&&l.dirty)return;const{_c,...dd}=w.data;DB.recs[w.id]={id:w.id,kind:w.kind,d:dd,u:w.updated_at,del:w.deleted,c:_c||Date.now()};ch++});
  save();setSt('متزامن');if(ch&&$('#modal').hidden){render();toast('تم تحديث البيانات من السحابة')}}catch(x){setSt('أوفلاين / خطأ مزامنة')}busy=0}
addEventListener('online',sync);setInterval(sync,6e4);
