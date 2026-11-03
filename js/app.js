/* ===== app: router · rail · header · actions · boot ===== */
let LH='',NAVX=[];
const LB={editsim:'تعديل الشريحة',delsim:'حذف الشريحة',editline:'تعديل الخط',delline:'حذف الخط',edititem:'تعديل المنتج',delitem:'حذف المنتج',editent:'تعديل',delent:'حذف'},cur=()=>(location.hash||'#home').slice(1);
function render(){const h=cur(),change=h!=LH,first=!LH;
 if(change&&!first&&document.startViewTransition&&!reduced()){LH=h;document.startViewTransition(()=>paint(h,true))}else{LH=h;paint(h,change)}}
function banner(){const b=$('#banner');if(b)b.innerHTML=SYNCERR&&DB.cfg.tok?`<div class="banner" role="alert">${I('alert')}<span>تعذّر الاتصال بـ Supabase. بياناتك محفوظة على جهازك وهتتزامن تلقائيًا.</span><button class="btn rp" data-act="retry">إعادة المحاولة</button></div>`:''}
const skeletonPage=()=>`<div class="kpis">${'<div class="sk" style="height:128px"></div>'.repeat(4)}</div><div class="sk" style="height:300px"></div>`;
const greet=()=>{const h=new Date().getHours();return h<12?'صباح الخير':h<18?'مساء النور':'مساء الخير'};
function paint(h,anim){const secs=all('sec'),cs=DB.recs[h],nA=alerts().length;Theme.apply();document.body.dataset.sb=DB.cfg.sb||'rail';
 const A=(k,i,n,x)=>`<a href="#${k}" class="ni${k==h?' on':''}${x?' x':''}" data-tip="${esc(n)}" aria-label="${esc(n)}" ${k==h?'aria-current="page"':''}>${ico(i)}<span class="lb">${esc(n)}</span>${k=='al'&&nA?`<span class="bdg">${nA}</span>`:''}</a>`,
 Bn=(a,i,n,cl='x')=>`<button class="ni ${cl}" data-act="${a}" data-tip="${n}" aria-label="${n}">${I(i)}<span class="lb">${n}</span></button>`;
 const tp=[['home','home','الرئيسية'],['lines','signal','الخطوط'],['subs','card','الاشتراكات'],['inv','box','المخزون'],...secs.map(s=>[s.id,s.d.ic,s.d.name])],bt=[['rep','chart','التقارير'],['al','bell','التنبيهات']];
 NAVX=[...tp.slice(4).map(r=>A(...r).replace('<a ','<a data-act="close" ')),...bt.map(r=>A(...r).replace('<a ','<a data-act="close" ')),Bn('addsec','plus','قسم جديد',''),Bn('settings','sliders','الإعدادات','')];
 const name=(DB.cfg.email||'').split('@')[0]||'مساحتي',ini=(name[0]||'M').toUpperCase();
 $('#nav').innerHTML=`<a class="logo" href="#home" aria-label="MySpace" data-tip="MySpace">${I('box')}<b class="lb">MySpace</b></a>`+tp.map((r,j)=>A(r[0],r[1],r[2],j>3)).join('')+Bn('addsec','plus','قسم جديد')+'<span class="nsp"></span>'+bt.map(r=>A(r[0],r[1],r[2],1)).join('')+Bn('settings','sliders','الإعدادات')+`<button class="ni more" data-act="more" aria-label="المزيد" aria-haspopup="dialog">${I('dotsh')}<span class="lb">المزيد</span></button><div class="rbt"><button data-act="sbw" class="sbw" data-tip="توسيع / تصغير" aria-label="توسيع / تصغير">${I('chev')}</button><button data-act="sbhide" data-tip="إخفاء الشريط" aria-label="إخفاء الشريط الجانبي">${I('close')}</button></div>`;
 const T={home:['الرئيسية',greet()],lines:['الخطوط','متابعة خطوط WE Gold'],inv:['المخزون','المخزون'],subs:['الاشتراكات','الاشتراكات'],rep:['التقارير','التقارير'],al:['التنبيهات','التنبيهات']};
 const t=T[h]?[T[h][0],T[h][1],{home:vHome,lines:vLines,inv:vInv,subs:()=>vList('subs',1),rep:vRep,al:vAl}[h]]:(cs&&cs.kind=='sec'&&!cs.del?[cs.d.name,cs.d.name,()=>vList(h)]:[T.home[0],T.home[1],vHome]),mi={light:'sun',dark:'moon',auto:'auto'}[Theme.mode()]||'auto';
 $('#top').innerHTML=`<button class="hbtn" id="menu" data-act="sbtoggle" data-tip="القائمة الجانبية" aria-label="القائمة الجانبية">${I('menu')}</button><div class="hl"><div class="crumb">${I('home')}<span>MySpace</span>${I('chevl')}<b>${esc(t[0])}</b></div><h1>${esc(t[1])}</h1></div><div class="hr"><span id="st" role="status" aria-live="polite"></span><label class="sbox" role="search">${I('search')}<input id="q" type="search" aria-label="بحث في المخزون" placeholder="ابحث في المخزون..." value="${esc(DB.cfg.q||'')}" autocomplete="off"><kbd>/</kbd></label><button class="hbtn" data-act="al" data-tip="التنبيهات" aria-label="التنبيهات">${I('bell')}${nA?'<em></em>':''}</button><button class="hbtn" data-act="thmenu" data-tip="المظهر" aria-label="المظهر" aria-haspopup="menu">${I(mi)}</button><button class="hbtn" id="inst" data-act="install" data-tip="تثبيت التطبيق" aria-label="تثبيت التطبيق" ${DP?'':'hidden'}>${I('download')}</button><button class="uchip" data-act="usermenu" aria-label="الحساب" aria-haspopup="menu"><span class="avatar">${esc(ini)}</span><span class="meta"><b>${esc(name)}</b><small>MySpace</small></span>${I('expand')}</button></div>`;
 setSt0();banner();const v=$('#v');v.innerHTML=LOADING?skeletonPage():t[2]();
 if(anim){v.classList.remove('pg');void v.offsetWidth;v.classList.add('pg')}
 $$('table',v).forEach(tb=>{const hs=$$('th',tb).map(x=>x.textContent);$$('tr',tb).forEach(r=>[...r.children].forEach((c,i)=>{if(c.tagName=='TD'&&hs[i])c.dataset.l=hs[i]}))});
 $$('[data-act]',v).forEach(b=>{const l=LB[b.dataset.act];if(l&&!b.textContent.trim()&&!b.getAttribute('aria-label'))b.setAttribute('aria-label',l)});
 $$('input[type=checkbox]',v).forEach(c=>c.setAttribute('aria-label','تحديد'));
 const sp=$('#splash');if(sp){sp.classList.add('off');setTimeout(()=>sp.remove(),400)}}
addEventListener('hashchange',render);
/* actions */
const modeSeg=()=>[['light','فاتح'],['dark','داكن'],['auto','تلقائي']].map(([k,n])=>`<button class="${Theme.mode()==k?'on':''}" data-act="mode" data-id="${k}" aria-pressed="${Theme.mode()==k}">${n}</button>`).join('');
const modeItems=()=>[['light','sun','فاتح'],['dark','moon','داكن'],['auto','auto','تلقائي']].map(([k,i,n])=>({l:n,i,on:Theme.mode()==k,fn:()=>run('mode',k)}));
function run(a,id,el){const sid=DB.cfg.sim,go=()=>{save();render()},undo=ids=>toast('تم الحذف',{l:'تراجع',fn:()=>restore(ids)},'n');({
 close:closeM,sim:()=>{DB.cfg.sim=id;go()},addsim:()=>simForm(),editsim:()=>simForm(sid),
 delsim:()=>ask('حذف الشريحة وكل خطوطها؟',()=>{all('line').filter(l=>l.d.sim==id).forEach(l=>del(l.id));del(id);render();toast('تم حذف الشريحة',null,'n')}),
 simmenu:()=>menu(el,[{l:'تعديل بيانات الشريحة',i:'pencil',fn:()=>run('editsim')},{l:'حذف الشريحة',i:'trash',dg:1,fn:()=>run('delsim',id)}]),
 addline:()=>lineForm(sid),editline:()=>lineForm(sid,id),delline:()=>ask('حذف الخط؟',()=>{del(id);render();undo([id])}),dist:()=>distForm(sid),
 cat:()=>{DB.cfg.cat=id;if(cur()!='inv')location.hash='inv';go()},addcat:()=>modal('قسم جديد',[{k:'ic',l:'الأيقونة',t:'select',v:'box',o:ICL},{k:'name',l:'اسم القسم',v:'',a:'required'}],v=>{DB.cfg.cat=put('cat',v)}),
 catmenu:()=>{const c=all('cat'),cc=curCat();menu(el,[{l:'كل الأقسام',i:'layers',on:cc=='all',fn:()=>run('cat','all')},...c.map(x=>({l:x.d.name,i:x.d.ic,on:cc==x.id,fn:()=>run('cat',x.id)})),'-',{l:'إضافة قسم',i:'plus',fn:()=>run('addcat')},...(cc!='all'?[{l:'حذف القسم الحالي',i:'trash',dg:1,fn:()=>run('delcat',cc)}]:[])])},
 delcat:()=>ask('حذف القسم وكل منتجاته؟',()=>{all('item').filter(i=>i.d.cat==id).forEach(i=>del(i.id));del(id);DB.cfg.cat='all';go()}),
 additem:()=>itemForm(),edititem:()=>itemForm(id),delitem:()=>ask('حذف المنتج؟',()=>{del(id);SEL.delete(id);render();undo([id])}),
 sel:()=>{SEL.has(id)?SEL.delete(id):SEL.add(id);render()},selall:()=>{const c=curCat(),q=(DB.cfg.q||'').toLowerCase(),f=all('item').filter(i=>(c=='all'||i.d.cat==c)&&i.d.name.toLowerCase().includes(q));f.every(i=>SEL.has(i.id))?f.forEach(i=>SEL.delete(i.id)):f.forEach(i=>SEL.add(i.id));render()},
 bulk:()=>ask(`حذف ${SEL.size} منتج؟`,()=>{const ids=[...SEL];ids.forEach(x=>del(x));SEL.clear();render();undo(ids)}),
 fs:()=>{DB.cfg.fs=id;go()},clearf:()=>{DB.cfg.q='';DB.cfg.fs='all';go()},hz:()=>{DB.cfg.hz=+id;go()},exp:exportCsv,imp:()=>$('#imp').click(),
 addent:()=>entForm(id),editent:()=>entForm(DB.recs[id].d.sec,id),delent:()=>ask('حذف؟',()=>{del(id);render();undo([id])}),
 addsec:()=>modal('قسم جديد',[{k:'ic',l:'الأيقونة',t:'select',v:'star',o:ICL},{k:'name',l:'اسم القسم',v:'',a:'required'}],v=>{location.hash=put('sec',v)}),
 delsec:()=>ask('حذف القسم وكل عناصره؟',()=>{all('ent').filter(x=>x.d.sec==id).forEach(x=>del(x.id));del(id);location.hash='home'}),
 rowmenu:()=>{const E={line:['editline','delline'],item:['edititem','delitem'],ent:['editent','delent']}[el.dataset.k];menu(el,[{l:'تعديل',i:'pencil',fn:()=>run(E[0],id)},{l:'حذف',i:'trash',dg:1,fn:()=>run(E[1],id)}])},
 thmenu:()=>menu(el,modeItems()),
 usermenu:()=>menu(el,[{l:'الإعدادات',i:'sliders',fn:settings},'-',...modeItems(),'-',DB.cfg.tok?{l:'تسجيل خروج',i:'logout',dg:1,fn:()=>run('logout')}:{l:'ربط Supabase',i:'cloud',fn:settings}]),
 mode:()=>{DB.cfg.th=id;save();Theme.apply();const s=$('#modeseg');s&&(s.innerHTML=modeSeg());render()},
 retry:()=>{SYNCERR=0;banner();sync()},al:()=>{location.hash='al'},settings:()=>settings(),install:()=>DP&&DP.prompt(),
 logout:()=>{delete DB.cfg.tok;delete DB.cfg.ref;save();closeM();render();toast('تم تسجيل الخروج')},
 sbw:()=>{DB.cfg.sb=(DB.cfg.sb=='wide')?'rail':'wide';go()},sbhide:()=>{DB.cfg.sbp=DB.cfg.sb&&DB.cfg.sb!='hidden'?DB.cfg.sb:'rail';DB.cfg.sb='hidden';go()},sbtoggle:()=>{if(DB.cfg.sb=='hidden')DB.cfg.sb=DB.cfg.sbp||'rail';else{DB.cfg.sbp=DB.cfg.sb||'rail';DB.cfg.sb='hidden'}go()},
 more:()=>{const m=$('#modal');m.innerHTML=`<div class="box" role="dialog" aria-modal="true" aria-label="المزيد"><div class="grab"></div><h3>المزيد</h3><div class="mg">${NAVX.join('')}</div></div>`;openM(m)}
}[a]||(()=>{}))()}
document.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(b)run(b.dataset.act,b.dataset.id,b)});
document.addEventListener('input',e=>{if(e.target.id=='q'){const v=e.target.value;DB.cfg.q=v;if(cur()=='inv'){render();const q=$('#q');q.focus();q.setSelectionRange(v.length,v.length)}}});
document.addEventListener('keydown',e=>{if(e.target.id=='q'&&e.key=='Enter'&&cur()!='inv'){save();location.hash='inv'}if(e.key=='/'&&!/INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)&&$('#modal').hidden){e.preventDefault();$('#q')?.focus()}});
document.addEventListener('change',e=>{if(e.target.id=='rmsw'){DB.cfg.rm=e.target.checked;save();Theme.apply()}});
/* settings dialog */
function settings(){const c=DB.cfg,m=$('#modal'),f=(k,l,v,t='text',a='')=>`<label class="fl"><span>${l}</span><input name="${k}" type="${t}" value="${esc(v)}" placeholder=" " ${a}></label>`;
 m.innerHTML=`<div class="box" role="dialog" aria-modal="true" aria-label="الإعدادات"><div class="grab"></div><h3>الإعدادات</h3><div class="fl"><span>وضع العرض</span><div class="seg" id="modeseg" role="group" aria-label="وضع العرض" style="box-shadow:none;background:var(--surface-2)">${modeSeg()}</div></div><label class="row" style="justify-content:space-between;margin:0"><span style="font-weight:500">تقليل الحركة</span><input type="checkbox" class="sw" id="rmsw" role="switch" ${c.rm?'checked':''}></label>
 <form id="sbf" style="display:grid;gap:12px"><h4>الربط مع Supabase</h4>${f('url','Project URL',c.url||'','url','dir="ltr"')}${f('key','anon public key',c.key||'','text','dir="ltr"')}${f('email','الإيميل',c.email||'','email','dir="ltr"')}${f('pw','كلمة المرور','','password','autocomplete="current-password"')}<p class="err" role="alert"></p><div class="acts e">${c.tok?'<button type="button" class="btn d" data-act="logout">تسجيل خروج</button>':''}<button type="button" class="btn g" data-act="close">إغلاق</button><button class="btn p rp" id="sbsave">حفظ</button></div></form></div>`;openM(m);
 $('#sbf').onsubmit=async e=>{e.preventDefault();const v=Object.fromEntries(new FormData(e.target)),er=$('.err',m),b=$('#sbsave');b.disabled=true;b.innerHTML='<span class="spin"></span>';
  try{c.url=v.url.trim().replace(/\/$/,'');c.key=v.key.trim();c.email=v.email;if(c.url&&v.pw)await auth({email:v.email,password:v.pw},'password');save();closeM();if(c.tok){LOADING=1;render();await sync();LOADING=0}render();toast('تم حفظ الإعدادات')}catch(x){LOADING=0;er.textContent=x.message;b.disabled=false;b.textContent='حفظ'}}}
/* gestures: اسحب يمين/يسار للتنقل بين الشرائح */
let swx=null;document.addEventListener('touchstart',e=>{swx=cur()=='lines'&&!e.target.closest('.tw,.seg,.menu,#modal')?e.touches[0].clientX:null},{passive:true});
document.addEventListener('touchend',e=>{if(swx==null)return;const dx=e.changedTouches[0].clientX-swx;swx=null;if(Math.abs(dx)<80)return;const S=all('sim'),i=S.findIndex(s=>s.id==DB.cfg.sim),n=S[i+(dx<0?1:-1)];if(n){DB.cfg.sim=n.id;save();render()}},{passive:true});
/* boot */
addEventListener('beforeinstallprompt',e=>{e.preventDefault();DP=e;const i=$('#inst');if(i)i.hidden=false});
if('serviceWorker'in navigator)navigator.serviceWorker.register('service-worker.js');
render();sync();
