"""Relecture indépendante du pilote réel ; exécuter après feasibility.cjs."""
import json
from pathlib import Path
from pymarc import MARCReader

root = Path(__file__).resolve().parents[1]
proof = json.loads((root / 'docs/faisabilite.json').read_text(encoding='utf-8'))
expected = [r for q in proof['results'] for r in q.get('records', []) if r['leader'][6:7].isalpha()][:3]
records = list(MARCReader((root / 'tests/pilote-bnf.mrc').read_bytes(), force_utf8=True))
assert len(records) == len(expected)
for actual, original in zip(records, expected):
    assert actual is not None
    fields = []
    for field in actual.fields:
        if field.is_control_field():
            fields.append({'tag': field.tag, 'value': field.data})
        else:
            fields.append({'tag': field.tag, 'ind1': field.indicator1, 'ind2': field.indicator2,
                           'subfields': [{'code': s.code, 'value': s.value} for s in field.subfields]})
    assert fields == original['fields'], 'Différence de données à la relecture pymarc'
result = {'library': 'pymarc 5.4.0', 'records': len(records), 'all_fields_equal': True,
          'accents_equal': True, 'koha_import_tested': False}
(root / 'docs/pymarc-results.json').write_text(json.dumps(result, indent=2), encoding='utf-8')
print(json.dumps(result))
