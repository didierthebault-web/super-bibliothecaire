import {createExportPlan,serializePlan} from '../export-plan.js';
export function analyzeTechnical(record,options,date){
 try{const plan=createExportPlan([record],options);if(plan.excluded.length)return {status:'blocked',repairs:[],message:plan.excluded[0].message};
  serializePlan(plan);const repairs=plan.ready[0].repairs.map(r=>({...r,date}));return {status:repairs.length?'prepared':'direct',repairs,message:''};
 }catch(e){return {status:'blocked',repairs:[],message:e.message};}
}
