import {clone,normalizeARK,summary,values} from './marc.js';
export function isBnfRecord(record){const p=record?.provenance;return !!(p&&p.source==='BnF — SRU / UNIMARC'&&['isbn','ark','title','batch-isbn','comparative'].includes(p.method)&&Number.isFinite(Date.parse(p.retrievedAt))&&typeof p.originalXML==='string'&&/<(?:\w+:)?record\b/.test(p.originalXML)&&/<(?:\w+:)?leader\b/.test(p.originalXML)&&(!p.service||p.service==='bnf-sru'));}
export function sourceIdentity(r){if(!isBnfRecord(r))return null;try{return 'ark:'+normalizeARK(summary(r).ark);}catch{}const id=values(r,'001')[0];return id?'bnf-001:'+id:'xml:'+r.provenance.originalXML;}
export function adoptCandidate(candidate,records,{duplicate=false,preferredId=null}={}){
  if(!isBnfRecord(candidate))throw Error('Seules les notices récupérées par le connecteur BnF peuvent rejoindre ce lot.');
  const key=sourceIdentity(candidate),same=records.filter(r=>sourceIdentity(r)===key);
  const existing=!duplicate&&(records.find(r=>r.id===preferredId&&sourceIdentity(r)===key)||same.find(r=>r.inBasket)||same[0]);
  if(existing)return {record:{...clone(existing),inBasket:true},created:false,alreadyInBasket:existing.inBasket};
  const record=clone(candidate);record.id=crypto.randomUUID();record.inBasket=true;record.status='Brouillon';record.createdAt=record.modifiedAt=new Date().toISOString();
  return {record,created:true,alreadyInBasket:false};
}
