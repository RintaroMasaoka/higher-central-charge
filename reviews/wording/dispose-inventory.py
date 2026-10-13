import json
import re
import runpy
from pathlib import Path

ROOT = Path('/Users/rintaromasaoka/Desktop/Learning/Study/Higher-central-charge')
OUT = ROOT / 'reviews/wording'
evidence = json.loads((OUT/'term-evidence.json').read_text())
known = {r['current_candidate']:r for r in evidence['term_pairs']}
technical = {
 'エッジ':'boundary edge degrees of freedom','セクター':'topological sector','セミオン':'semion anyon',
 'トレース':'operator trace','ボソン':'boson statistics','中心電荷':'CFT central charge',
 '位相':'complex phase','切断':'bipartition cut','実空間':'real space',
 '微小角':'small-angle asymptotic limit','成分':'oppositely propagating CFT components',
 '校正':'matching momentum and charge origins to CFT','状態':'quantum state',
 '相':'topological phase','真空':'trivial topological sector', '軌道':'Landau-level orbital',
 '近似':'leading CFT approximation','運動量':'circumferential momentum',
 '運動量ラベル':'iMPS momentum label','部分回転':'partial rotation of a cylinder',
 '電荷':'U(1) charge','エニオン理論':'bosonic anyon theory','ギャップ':'spectral energy gap',
 '境界':'physical or entanglement boundary','指数':'Frobenius-Schur exponent or prime-factor exponent',
 '部分理論':'prime-power anyon subtheory','並進':'circumferential translation',
 '主要項':'leading asymptotic contribution','実部':'real part of modular parameter',
 '虚部':'imaginary part of modular parameter','真空係数':'vacuum coefficient in transformed character',
 '行列':'CFT modular matrix','エンタングルメント':'quantum entanglement',
 '円筒':'cylindrical sample geometry','周方向':'circumferential coordinate',
 '期待値':'quantum expectation value','確率':'Schmidt probability',
 '自由度':'edge or bulk degrees of freedom','角度':'rotation angle',
 '励起':'quantum excitation','準粒子':'topological quasiparticle','統計':'anyon braiding/self-statistics',
 '分解':'Schmidt decomposition', '変換':'CFT modular transformation or arithmetic change',
 '変換先':'transformed modular parameter','成分':'CFT propagating component',
 'ラベル':'topological or momentum/charge label', '内部':'gapped bulk region'
 , 'シュミット':'Schmidt-state/coefficient naming fragment','ボンド':'MPS auxiliary bond',
 'ハミルトニアン':'physical or entanglement Hamiltonian','指標':'CFT character',
 'モジュラー':'modular transformation adjective','モジュラー行列':'CFT modular representation matrix','逆温度':'effective inverse temperature',
 '基底':'orthonormal CFT basis','正則化':'finite-temperature boundary-state regulator'
}
ordinary = {
 '一方':'contrast connective','二':'number two','一':'number one','中心':'spatial center fragment',
 '使':'verb stem use','例':'example label','分':'verb or fraction fragment',
 '原論文':'bibliographic source reference','反対向':'direction adjective fragment',
 '収束':'numerical approach to prediction','右':'right-hand side/direction word','同':'sameness modifier',
 '周長':'circumference L description','和':'sum of displayed summands','変':'verb change fragment',
 '大':'size adjective stem','対応':'correspondence relation','左':'left-hand side/direction word',
 '式':'equation reference','得':'verb obtain stem','残':'verb remain stem','比較':'comparison action',
 '物理的':'physical modifier','用':'verb use stem','異':'different modifier','示':'verb show stem',
 '種類':'type/label description','系':'system context','表':'display/table or verb stem',
 '補足':'supplementary source reference','論文':'paper reference','足':'verb sum stem','項':'displayed summand',
 '全':'all quantifier','判定':'decision action','十分条件':'logical sufficient condition',
 '合':'verb combine fragment','含':'verb include fragment','場合':'case connective',
 '定理':'cited theorem category','実際':'actual-value modifier','対':'relation fragment',
 '必要':'necessity adjective','必要条件':'logical necessary condition','情報':'information word',
 '整数':'ordinary mathematical integer','条件':'stated condition','決':'verb determine fragment',
 '測定':'measurement action','確定':'determine action','確認':'self-check/action','互':'coprimality relation fragment',
 '素':'coprimality fragment','補正':'phase compensation action','覆':'verb cover stem',
 '調':'verb investigate stem','選':'verb choose stem','開':'verb open stem',
 '障害':'obstruction claim word rather than a substitute object name','集合':'stated finite set',
 '与':'verb give stem','元':'original-value modifier','分子':'numerator of a displayed ratio',
 '分母':'denominator of a displayed ratio','固定':'fixed-parameter modifier','引数':'function argument',
 '掛':'verb multiply stem','消':'verb cancel stem','向':'direction stem','操作':'stated operation word',
 '書':'verb write stem','等式':'equality category','ゼロ':'zero value','定義':'definition action',
 '数':'number/category word','積':'product of independent theories or complex sums','計算':'calculation action',
 '重':'weight/multiply stem','参照':'source-reference action','明示':'explicit-statement action',
 '本ノート':'this document reference','本文':'main-text reference','本文式':'main-text equation reference',
 '規格化':'normalization operation','係数':'displayed basis coefficient'
}
validate = runpy.run_path('/Users/rintaromasaoka/Desktop/Learning/Study/.codex/skills/study-note/scripts/validate_japanese_coverage.py')['validate']

def judgment(surface, occ, structural=False):
    high = structural or surface in technical or surface in known
    if surface in known:
        pair=known[surface]
        status=pair['provisional_disposition']
        row={'role':'disciplinary_name','impact':'high','referent':pair['english'],
             'decision':'KEEP' if status=='KEEP' else 'UNVERIFIED','reason':pair['audience_reason']}
        if row['decision']=='KEEP':
            row['comparison']={'current':surface,'english_or_not_applicable':pair['english'],
                               'alternatives_or_not_applicable':pair['alternatives'],'audience_reason':pair['audience_reason']}
            row['evidence_sources']=[dict(evidence['sources'][e['source']], usage=e['usage']) for e in pair['evidence']]
        else:
            row['uncertainty_reason']='Phase versus spin convention needs same-referent preference evidence.' if surface=='トポロジカルスピン' else pair.get('missing_evidence','Second direct independent Japanese usage pending.')
            row['missing_evidence']=pair.get('missing_evidence','Second independent running-prose Japanese usage for phase theta, rather than h modulo integers.')
    elif surface in technical or structural:
        row={'role':'explanatory_gloss' if structural else 'disciplinary_name','impact':'high',
             'referent':technical.get(surface,surface),'decision':'UNVERIFIED',
             'reason':f'Full-source reading identifies {surface} as a handle for the stated scientific object or operation; no preference verdict follows from technical correctness alone.',
             'uncertainty_reason':f'Independent Japanese naming comparison for {surface} not completed.',
             'missing_evidence':f'Two same-referent Japanese physics sources or explicit project terminology authority for {surface}.',
             'blocks_whole_range_pass':True}
    else:
        meaning=ordinary.get(surface)
        if meaning is None and re.fullmatch('[ぁ-ゖー]+',surface):
            meaning=f'Japanese grammatical connective or copula {surface}'
        if meaning is None:
            raise RuntimeError(f'Undisposed surface: {surface}')
        row={'role':'ordinary_syntax','impact':'high' if structural else 'incidental',
             'reason':f'{surface}: {meaning}; not used to replace a disciplinary concept name.'}
    row['occurrences']=occ
    return row

for invfile in sorted(OUT.glob('*.inventory.json')):
    inv=json.loads(invfile.read_text())
    rows=[]
    for item in inv['repeated_candidates']:
        row=judgment(item['surface'],item['occurrences'])
        if any(item['surface'] in s['text'] for s in inv['structural_candidates']): row['impact']='high'
        row['candidate_id']=item['id'];row['surface']=item['surface'];rows.append(row)
    for i,item in enumerate(inv['structural_candidates']):
        text=item['text'];row=judgment(text,[{'line':item['line'],'column':item.get('column',1)}],True)
        row['candidate_id']=f'h{i+1}';row['surface']=text;rows.append(row)
    supplemental=[]
    lines=Path(inv['input']).read_text().splitlines()
    terms=list(known)+['Frobenius–Schur 指数','Abelian','non-Abelian','Schmidt','Hamiltonian','character','Character','modular','twisted higher central charge','momentum polarization','MPS','iMPS','iDMRG','Hall 粘性','Ishibashi','cut-and-glue','spin structure','real-space entanglement spectrum','Gauss–Milgram','熱 Hall 応答','全量子次元','共形重み','Landau 準位','磁気長','bond dimension','ボソン Laughlin 状態']
    for term in terms:
        coords=[]
        repeated=next((r for r in inv['repeated_candidates'] if r['surface']==term),None)
        if repeated: continue
        for no,line in enumerate(lines,1):
            for match in re.finditer(re.escape(term),line):coords.append({'line':no,'column':match.start()+1})
        if not coords:continue
        row=judgment(term,coords,term not in known)
        row.update(id=f'c{len(supplemental)+1}',surface=term);supplemental.append(row)
    review={'input_sha256':inv['input_sha256'],'review_lines':inv['review_lines'],
            'projection':inv['projection'],'manual_sweep':{'completed':True,'reviewed_lines':inv['review_lines']},
            'dispositions':rows,'supplemental_concepts':supplemental,
            'verdict':'No unqualified whole-range wording PASS: high-impact UNVERIFIED naming comparisons remain.'}
    coverage=OUT/(invfile.name.replace('.inventory.json','.coverage.json'))
    coverage.write_text(json.dumps(review,ensure_ascii=False,indent=2)+'\n')
    print(invfile.stem, validate(inv,review), 'unverified',sum(r.get('decision')=='UNVERIFIED' for r in rows+supplemental))
