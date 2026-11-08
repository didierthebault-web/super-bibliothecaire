import {BnfConnector} from '../bnf.js';
import {mutateJob,loadJob} from './store.js';
export const wait=(ms,signal)=>new Promise((resolve,reject)=>{if(signal.aborted){reject(new DOMException('Interrompu','AbortError'));return;}const abort=()=>{clearTimeout(timer);reject(new DOMException('Interrompu','AbortError'));},timer=setTimeout(()=>{signal.removeEventListener('abort',abort);resolve();},ms);signal.addEventListener('abort',abort,{once:true});});
export class BatchRunner{
 constructor({search=(...args)=>new BnfConnector().search(...args),mutate=mutateJob,load=loadJob,sleep=wait,onChange=()=>{}}={}){Object.assign(this,{search,mutate,load,sleep,onChange});this.active=false;this.controller=null;this.id=null;}
 async control(status='paused'){if(!this.id)return;const job=await this.mutate(this.id,j=>{j.status=status;j.token=null;for(const t of j.tasks)if(t.status==='running')t.status='pending';});this.controller?.abort();this.onChange(job);}
 async run(id){if(this.active)throw Error('Un traitement est déjà actif dans cet onglet.');this.active=true;this.id=id;this.controller=new AbortController();const signal=this.controller.signal,token=crypto.randomUUID();
 const update=async fn=>{const job=await this.mutate(id,j=>{if(j.token!==token||j.status!=='running')throw Error('Traitement interrompu ou espace restauré.');fn(j);});this.onChange(job);return job;};
 try{let job=await this.mutate(id,j=>{if(j.status==='cancelled')throw Error('Ce traitement est annulé. Créez un nouveau traitement pour relancer ces ISBN.');j.status='running';j.token=token;for(const t of j.tasks)if(t.status==='running')t.status='pending';});this.onChange(job);
 while(!signal.aborted){job=await this.load(id);if(!job||job.token!==token||job.status!=='running')break;const task=job.tasks.find(t=>t.status==='pending');if(!task){await update(j=>{j.status='completed';j.token=null;});break;}
 const key=task.key;if(task.retryAt>Date.now())await this.sleep(task.retryAt-Date.now(),signal);
 // A request interrupted on its last attempt is still resumable. Only completed failures exhaust retries.
 await update(j=>{j.tasks.find(t=>t.key===key).status='running';});
 try{const result=await this.search('isbn',{isbn:key},task.nextStart,{timeoutMs:job.options.timeoutMs,signal});if(signal.aborted)break;
 await update(j=>{const t=j.tasks.find(t=>t.key===key);if(result.total<t.candidates.length||result.total>10000||result.total>0&&!result.records.length)throw Error('Pagination BnF incohérente : résultat à examiner manuellement.');t.total=result.total;t.candidates.push(...result.records);t.nextStart+=result.records.length;t.status=t.nextStart>result.total?'done':'pending';t.attempts=0;t.error='';t.transient=false;t.retryAt=0;t.url=result.url;});
 }catch(e){if(signal.aborted||e.name==='AbortError')break;await update(j=>{const t=j.tasks.find(t=>t.key===key);t.attempts++;t.error=e.message;t.transient=e.transient===true;t.retryAt=Date.now()+Math.max(e.retryAfterMs||0,j.options.backoffMs*2**(t.attempts-1));t.status=t.transient&&t.attempts<j.options.attempts?'pending':'error';});}
 await this.sleep(job.options.intervalMs,signal);
 }
 }catch(e){if(!signal.aborted)throw e;}finally{this.active=false;this.id=null;this.controller=null;}
 }
}
