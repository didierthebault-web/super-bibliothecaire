import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createRecord,validate,encodeRecord,clone} from '../src/marc.js';
import {repairPersonalIndicators,personalIndicatorRepairs} from '../src/indicators.js';
import {readISO2709} from '../src/iso-reader.js';
const author=(tag='700',ind2='|',subfields=[{code:'a',value:'Haussmann'},{code:'b',value:'Martin'},{code:'4',value:'070'}])=>({tag,ind1:' ',ind2,subfields});
test('700/701/702 : indicateur de remplissage rejeté avant export',()=>{for(const tag of ['700','701','702']){const r=createRecord();r.fields=[author(tag)];assert(validate(r).some(x=>x.severity==='error'&&x.index===0));assert.throws(()=>encodeRecord(r));}});
test('correction explicite fondée sur $b, toutes les autres données préservées',()=>{const r=createRecord();r.fields=[author(),author('702'),{tag:'999',ind1:' ',ind2:' ',subfields:[{code:'a',value:'À conserver'}]}];const before=clone(r);const changes=repairPersonalIndicators(r);assert.equal(changes.length,2);for(const c of changes)before.fields[c.index].ind2='1';assert.deepEqual(r,before);assert(!validate(r).some(x=>x.severity==='error'));assert.deepEqual(readISO2709(encodeRecord(r))[0].fields,r.fields);assert.equal(repairPersonalIndicators(r).length,0);});
test('aucune inférence ambiguë sans $b ou avec $d ; premier indicateur contrôlé',()=>{const r=createRecord();r.fields=[author('700','|',[{code:'a',value:'Voltaire'}]),author('702','|',[{code:'a',value:'Henri'},{code:'b',value:'X'},{code:'d',value:'IV'}])];assert.equal(personalIndicatorRepairs(r).length,0);r.fields=[author('700','0')];assert(validate(r).some(x=>x.message.includes('présence de $b')));r.fields=[author('700','1')];r.fields[0].ind1='0';assert(validate(r).some(x=>x.message.includes('premier indicateur')));});
