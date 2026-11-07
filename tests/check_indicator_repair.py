"""Compare deux fichiers avec pymarc ; seule la correction | -> 1 avec $b est admise."""
import sys
from pathlib import Path
from pymarc import MARCReader

original = list(MARCReader(Path(sys.argv[1]).read_bytes(), force_utf8=True))
corrected = list(MARCReader(Path(sys.argv[2]).read_bytes(), force_utf8=True))
assert len(original) == len(corrected)
changes = 0
for old, new in zip(original, corrected):
    assert old is not None and new is not None
    assert len(old.fields) == len(new.fields)
    for a, b in zip(old.fields, new.fields):
        if a.tag in ['700', '701', '702'] and a.indicator2 == '|' and a.get('b'):
            a.indicator2 = '1'
            changes += 1
        assert a.as_dict() == b.as_dict(), 'Une autre donnée a changé'
    assert all(old.leader[i] == new.leader[i] for i in list(range(5, 10)) + [17,18,19,23])
print(f'pymarc : {len(original)} notices, {changes} indicateurs corriges, autres donnees identiques')
