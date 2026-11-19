"""Independent MARC verification; pymarc is installed only under .verification."""
from pathlib import Path
import json,sys
root=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(root/'.verification'))
from pymarc import MARCReader
results=[]
for stem in ['comparative-mixed','comparative-real-mixed']:
    expected=json.loads((root/f'tests/screenshots/{stem}-expected.json').read_text(encoding='utf-8'))
    records=list(MARCReader((root/f'tests/screenshots/{stem}.mrc').read_bytes(),to_unicode=True,force_utf8=True))
    assert len(records)==len(expected)
    for actual,original in zip(records,expected):
        assert actual is not None
        fields=[]
        for f in actual.fields:
            fields.append({'tag':f.tag,'value':f.data} if f.is_control_field() else {'tag':f.tag,'ind1':f.indicators[0],'ind2':f.indicators[1],'subfields':[{'code':s.code,'value':s.value} for s in f.subfields]})
        assert fields==original['fields'],(stem,original['id'])
        for pos in [5,6,7,8,9,17,18,19]:
            assert str(actual.leader)[pos]==original['leader'][pos]
        if original['provenance'].get('ppn'):
            assert actual['001'].data=='261865854'
            assert 'sudoc.fr/261865854' in actual['003'].data
            assert actual.get_fields('801')
    results.append({'file':stem+'.mrc','records':len(records),'allFieldsAndSubfieldsIdentical':True,'semanticLeaderPositionsPreserved':True})
report={'parser':'pymarc 5.4.1','results':results}
(root/'docs/comparative-pymarc.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(report,ensure_ascii=False,indent=2))
