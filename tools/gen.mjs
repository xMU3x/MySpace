// يولّد css/palettes.css و js/icons.js — شغّله: npm i && npm run gen
import {themeFromSourceColor,argbFromHex,hexFromArgb,TonalPalette} from '@material/material-color-utilities';
import fs from 'node:fs';import path from 'node:path';
const SEEDS={teal:'#00897B',indigo:'#4F5BD5',violet:'#7E57C2',rose:'#D81B60',amber:'#E08A00',green:'#2E7D32'};
const T=[0,10,20,30,40,50,60,70,80,90,95,99,100],h=(p,t)=>hexFromArgb(p.tone(t));
const status={ok:TonalPalette.fromHueAndChroma(145,40),warn:TonalPalette.fromHueAndChroma(75,56),info:TonalPalette.fromHueAndChroma(235,44)};
let css='/* مولَّد تلقائيًا من tools/gen.mjs — لا تعدّله يدويًا */\n';
const modeVars=(th,dark)=>{const n=th.palettes.neutral,s=th.schemes[dark?'dark':'light'].toJSON(),v={};
 const map={primary:'primary',onPrimary:'on-primary',primaryContainer:'primary-container',onPrimaryContainer:'on-primary-container',secondary:'secondary',onSecondary:'on-secondary',secondaryContainer:'secondary-container',onSecondaryContainer:'on-secondary-container',tertiary:'tertiary',onTertiary:'on-tertiary',tertiaryContainer:'tertiary-container',onTertiaryContainer:'on-tertiary-container',error:'error',onError:'on-error',errorContainer:'error-container',onErrorContainer:'on-error-container',background:'background',onBackground:'on-background',surface:'surface',onSurface:'on-surface',surfaceVariant:'surface-variant',onSurfaceVariant:'on-surface-variant',outline:'outline',outlineVariant:'outline-variant',inverseSurface:'inverse-surface',inverseOnSurface:'inverse-on-surface',inversePrimary:'inverse-primary'};
 for(const k in map)v[map[k]]=hexFromArgb(s[k]);
 const L=dark?[4,10,12,17,22]:[100,96,94,92,90];['lowest','low','','high','highest'].forEach((x,i)=>v['surface-container'+(x?'-'+x:'')]=h(n,L[i]));
 v['surface-dim']=h(n,dark?6:87);v['surface-bright']=h(n,dark?24:98);
 for(const k in status){const p=status[k];v[k]=h(p,dark?80:40);v['on-'+k]=h(p,dark?20:100);v[k+'-container']=h(p,dark?30:90);v['on-'+k+'-container']=h(p,dark?90:10)}
 return v};
const emit=(sel,v)=>`${sel}{${Object.entries(v).map(([k,x])=>`--${k}:${x}`).join(';')}}\n`;
for(const [name,hex] of Object.entries(SEEDS)){const th=themeFromSourceColor(argbFromHex(hex));
 const tones={};for(const [pn,p] of [['p',th.palettes.primary],['s',th.palettes.secondary],['t',th.palettes.tertiary]])T.forEach(t=>tones[`${pn}-${t}`]=h(p,t));
 tones.seed=hex;css+=emit(`[data-seed=${name}]`,tones);
 css+=emit(`[data-seed=${name}][data-th=light]`,modeVars(th,false));css+=emit(`[data-seed=${name}][data-th=dark]`,modeVars(th,true))}
fs.writeFileSync('css/palettes.css',css);
const ICON={home:'home',signal:'signal_cellular_alt',card:'credit_card',box:'inventory_2',chart:'bar_chart',bell:'notifications',sliders:'settings',sun:'light_mode',moon:'dark_mode',auto:'brightness_auto',download:'download',upload:'upload',plus:'add',pencil:'edit',trash:'delete',dotsv:'more_vert',dotsh:'more_horiz',crown:'workspace_premium',sim:'sim_card',users:'group',db:'database',phone:'call',shield:'verified_user',alert:'warning',xcircle:'cancel',search:'search',pill:'pill',cup:'local_cafe',utensils:'restaurant',bottle:'sanitizer',shirt:'checkroom',spray:'cleaning_services',headphones:'headphones',star:'star',grid:'grid_view',cloud:'cloud',filter:'filter_list',layers:'layers',check:'check',clock:'schedule',coin:'payments',list:'list_alt',trend:'trending_down',orbit:'hub',menu:'menu',chev:'menu_open',close:'close',sync:'sync',clouddone:'cloud_done',cloudoff:'cloud_off',logout:'logout',palette:'palette',info:'info',okc:'check_circle',expand:'keyboard_arrow_down',tune:'tune'};
const dir='node_modules/@material-symbols/svg-500/rounded',d=f=>{const t=fs.readFileSync(path.join(dir,f),'utf8');return /\sd="([^"]+)"/.exec(t)[1]};
const out={};const miss=[];for(const [k,v] of Object.entries(ICON)){try{out[k]=[d(v+'.svg'),d(v+'-fill.svg')]}catch(e){miss.push(k+':'+v)}}
fs.writeFileSync('js/icons.js','/* مولَّد من Material Symbols (Apache-2.0) عبر tools/gen.mjs */\nconst ICONS='+JSON.stringify(out)+';\n');
console.log('palettes',(css.length/1024).toFixed(1)+'KB','icons',Object.keys(out).length,'missing',miss);
