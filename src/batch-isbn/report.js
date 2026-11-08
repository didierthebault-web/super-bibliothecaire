import {summary} from '../marc.js';
import {taskLabel,selectedCandidate} from './results.js';
const cell=v=>'"'+String(v??'').replace(/^(?:\s*[=+@-]|[\t\r\n])/,"'$&").replaceAll('"','""')+'"';
export function reportCSV(job,records=[]){const header=['Ligne','ISBN initial','ISBN normalisé','Statut','Candidats','Titre retenu','ARK','Décision humaine','Erreur'];return '\uFEFF'+[header,...job.rows.map(row=>{const t=job.tasks.find(t=>t.key===row.key),r=t&&(records.find(r=>r.id===t.recordId)||selectedCandidate(t)),s=r?summary(r):{};return [row.line,row.raw,row.normalized,row.error?'ISBN invalide':row.duplicateOf?'Doublon d’entrée':taskLabel(t,records),t?.total??'',s.title||'',s.ark||'',t?.decision||'',row.error||t?.error||''];})].map(row=>row.map(cell).join(';')).join('\r\n');}
