import {catalogLabels} from '../catalog-provenance.js';
import {technicalStatuses} from './quality-status.js';
import {provenanceLabels} from './quality-engine.js';
const quote=value=>'"'+String(value??'').replace(/^(?:\s*[=+@-]|[\t\r\n])/,"'$&").replaceAll('"','""')+'"';
export function qualityCSV(analysis){const rules=analysis.options.rules,headers=['Identifiant local','Titre','Auteur','Date','ISBN','ARK','Méthode de récupération','Date de récupération','Catalogue source','Identifiant source',...rules.map(r=>'Présence '+r.zone),'ISBN partagé','ARK partagé','Statut technique','Nombre de réparations techniques','Observations',"Date d'analyse"];
 return '\uFEFF'+[headers,...analysis.rows.map(r=>[r.id,r.summary.title,r.summary.author,r.summary.date,r.summary.isbn,r.summary.ark,provenanceLabels[r.provenance],r.retrievedAt,catalogLabels[r.catalog],r.sourceIdentifier,...rules.map(rule=>r.presence[rule.id]?'Oui':'Non'),r.isbnShared?'Oui':'Non',r.arkShared?'Oui':'Non',technicalStatuses[r.technical.status].label,r.technical.repairs.length,r.observations.map(o=>o.message).join(' | '),analysis.date])].map(row=>row.map(quote).join(';')).join('\r\n');
}
export function qualityFilename(date){const parts=Object.fromEntries(new Intl.DateTimeFormat('fr-FR',{timeZone:'Europe/Paris',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date(date)).map(p=>[p.type,p.value]));return `Suzanne_qualite_lot_${parts.year}-${parts.month}-${parts.day}_${parts.hour}${parts.minute}.csv`;}
