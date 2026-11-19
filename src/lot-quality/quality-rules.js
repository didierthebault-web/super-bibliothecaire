import {normalizeARK} from '../marc.js';
export const fields=r=>Array.isArray(r?.fields)?r.fields:[];
export const hasValue=v=>typeof v==='string'&&v.trim().length>0;
export const sub=(r,tag,codes)=>fields(r).some(f=>f?.tag===tag&&Array.isArray(f.subfields)&&f.subfields.some(s=>s&&codes.includes(s.code)&&hasValue(s.value)));
const family=(r,re)=>fields(r).some(f=>re.test(f?.tag)&&Array.isArray(f.subfields)&&f.subfields.some(s=>hasValue(s?.value)));
const zone=(r,tags)=>fields(r).some(f=>tags.includes(f?.tag)&&(hasValue(f.value)||Array.isArray(f.subfields)&&f.subfields.some(s=>hasValue(s?.value))));
export function arkValues(r){return [...new Set([...fields(r).filter(f=>f?.tag==='003').map(f=>f.value),r?.provenance?.ark].flatMap(v=>{try{return [normalizeARK(v)];}catch{return [];}}))];}
export const qualityRules=Object.freeze([
 {id:'title',label:'Titre',zone:'200$a',test:r=>sub(r,'200',['a'])},
 {id:'responsibility',label:'Mentions de responsabilité',zone:'200$f / 200$g',test:r=>sub(r,'200',['f','g'])},
 {id:'agents',label:'Accès de responsabilité',zone:'7XX',test:r=>family(r,/^7\d\d$/)},
 {id:'publication',label:'Publication',zone:'210 / 214',test:r=>zone(r,['210','214'])},
 {id:'physical',label:'Description matérielle',zone:'215',test:r=>zone(r,['215'])},
 {id:'collection',label:'Collection',zone:'225$a',test:r=>sub(r,'225',['a'])},
 {id:'abstract',label:'Résumé',zone:'330$a',test:r=>sub(r,'330',['a'])},
 {id:'subjects',label:'Indexation',zone:'6XX',test:r=>family(r,/^6\d\d$/)},
 {id:'isbn',label:'ISBN',zone:'010$a',test:r=>sub(r,'010',['a'])},
 {id:'ark',label:'Identifiant pérenne BnF',zone:'003 / provenance',test:r=>arkValues(r).length>0},
 {id:'general',label:'Données générales',zone:'100$a',test:r=>sub(r,'100',['a'])},
 {id:'language',label:'Langue',zone:'101$a',test:r=>sub(r,'101',['a'])},
 {id:'country',label:'Pays',zone:'102$a',test:r=>sub(r,'102',['a'])}
]);
