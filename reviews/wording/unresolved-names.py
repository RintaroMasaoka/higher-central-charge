import json
from pathlib import Path

out=Path('/Users/rintaromasaoka/Desktop/Learning/Study/Higher-central-charge/reviews/wording')
items={}
ordinary=[]
source_bindings={}
for path in sorted(out.glob('*.coverage.json')):
    review=json.loads(path.read_text())
    source_bindings[path.stem]=review['projection']
    for row in review['dispositions']+review['supplemental_concepts']:
        if row['role']=='ordinary_syntax':
            ordinary.append({'file':path.stem,'surface':row['surface'],'occurrences':row['occurrences'],'reason':row['reason']})
        elif row.get('decision')=='UNVERIFIED' and row['impact']=='high':
            key=(row['role'],row['surface'])
            item=items.setdefault(key,{'surface':row['surface'],'role':row['role'],'referent':row['referent'],
                   'missing_evidence':row['missing_evidence'],'occurrences':[],
                   'priority':'interpretation-sensitive' if row['surface']=='トポロジカルスピン' else 'full-range naming evidence unfinished'})
            item['occurrences'].extend({'file':review['projection']['source'],**o} for o in row['occurrences'])
result={'status':'DIAGNOSTIC / NO WHOLE-RANGE WORDING PASS','source_bindings':source_bindings,
        'prioritized_unverified_names':sorted(items.values(),key=lambda r:(r['priority']!='interpretation-sensitive',r['role'],r['surface'])),
        'ordinary_syntax_dispositions':ordinary,
        'limits':'Some scanner surfaces combine several scientific referents and need semantic occurrence partition refinement; validator success proves coordinate coverage only. No missing Japanese evidence is asserted to be a scientific defect.'}
(out/'unresolved-names.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print('unverified distinct names/glosses',len(items),'ordinary dispositions',len(ordinary))
print(' | '.join(r['surface'] for r in result['prioritized_unverified_names'] if r['role']=='disciplinary_name'))
