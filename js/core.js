/* ===== core: أدوات + مخزن البيانات + الثيم ===== (الأيقونات في icons.js) */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)],uid=()=>Math.random().toString(36).slice(2,9)+Date.now().toString(36),LS='myspace.v1';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=n=>(+n||0).toLocaleString('en'),sum=(a,k)=>a.reduce((x,r)=>x+(+r.d[k]||0),0),pc=(a,b)=>b?Math.min(100,Math.round(a/b*100)):0;
const kick=()=>{typeof sync=='function'&&sync()};
let ST='',busy=0,SEQ=0,DP=null,SEL=new Set(),LOADING=0,SYNCERR=0;
let DB=JSON.parse(localStorage.getItem(LS)||'null')||{recs:{},cfg:{},lastPull:''};
const save=()=>{try{localStorage.setItem(LS,JSON.stringify(DB))}catch(e){}};
const all=k=>Object.values(DB.recs).filter(r=>r.kind===k&&!r.del).sort((a,b)=>a.c-b.c);
function put(kind,d,id){id=id||uid();const o=DB.recs[id];DB.recs[id]={id,kind,d,u:new Date().toISOString(),del:false,dirty:1,c:o?o.c:Date.now()+(SEQ=(SEQ+1)%1000)/1000};save();kick();return id}
function del(id){DB.recs[id]={...DB.recs[id],del:true,u:new Date().toISOString(),dirty:1};save();kick()}
function restore(ids){ids.forEach(id=>{DB.recs[id]={...DB.recs[id],del:false,u:new Date().toISOString(),dirty:1}});save();kick();render()}
/* icons: Lucide (outline) — I(name) */
const I=n=>`<svg class="ic" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[n]||ICONS.box}</svg>`;
const MAP={'💊':'pill','☕':'cup','🍴':'utensils','🧴':'bottle','👕':'shirt','🧽':'spray','🎧':'headphones','📦':'box','⭐':'star'},ico=n=>I(MAP[n]||n);
const ICL=[['box','صندوق'],['pill','دواء'],['cup','مشروبات'],['utensils','أطعمة'],['bottle','عناية'],['shirt','ملابس'],['spray','منظفات'],['headphones','إلكترونيات'],['star','نجمة'],['card','بطاقة'],['home','منزل'],['chart','رسم بياني'],['phone','هاتف'],['users','أشخاص'],['cloud','سحابة'],['grid','شبكة']];
/* theme system: وضع (light/dark/auto) + لون (seed) + تقليل الحركة */
const Theme={mode:()=>DB.cfg.th||'auto',
 dark(){return this.mode()=='dark'||(this.mode()=='auto'&&matchMedia('(prefers-color-scheme: dark)').matches)},
 apply(){const r=document.documentElement;r.dataset.th=this.dark()?'dark':'light';r.dataset.rm=DB.cfg.rm?1:0;const m=$('#mtc');if(m)m.content=getComputedStyle(r).getPropertyValue('--canvas').trim()||'#E4E4EB'}};
matchMedia('(prefers-color-scheme: dark)').addEventListener('change',()=>Theme.mode()=='auto'&&Theme.apply());
const reduced=()=>DB.cfg.rm||matchMedia('(prefers-reduced-motion: reduce)').matches;
/* seed (بيانات تجريبية — امسحها/عدّلها) */
if(!DB.seeded){DB.seeded=1;
 ['01559112210','01559554433','01559665544','01559776655','01559887766'].forEach((n,i)=>{const id=put('sim',{number:n,gb:130,min:10000});if(!i)[[30,1500,18],[25,1500,20],[20,2000,12],[15,1000,8],[20,2000,14],[10,1000,6]].forEach((l,j)=>put('line',{sim:id,number:'0155911221'+(j+1),gb:l[0],min:l[1],used:l[2]}))});
 const cs={};[['pill','الأدوية والمكملات'],['cup','المشروبات'],['utensils','الأطعمة'],['bottle','العناية الشخصية'],['shirt','الملابس'],['spray','المنظفات'],['headphones','الإلكترونيات'],['box','أخرى']].forEach(c=>cs[c[1]]=put('cat',{ic:c[0],name:c[1]}));
 [['Panadol 500 mg','أقراص - 20 قرص',3,'2027-07-15'],['Augmentin 1 g','أقراص - 14 قرص',2,'2027-03-25'],['Vitamin D 50,000 IU','أمبولات - 1 مل',1,'2026-11-13'],['Omega 3 1000 mg','كبسولات - 30 كبسولة',2,'2026-11-19'],['Panadol Extra','أقراص - 24 قرص',1,'2026-10-14']].forEach(x=>put('item',{cat:cs['الأدوية والمكملات'],name:x[0],desc:x[1],qty:x[2],min:1,exp:x[3]}));}
/* modal */
