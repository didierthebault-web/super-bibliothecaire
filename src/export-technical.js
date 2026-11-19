// ISO 2709 transport preparation only. No documentary rules are used here.
const enc = new TextEncoder(), dec = new TextDecoder('utf-8', {fatal:true});
export function prepareRecord(original, {keep001=true, date=new Date().toISOString()}={}) {
  const record=structuredClone(original), repairs=[];
  const fail=message=>{throw Error(message);};
  const trace=(zone,anomaly,before,after,rule)=>repairs.push({recordId:original.id,zone,anomaly,original:before??null,exported:after,rule,date});
  if(typeof record.leader!=='string'||record.leader.length!==24||!/^[\x20-\x7e]{24}$/.test(record.leader)) fail('Label non sérialisable : 24 caractères ASCII requis. Les données bibliographiques ne sont pas devinées.');
  if(!Array.isArray(record.fields))fail('Liste de zones absente.');
  record.fields=record.fields.filter(f=>keep001||f.tag!=='001');
  const text=(s,zone)=>{if(typeof s!=='string')fail('Valeur non textuelle en '+zone+'.');if(/[\x00\x1d-\x1f]/.test(s))fail('Délimiteur ISO 2709 ou caractère nul dans la valeur de '+zone+'.');if(dec.decode(enc.encode(s))!==s)fail('Unicode non représentable sans perte en '+zone+'.');};
  let offset=0;
  for(const f of record.fields){
    if(!f||typeof f.tag!=='string'||!/^\d{3}$/.test(f.tag))fail('Étiquette technique invalide : trois chiffres requis.');
    let raw;
    if(Number(f.tag)<10){if(f.subfields!==undefined)fail('Zone de contrôle ambiguë en '+f.tag+'.');text(f.value,f.tag);raw=f.value;}
    else {
      for(const key of ['ind1','ind2']){
        if(f[key]===undefined||f[key]===null||f[key]===''){trace(f.tag,'Indicateur absent ('+key+')',f[key],' ','missing-indicator-to-space');f[key]=' ';}
        if(typeof f[key]!=='string'||!/^[\x20-\x7e]$/.test(f[key]))fail('Indicateur non sérialisable en '+f.tag+' : un caractère ASCII requis.');
      }
      if(!Array.isArray(f.subfields))fail('Structure des sous-zones absente en '+f.tag+'.');
      for(const s of f.subfields){if(!s||typeof s.code!=='string'||!/^[\x20-\x7e]$/.test(s.code))fail('Code de sous-zone non sérialisable en '+f.tag+'.');text(s.value,f.tag+'$'+s.code);}
      raw=f.ind1+f.ind2+f.subfields.map(s=>'\x1f'+s.code+s.value).join('');
    }
    const size=enc.encode(raw).length+1;
    if(size>9999||offset>99999)fail('Limite technique du répertoire ISO 2709 dépassée en '+f.tag+'. Aucune troncature appliquée.');
    offset+=size;
  }
  const base=25+12*record.fields.length,total=base+offset+1;
  if(total>99999||base>99999)fail('Notice trop longue pour ISO 2709. Aucune zone n’a été tronquée.');
  const leader=[...record.leader];
  for(const [pos,value,rule] of [[0,String(total).padStart(5,'0'),'record-length'],[10,'22','indicator-subfield-length'],[12,String(base).padStart(5,'0'),'base-address'],[20,'4500','directory-entry-map']]){
    const before=leader.slice(pos,pos+value.length).join('');
    if(before!==value)trace('LDR/'+pos,'Information technique recalculée',before,value,rule);
    leader.splice(pos,value.length,...value);
  }
  record.leader=leader.join('');
  return {record,repairs};
}
