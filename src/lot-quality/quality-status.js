// Stable identifiers; these labels are the single source for all user-facing surfaces.
export const technicalStatuses=Object.freeze({
 direct:Object.freeze({label:"Prêtes pour l'export MARC",description:'Notices pouvant être exportées au format .mrc sans réparation technique.'}),
 prepared:Object.freeze({label:'Exportables après adaptation technique',description:'Notices nécessitant une adaptation technique sûre, automatique et tracée avant export.'}),
 blocked:Object.freeze({label:"Export impossible en l'état",description:"Notices présentant une anomalie technique qui ne peut pas être corrigée automatiquement sans risque d'altération."})
});
