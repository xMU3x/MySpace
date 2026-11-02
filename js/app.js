/* ===== app: router · navigation · actions · boot ===== */
let LH='',NAVX=[],TILE=null,FAB=null;
const LB={editsim:'تعديل الشريحة',delsim:'حذف الشريحة',editline:'تعديل الخط',delline:'حذف الخط',edititem:'تعديل المنتج',delitem:'حذف المنتج',editent:'تعديل',delent:'حذف'},cur=()=>(location.hash||'#home').slice(1);
function render(){const h=cur(),change=h!=LH,first=!LH;
 if(change&&!first&&document.startViewTransition&&!reduced()){const t=TILE;TILE=null;LH=h;const vt=document.startViewTransition(()=>paint(h,true,t));vt.finished.finally(()=>{if(t)t.style.viewTransitionName='';$('#v').style.viewTransitionName=''})}
 else{LH=h;paint(h,change)}}
function skeletonPage(){return `<div class="grid g4">${'<div class="sk" style="height:96px"></div>'.repeat(4)}</div><div class="sk" style="height:56px;margin-bottom:12px"></div><div class="sk" style="height:320px"></div>`}
function paint(h,anim,tile){const secs=all('sec'),cs=DB.recs[h],nA=alerts().length;Theme.apply();document.body.dataset.sb=DB.cfg.sb||'wide';
 const A=(k,i,n,x)=>`<a href="#${k}" class="ni rp${k==h?' on':''}${x?' x':''}" data-tip="${esc(n)}" aria-label="${esc(n)}" ${k==h?'aria-current="page"':''}><span class="ind">${ico(i,k==h)}</span><span class="lb">${esc(n)}</span>${k=='al'&&nA?`<span class="bdg">${nA}</span>`:''}</a>`,
 Bn=(a,i,n,cl='x')=>`<button class="ni rp ${cl}" data-act="${a}" data-tip="${n}" aria-label="${n}"><span class="ind">${I(i)}</span><span class="lb">${n}</span></button>`;
 const tp=[['home','home','الرئيسية'],['lines','signal','الخطوط'],['subs','card','الاشتراكات'],['inv','box','المخزون'],...secs.map(s=>[s.id,s.d.ic,s.d.name])],bt=[['rep','chart','التقارير'],['al','bell','التنبيهات']];
 NAVX=[...tp.slice(4).map(r=>A(...r).replace('<a ','<a data-act="close" ')),...bt.map(r=>A(...r).replace('<a ','<a data-act="close" ')),Bn('addsec','plus','قسم جديد',''),Bn('settings','sliders','الإعدادات','')];
 $('#nav').innerHTML=`<a class="brand rp" href="#home" aria-label="MySpace"><span class="lg">${I('orbit',1)}</span><b class="lb">MySpace</b></a>`+tp.map((r,j)=>A(r[0],r[1],r[2],j>3)).join('')+Bn('addsec','plus','قسم جديد')+'<span class="nsp"></span>'+bt.map(r=>A(r[0],r[1],r[2],1)).join('')+Bn('settings','sliders','الإعدادات')+`<button class="ni rp more" data-act="more" aria-label="المزيد" aria-haspopup="dialog"><span class="ind">${I('dotsh')}</span><span class="lb">المزيد</span></button><div class="sbf"><button class="ibtn rp sbw" data-act="sbw" data-tip="توسيع / تصغير" aria-label="توسيع / تصغير">${I('chev')}</button><button class="ibtn rp" data-act="sbhide" data-tip="إخفاء الشريط" aria-label="إخفاء الشريط الجانبي">${I('close')}</button></div>`;
 const T={home:['الرئيسية',vHome],lines:['متابعة خطوط WE Gold',vLines],inv:['المخزون',vInv],subs:['الاشتراكات',()=>vList('subs',1)],rep:['التقارير',vRep],al:['التنبيهات',vAl]};
 const t=T[h]||(cs&&cs.kind=='sec'&&!cs.del?[cs.d.name,()=>vList(h)]:T.home),inv=t[1]==vInv;
 const IB=(a,i,n,x='')=>`<button class="ibtn rp" ${x} data-act="${a}" data-tip="${n}" aria-label="${n}">${I(i)}</button>`,mi={light:'sun',dark:'moon',auto:'auto'}[Theme.mode()]||'auto';
 $('#top').innerHTML=IB('sbtoggle','menu','القائمة الجانبية','id="menu"')+(inv?`<div class="search" role="search">${I('search')}<input id="q" type="search" aria-label="بحث عن منتج" placeholder="بحث عن منتج..." value="${esc(DB.cfg.q||'')}" autocomplete="off">${DB.cfg.q?`<button class="ibtn rp" data-act="qclear" aria-label="مسح البحث">${I('close')}</button>`:''}</div>`:`<h2>${esc(t[0])}</h2>`)+`<span class="sp"></span><span id="st" role="status" aria-live="polite"></span><button class="ibtn rp" data-act="al" data-tip="التنبيهات" aria-label="التنبيهات">${I('bell')}${nA?'<em></em>':''}</button><button class="ibtn rp" data-act="thmenu" data-tip="المظهر" aria-label="المظهر" aria-haspopup="menu">${I(mi)}</button><button class="ibtn rp" id="inst" data-act="install" data-tip="تثبيت التطبيق" aria-label="تثبيت التطبيق" ${DP?'':'hidden'}>${I('download')}</button>`;
 setSt0();const v=$('#v');FAB=null;v.innerHTML=LOADING?skeletonPage():t[1]();
 if(tile)v.style.viewTransitionName='ct';
 const fe=$('#fab');if(FAB){if(!fe||fe.dataset.act!=FAB.act||fe.dataset.id!=(FAB.id||'')){fe&&fe.remove();document.body.insertAdjacentHTML('beforeend',`<button id="fab" class="fab rp" data-act="${FAB.act}" data-id="${FAB.id||''}" aria-label="${FAB.l}">${I('plus')}<span>${FAB.l}</span></button>`)}}else if(fe)fe.remove();
 if(anim){v.classList.remove('pg');void v.offsetWidth;v.classList.add('pg')}
 $$('table',v).forEach(tb=>{const hs=$$('th',tb).map(x=>x.textContent);$$('tr',tb).forEach(r=>[...r.children].forEach((c,i)=>{if(c.tagName=='TD'&&hs[i])c.dataset.l=hs[i]}))});
 $$('[data-act]',v).forEach(b=>{const l=LB[b.dataset.act];if(l&&!b.textContent.trim()&&!b.getAttribute('aria-label'))b.setAttribute('aria-label',l)});
 $$('input[type=checkbox]',v).forEach(c=>c.setAttribute('aria-label','تحديد'));
 const sp=$('#splash');if(sp){sp.classList.add('off');setTimeout(()=>sp.remove(),400)}}
addEventListener('hashchange',render);
/* actions */
function modeSeg(){return [['light','sun','فاتح'],['dark','moon','داكن'],['auto','auto','تلقائي']].map(([k,i,n])=>`<button class="rp ${Theme.mode()==k?'on':''}" data-act="mode" data-id="${k}" aria-pressed="${Theme.mode()==k}">${I(Theme.mode()==k?'check':i)}${n}</button>`).join('')}
function swatchesH(){return Object.entries(SEEDS).map(([k,v])=>`<button class="swatch rp ${Theme.seed()==k?'on':''}" style="--c:${v}" data-act="seed" data-id="${k}" aria-label="${SEEDN[k]}" aria-pressed="${Theme.seed()==k}" data-tip="${SEEDN[k]}">${I('check')}</button>`).join('')}
function appearUI(){const a=$('#modeseg'),b=$('#swatches');a&&(a.innerHTML=modeSeg());b&&(b.innerHTML=swatchesH())}
function run(a,id,el){const sid=DB.cfg.sim,go=()=>{save();render()},undo=ids=>toast('تم الحذف',{l:'تراجع',fn:()=>restore(ids)});({
 close:closeM,sim:()=>{DB.cfg.sim=id;go()},addsim:()=>simForm(),editsim:()=>simForm(sid),
 delsim:()=>ask('حذف الشريحة وكل خطوطها؟',()=>{all('line').filter(l=>l.d.sim==id).forEach(l=>del(l.id));del(id);render();toast('تم حذف الشريحة')}),
 addline:()=>lineForm(sid),editline:()=>lineForm(sid,id),delline:()=>ask('حذف الخط؟',()=>{del(id);render();undo([id])}),dist:()=>distForm(sid),
 cat:()=>{DB.cfg.cat=id;if(cur()!='inv')location.hash='inv';go()},addcat:()=>modal('قسم جديد',[{k:'ic',l:'الأيقونة',t:'select',v:'box',o:ICL},{k:'name',l:'اسم القسم',v:'',a:'required'}],v=>{DB.cfg.cat=put('cat',v)}),
 delcat:()=>ask('حذف القسم وكل منتجاته؟',()=>{all('item').filter(i=>i.d.cat==id).forEach(i=>del(i.id));del(id);DB.cfg.cat='all';go()}),
 additem:()=>itemForm(),edititem:()=>itemForm(id),delitem:()=>ask('حذف المنتج؟',()=>{del(id);SEL.delete(id);render();undo([id])}),
 sel:()=>{SEL.has(id)?SEL.delete(id):SEL.add(id);render()},selall:()=>{const c=curCat(),q=(DB.cfg.q||'').toLowerCase(),f=all('item').filter(i=>(c=='all'||i.d.cat==c)&&i.d.name.toLowerCase().includes(q));f.every(i=>SEL.has(i.id))?f.forEach(i=>SEL.delete(i.id)):f.forEach(i=>SEL.add(i.id));render()},
 bulk:()=>ask(`حذف ${SEL.size} منتج؟`,()=>{const ids=[...SEL];ids.forEach(x=>del(x));SEL.clear();render();undo(ids)}),
 fs:()=>{DB.cfg.fs=id;go()},qclear:()=>{DB.cfg.q='';go()},
 addent:()=>entForm(id),editent:()=>entForm(DB.recs[id].d.sec,id),delent:()=>ask('حذف؟',()=>{del(id);render();undo([id])}),
 addsec:()=>modal('قسم جديد',[{k:'ic',l:'الأيقونة',t:'select',v:'star',o:ICL},{k:'name',l:'اسم القسم',v:'',a:'required'}],v=>{location.hash=put('sec',v)}),
 delsec:()=>ask('حذف القسم وكل عناصره؟',()=>{all('ent').filter(x=>x.d.sec==id).forEach(x=>del(x.id));del(id);location.hash='home'}),
 rowmenu:()=>{const E={line:['editline','delline'],item:['edititem','delitem'],ent:['editent','delent']}[el.dataset.k];menu(el,[{l:'تعديل',i:'pencil',fn:()=>run(E[0],id)},{l:'حذف',i:'trash',dg:1,fn:()=>run(E[1],id)}])},
 tbmenu:()=>menu(el,[{l:'تصدير CSV',i:'download',fn:exportCsv},{l:'استيراد CSV',i:'upload',fn:()=>$('#imp').click()}]),
 thmenu:()=>menu(el,[['light','sun','فاتح'],['dark','moon','داكن'],['auto','auto','تلقائي']].map(([k,i,n])=>({l:n,i,on:Theme.mode()==k,fn:()=>run('mode',k)}))),
 mode:()=>{DB.cfg.th=id;save();Theme.apply();appearUI();render()},seed:()=>{DB.cfg.seed=id;save();Theme.apply();appearUI();render()},
 sumtoggle:()=>{DB.cfg.sumc=!DB.cfg.sumc;save();el.setAttribute('aria-expanded',!DB.cfg.sumc);el.nextElementSibling.classList.toggle('c',!!DB.cfg.sumc)},
 al:()=>{location.hash='al'},settings:()=>settings(),install:()=>DP&&DP.prompt(),
 logout:()=>{delete DB.cfg.tok;delete DB.cfg.ref;save();closeM();render();toast('تم تسجيل الخروج')},
 sbw:()=>{DB.cfg.sb=(DB.cfg.sb=='rail')?'wide':'rail';go()},sbhide:()=>{DB.cfg.sbp=DB.cfg.sb&&DB.cfg.sb!='hidden'?DB.cfg.sb:'wide';DB.cfg.sb='hidden';go()},sbtoggle:()=>{if(DB.cfg.sb=='hidden')DB.cfg.sb=DB.cfg.sbp||'wide';else{DB.cfg.sbp=DB.cfg.sb||'wide';DB.cfg.sb='hidden'}go()},
 more:()=>{const m=$('#modal');m.innerHTML=`<div class="box" role="dialog" aria-modal="true" aria-label="المزيد"><div class="grab"></div><h3>المزيد</h3><div class="mg">${NAVX.join('')}</div></div>`;openM(m)}
}[a]||(()=>{}))()}
document.addEventListener('click',e=>{const t=e.target.closest('a[data-tile]');if(t&&!reduced()){TILE=t;t.style.viewTransitionName='ct'}const b=e.target.closest('[data-act]');if(b)run(b.dataset.act,b.dataset.id,b)});
document.addEventListener('input',e=>{if(e.target.id=='q'){const v=e.target.value;DB.cfg.q=v;render();const q=$('#q');q.focus();q.setSelectionRange(v.length,v.length)}});
document.addEventListener('change',e=>{if(e.target.id=='rmsw'){DB.cfg.rm=e.target.checked;save();Theme.apply()}});
/* settings dialog */
function settings(){const c=DB.cfg,m=$('#modal'),f=(k,l,v,t='text',a='')=>`<label class="tf"><input name="${k}" type="${t}" value="${esc(v)}" placeholder=" " ${a}><span>${l}</span></label>`;
 m.innerHTML=`<div class="box" role="dialog" aria-modal="true" aria-label="الإعدادات"><div class="grab"></div><h3>الإعدادات</h3><div><h4>وضع العرض</h4><div class="seg" id="modeseg" role="group" aria-label="وضع العرض">${modeSeg()}</div></div><div><h4>لون التطبيق</h4><div class="swatches" id="swatches" role="group" aria-label="لون التطبيق">${swatchesH()}</div></div><label class="sw-row"><span>تقليل الحركة</span><input type="checkbox" class="sw" id="rmsw" role="switch" ${c.rm?'checked':''}></label>
 <form id="sbf" style="display:grid;gap:12px"><h4>الربط مع Supabase</h4>${f('url','Project URL',c.url||'','url','dir="ltr"')}${f('key','anon public key',c.key||'','text','dir="ltr"')}${f('email','الإيميل',c.email||'','email','dir="ltr"')}${f('pw','كلمة المرور','','password','autocomplete="current-password"')}<p class="err" role="alert"></p><div class="actions">${c.tok?'<button type="button" class="btn d rp" data-act="logout">تسجيل خروج</button>':''}<button type="button" class="btn x rp" data-act="close">إغلاق</button><button class="btn p rp" id="sbsave">حفظ</button></div></form></div>`;openM(m);
 $('#sbf').onsubmit=async e=>{e.preventDefault();const v=Object.fromEntries(new FormData(e.target)),er=$('.err',m),b=$('#sbsave');b.disabled=true;b.innerHTML='<span class="spin"></span>';
  try{c.url=v.url.trim().replace(/\/$/,'');c.key=v.key.trim();c.email=v.email;if(c.url&&v.pw)await auth({email:v.email,password:v.pw},'password');save();closeM();if(c.tok){LOADING=1;render();await sync();LOADING=0}render();toast('تم حفظ الإعدادات')}catch(x){LOADING=0;er.textContent=x.message;b.disabled=false;b.textContent='حفظ'}}}
/* gestures: اسحب يمين/يسار للتنقل بين الشرائح */
let swx=null;document.addEventListener('touchstart',e=>{swx=cur()=='lines'&&!e.target.closest('.tw,.chips,.menu,#modal')?e.touches[0].clientX:null},{passive:true});
document.addEventListener('touchend',e=>{if(swx==null)return;const dx=e.changedTouches[0].clientX-swx;swx=null;if(Math.abs(dx)<80)return;const S=all('sim'),i=S.findIndex(s=>s.id==DB.cfg.sim),n=S[i+(dx<0?1:-1)];if(n){DB.cfg.sim=n.id;save();render()}},{passive:true});
/* boot */
addEventListener('beforeinstallprompt',e=>{e.preventDefault();DP=e;const i=$('#inst');if(i)i.hidden=false});
if('serviceWorker'in navigator)navigator.serviceWorker.register('service-worker.js');
render();sync();
