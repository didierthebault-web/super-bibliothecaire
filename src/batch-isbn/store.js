import * as db from '../storage.js';
import {summary} from '../marc.js';
import {adoptCandidate,isBnfRecord} from '../bnf-provenance.js';
export async function loadJob(id){let req;await db.transaction(['batchJobs'],'readonly',tx=>{req=tx.objectStore('batchJobs').get(id);});return req.result;}
export async function mutateJob(id,fn){let result,error;await db.transaction(['batchJobs'],'readwrite',tx=>{const store=tx.objectStore('batchJobs'),req=store.get(id);req.onsuccess=()=>{try{if(!req.result)throw Error('Ce traitement n’existe plus (restauration ou suppression dans un autre onglet).');const job=req.result;fn(job);job.revision++;job.updatedAt=new Date().toISOString();store.put(job);result=job;}catch(e){error=e;tx.abort();}};}).catch(e=>{throw error||e;});return result;}
export async function choose(id,key,candidateId,{duplicate=false}={}){
 let result,error;
 await db.transaction(['batchJobs','records','history'],'readwrite',tx=>{
  const jobs=tx.objectStore('batchJobs'),records=tx.objectStore('records'),jq=jobs.get(id),rq=records.getAll();
  rq.onsuccess=()=>{try{const job=jq.result,t=job?.tasks.find(t=>t.key===key),candidate=t?.candidates.find(r=>r.id===candidateId);
   if(!t||t.status!=='done'||!candidate)throw Error('Choisissez explicitement une candidate issue d’une recherche terminée.');
   const adoption=adoptCandidate(candidate,rq.result,{duplicate,preferredId:t.selectedId===candidateId?t.recordId:null}),record=adoption.record;
   record.provenance={...record.provenance,method:'batch-isbn',batchId:id,originalISBNs:job.rows.filter(r=>r.key===key).map(r=>r.raw),batchSelectedAt:new Date().toISOString()};
   adoption.created?records.add(record):records.put(record);
   t.selectedId=candidateId;t.recordId=record.id;t.decision='retained';job.revision++;job.updatedAt=new Date().toISOString();jobs.put(job);
   if(!adoption.alreadyInBasket)tx.objectStore('history').add({id:crypto.randomUUID(),type:'record',date:job.updatedAt,recordId:record.id,title:summary(record).title,source:record.provenance.source,action:'Ajout direct depuis le traitement ISBN'});
   result=job;
  }catch(e){error=e;tx.abort();}};
 }).catch(e=>{throw error||e;});return result;
}
export async function openSelection(id,key){const job=await loadJob(id),t=job?.tasks.find(t=>t.key===key);if(!t?.selectedId)throw Error('Retenez explicitement une notice candidate.');if(!t.recordId)await choose(id,key,t.selectedId);const current=await loadJob(id),record=(await db.all('records')).find(r=>r.id===current.tasks.find(t=>t.key===key).recordId);if(!record)throw Error('La notice locale a été supprimée.');return record;}
export async function addSelectedToBasket(id,keys){let added=0,error;await db.transaction(['batchJobs','records'],'readwrite',tx=>{const jq=tx.objectStore('batchJobs').get(id),records=tx.objectStore('records'),rq=records.getAll();rq.onsuccess=()=>{try{const job=jq.result;if(!job)throw Error('Traitement absent.');for(const key of new Set(keys)){const t=job.tasks.find(t=>t.key===key),r=rq.result.find(r=>r.id===t?.recordId);if(!r||!t.selectedId||!isBnfRecord(r))throw Error('Retenez explicitement une notice BnF pour chaque ISBN sélectionné.');if(!r.inBasket){records.put({...r,inBasket:true});added++;}}}catch(e){error=e;tx.abort();}};}).catch(e=>{throw error||e;});return added;}
