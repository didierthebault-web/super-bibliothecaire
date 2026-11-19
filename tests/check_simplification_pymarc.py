"""Independent comparison with pymarc 5.x; execute after marc-expectations.mjs."""
import json
import sys
from pathlib import Path
root = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(root / '.verification'))
from pymarc import MARCReader
results = []
for case in json.loads((root / '.verification/marc-expected.json').read_text(encoding='utf-8')):
    actual = list(MARCReader((root / case['file']).read_bytes(), force_utf8=True))
    assert len(actual) == len(case['records'])
    for record, expected in zip(actual, case['records']):
        assert record is not None
        fields = []
        for field in record.fields:
            if field.is_control_field():
                fields.append({'tag': field.tag, 'value': field.data})
            else:
                fields.append({'tag': field.tag, 'ind1': field.indicators[0], 'ind2': field.indicators[1], 'subfields': [{'code': s.code, 'value': s.value} for s in field.subfields]})
        assert fields == expected['fields'], case['file']
    results.append({'file': case['file'], 'records': len(actual), 'fieldsAndAccentsIdentical': True})
(root / 'docs/simplification-pymarc.json').write_text(json.dumps(results, indent=2, ensure_ascii=False), encoding='utf-8')
print(json.dumps(results, ensure_ascii=True))
