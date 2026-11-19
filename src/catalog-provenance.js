import {isBnfRecord} from './bnf-provenance.js';
import {normalizeARK,values} from './marc.js';
export const catalogLabels={bnf:'BnF',sudoc:'Sudoc',unknown:'Catalogue indéterminé'};
export function validPPN(value){return /^\d{8}[\dX]$/.test(value||'');}
export function isSudocRecord(r){const p=r?.provenance;return !!(p?.catalog==='Sudoc'&&p.source==='Sudoc — Abes / UNIMARC'&&p.service==='sudoc-sru'&&p.producer==='Abes'&&p.method==='comparative'&&p.transport==='official-xml-import'&&validPPN(p.ppn)&&Number.isFinite(Date.parse(p.retrievedAt))&&p.originalRecord?.fields?.some(f=>f.tag==='001'&&f.value===p.ppn)&&typeof p.originalXML==='string'&&/<(?:\w+:)?record\b/.test(p.originalXML)&&/<(?:\w+:)?leader\b/.test(p.originalXML)&&p.sourceURL===`https://www.sudoc.fr/${p.ppn}`);}
export function isTrustedCatalogRecord(r){return isBnfRecord(r)||isSudocRecord(r);}
export function catalogOf(r){return isBnfRecord(r)?'bnf':isSudocRecord(r)?'sudoc':'unknown';}
export function sourceIdentifier(r){if(isSudocRecord(r))return r.provenance.ppn;if(isBnfRecord(r)){try{return normalizeARK(r.provenance.ark||values(r,'003')[0]);}catch{return values(r,'001')[0]||'';}}return '';}
export function catalogIdentity(r){const catalog=catalogOf(r);return catalog==='unknown'?null:catalog+':'+(sourceIdentifier(r)||r.provenance.originalXML);}
