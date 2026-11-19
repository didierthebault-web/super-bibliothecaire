import {summary} from '../marc.js';
import {isBnfRecord} from '../bnf-provenance.js';
import {isSudocRecord,catalogOf,catalogLabels,sourceIdentifier} from '../catalog-provenance.js';
import {qualityRules} from './quality-rules.js';
import {duplicateGroups} from './quality-duplicates.js';
import {analyzeTechnical} from './quality-technical.js';
export const provenanceLabels=Object.freeze({comparative:'Recherche comparative',isbn:'ISBN unitaire',ark:'ARK',title:'Titre / Auteur / Date','batch-isbn':"Lot d'ISBN",cover:'OCR couverture',other:'Autres recherches BnF',unknown:'Provenance indéterminée'});
function provenance(r){const p=r?.provenance;if(!isBnfRecord(r)&&!isSudocRecord(r)&&!(p?.service==='bnf-sru'&&p.source==='BnF — SRU / UNIMARC'&&typeof p.originalXML==='string'&&Number.isFinite(Date.parse(p.retrievedAt))))return 'unknown';return Object.hasOwn(provenanceLabels,p.method)&&!['unknown','other'].includes(p.method)?p.method:'other';}
function safeSummary(r){try{return summary(r);}catch{return {title:'Notice sans titre exploitable',author:'',date:'',isbn:'',ark:''};}}
export function analyzeLot(records,{rules=qualityRules,keep001=true,date=new Date().toISOString()}={}){
 const lot=records.filter(r=>r?.inBasket===true),total=lot.length,duplicates=duplicateGroups(lot),options={keep001};
 const rows=lot.map(r=>{const presence=Object.fromEntries(rules.map(rule=>[rule.id,!!rule.test(r)])),technical=analyzeTechnical(r,options,date),groups=duplicates.groups.filter(g=>g.recordIds.includes(r.id));
  const observations=rules.filter(rule=>!presence[rule.id]).map(rule=>({kind:'presence',message:rule.label+' non renseigné ('+rule.zone+').'}));
  if(groups.length)observations.push({kind:'duplicate',message:'Identifiant partagé : correspondance à examiner, sans fusion ni blocage.'});
  if(technical.message)observations.push({kind:'technical',message:technical.message});
  return {id:r.id,catalog:catalogOf(r),sourceIdentifier:sourceIdentifier(r),summary:safeSummary(r),presence,provenance:provenance(r),retrievedAt:r.provenance?.retrievedAt||'',technical,observations,isbnShared:groups.some(g=>g.kind==='isbn'),arkShared:groups.some(g=>g.kind==='ark')};
 });
 const indicators=rules.map(rule=>{const presentIds=rows.filter(r=>r.presence[rule.id]).map(r=>r.id),absentIds=rows.filter(r=>!r.presence[rule.id]).map(r=>r.id);return {id:rule.id,label:rule.label,zone:rule.zone,present:presentIds.length,absent:absentIds.length,percentage:total?Math.round(presentIds.length*10000/total)/100:null,presentIds,absentIds};});
 const provenanceCounts=Object.entries(provenanceLabels).map(([id,label])=>({id,label,recordIds:rows.filter(r=>r.provenance===id).map(r=>r.id)})).map(p=>({...p,count:p.recordIds.length}));
 const technical=Object.fromEntries(['direct','prepared','blocked'].map(id=>[id,rows.filter(r=>r.technical.status===id).map(r=>r.id)]));
 const catalogs=Object.entries(catalogLabels).map(([id,label])=>({id,label,count:rows.filter(r=>r.catalog===id).length}));
 return {catalogs,date,options:{keep001,rules:rules.map(r=>({id:r.id,label:r.label,zone:r.zone}))},total,indicators,duplicates,provenance:provenanceCounts,technical,rows,observationIds:rows.filter(r=>r.observations.length).map(r=>r.id)};
}
