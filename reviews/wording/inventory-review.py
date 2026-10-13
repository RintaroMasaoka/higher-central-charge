import hashlib
import json
import re
from pathlib import Path
import runpy

ROOT = Path('/Users/rintaromasaoka/Desktop/Learning/Study/Higher-central-charge')
OUT = ROOT / 'reviews/wording'
inventory = runpy.run_path('/Users/rintaromasaoka/Desktop/Learning/Study/.codex/skills/study-note/scripts/japanese_inventory.py')['inventory']

for source in sorted((ROOT / 'content').glob('*.md')):
    original = source.read_bytes()
    lines = original.decode().splitlines()
    projection = OUT / (source.stem + '.visible.md')
    projection.write_text('\n'.join('' if line.strip().startswith('<!--') else re.sub(r'<[^>]+>',lambda m:' '*len(m.group()),line) for line in lines) + '\n')
    inv = inventory(projection)
    inv['projection'] = {'source':str(source), 'source_sha256':hashlib.sha256(original).hexdigest(), 'method':'Replace whole-line reference comments by empty lines and HTML tag markup by equal-width spaces; preserve line/column coordinates. Markdown text, image alt text and details/summary prose retained.'}
    (OUT / (source.stem + '.inventory.json')).write_text(json.dumps(inv, ensure_ascii=False, indent=2) + '\n')
    print(source.name, len(lines), len(inv['repeated_candidates']), len(inv['structural_candidates']))
    print(' | '.join(row['surface'] for row in inv['repeated_candidates']))
