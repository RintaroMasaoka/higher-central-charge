"""Serialize independently adjudicated delta decisions and validate occurrence binding."""
import hashlib
import importlib.util
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
OUT = Path(__file__).resolve().parent
SKILL = Path('/Users/rintaromasaoka/Desktop/Skills/study-note/scripts')
spec = importlib.util.spec_from_file_location('validator', SKILL / 'validate_japanese_coverage.py')
validator = importlib.util.module_from_spec(spec)
spec.loader.exec_module(validator)

sources = {
 'sugawara': {'locator':'https://www2.yukawa.kyoto-u.ac.jp/~eguchi40/Sugawara.pdf#page=12','usage':'N=4 and N=3 SCA 指標公式 and モジュラー変換公式; extended characters in CFT. Direct web text inspected at lines 57–64.','genre':'CFT researcher lecture slides','community':'CFT'},
 'yamaguchi': {'locator':'https://www-het.phys.sci.osaka-u.ac.jp/~yamaguch/j/pdf/d.pdf#page=18','usage':'χ characters, modular S and T transformations including τ→τ+1; Japanese 指標 and モジュラー変換 in running explanation. Search returned actual thesis passage; direct open failed.','genre':'researcher doctoral thesis','community':'CFT / string theory'},
 'orii': {'locator':'https://www2.yukawa.kyoto-u.ac.jp/~soken.editorial/sokendenshi/vol46/3/時間反転対称な位相的場の理論.pdf#page=78','usage':'Table 4.1 at manuscript page 77: 高次中心電荷の自明性 and 可換/非可換エニオン系. Direct web text inspected at lines 3985–3991.','genre':'scholarly TQFT review / thesis','community':'anyon theory / topological phases'},
 'kasama': {'locator':'https://www.jstage.jst.go.jp/article/natsugaku/4/0/4_173/_pdf/-char/ja#page=8','usage':'高次の中心電荷（higher central charges）in running prose, page 180; direct web text inspected at lines 451–455.','genre':'物性若手夏の学校 researcher lecture text','community':'topological quantum matter'},
 'miyazaki': {'locator':'https://opac.agulin.aoyama.ac.jp/iwjs0011opc/bdyview.do?bodyid=TF02037564&elmid=Body&fname=tf02037564-1.pdf&loginflg=on&once=true#page=53','usage':'Directly inspected web PDF lines 3048–3051 at PDF page 53 name −log(ρ_A) エンタングルメントハミルトニアン and connect its eigenvalues to entanglement spectrum.','genre':'physics doctoral thesis','community':'many-body quantum information'},
 'okunishi': {'locator':'https://kaken.nii.ac.jp/ja/file/KAKENHI-PROJECT-17H02931/17H02931seika.pdf','usage':'エンタングルメントハミルトニアン in running Japanese many-body/CFT prose with reduced-state thermal interpretation. Actual report passage returned by search.','genre':'researcher-authored research report','community':'many-body entanglement / CFT'}
}

# All assignments below are semantic decisions, not scanner-driven category defaults.
settled = {
 '指標': ('character of a CFT representation', ['キャラクター','character'], ['sugawara','yamaguchi'], 'Reader already knows CFT characters. Both independent CFT authors use 指標 for this object, so it preserves the familiar name.'),
 'モジュラー変換': ('modular transformation of CFT characters', ['モジュラ変換','modular transformation'], ['sugawara','yamaguchi'], 'Both sources couple this Japanese name directly to characters. The explicit τ map fixes the mathematical operation and distinguishes it from spatial translation.'),
 '高次中心電荷': ('higher central charge invariant of anyon theory', ['高次の中心電荷','higher central charge'], ['orii','kasama'], 'Independent TQFT and condensed-matter sources use the two Japanese variants for the same invariant. Current compound remains recognizable and coherent with 中心電荷.'),
 'エンタングルメントハミルトニアン': ('generator −log ρ of a reduced density matrix', ['エンタングルメント・ハミルトニアン','モジュラーハミルトニアン'], ['miyazaki','okunishi'], 'Two independently authored many-body sources use this Japanese working name for the reduced-state generator. Preserve it; モジュラーハミルトニアン is a legitimate QFT variant, but adding it here does not help this CFT-character reader distinguish the generator from the physical edge energy.')
}
unresolved = {
 'エンタングルメント境界': ('effective edge at the entanglement cut, not a new physical edge of a cut sample','entanglement cut / effective entanglement edge',['エンタングルメント切断','entanglement cut'],'Its identity is explained by A/B division, but its full Japanese name recurs as a scientific handle. Exact-phrase searches found no relevant Japanese topological-matter naming comparison; holographic boundaries were excluded.','Two same-referent Japanese topological-matter usages or an explicit adopted local naming convention.'),
 '熱密度行列': ('normalized Gibbs-form effective reduced density matrix','thermal density matrix',['熱的な密度行列','Gibbs 状態'],'The expression is mathematically transparent; exact-phrase search did not yield two relevant Japanese many-body sources. Machine-translated papers were excluded. Missing attestation is not a prose defect.','Two independent Japanese usages for the Gibbs-form reduced state in the intended community.'),
 '部分回転': ('translation of subsystem A around the cylinder by angle 2π/n','partial rotation',['partial rotation','部分並進'],'The paper establishes this operator identity, but independent Japanese preference comparison for the full name was not obtained. 部分並進 can denote a different general operation, so it cannot be substituted solely from lexical similarity.','Independent Japanese naming comparison or explicit project authority for this cylinder operation.'),
 '位相の枝': ('choice of c_- among real solutions giving the same measured exponential','inverse phase / logarithm branch',['同じ位相を与える中心電荷の候補'],'Here it is a referential explanation of the inverse ambiguity, not a new named invariant. The displayed periodicity identifies the candidates. Japanese preference evidence for the expression in this inverse-measurement context remains unchecked.','Two relevant usages or an adopted explanation convention; absence alone does not warrant CHANGE.'),
 'cut-and-glue': ('join opposing edge theories across an entanglement cut to describe gapped bulk','cut-and-glue',['cut-and-glue approach','切断面を挟むエッジの結合'],'Original English handle is retained and meaning explained. Japanese usage preference comparison was not completed; no new Japanese technical handle is invented.','A second relevant physics source and Japanese audience naming comparison for the original-English handle.'),
 'spin structure': ('fermion boundary condition around the circumferential circle, transformed modularly','spin structure',['スピン構造','spin structure'],'English identifies a standard geometric/fermion concept, not ordinary magnetic spin texture. This delta explains its operation but does not define its two boundary conditions; Japanese community preference remains unverified.','Two Japanese fermionic CFT/topological-matter usages comparing original English with スピン構造.')
}
incidental = {
 '主要項':'leading asymptotic contribution, with its coefficient and validity supplied by adjacent formula',
 '実数倍':'multiplication by a real scalar, explicitly positive here',
 '絶対値':'modulus of the complex sum, defined by displayed vertical bars',
 '複素数':'complex-valued unnormalized sum ζ_{n,a}',
 '真空':'vacuum sector labelled 1, fixed before these changed lines',
 '位相':'argument/unit phase of a nonzero complex number, fixed by normalization in overview',
 '非ゼロ':'nonvanishing scalar coefficient or sum, stated by explicit mathematical condition',
 'エッジ':'propagating edge degrees of freedom, already anchored to left/right boundary Hamiltonians',
 '中心電荷':'central charge c of a CFT, assumed familiar to reader of characters',
 '実数因子':'positive real multiplicative factor in the asymptotic expression, not a new named invariant',
 'フェルミオン':'fermionic state/statistics, a standard contrast with bosonic theory',
 'FQH':'fractional quantum Hall state, an unchanged source label rather than a proposed Japanese translation',
 'ボソン':'bosonic state/statistics, governing scope already set in overview',
 'non-Abelian':'anyon theory with nontrivial fusion multiplicities, unchanged English classification',
 'Abelian':'anyon theory with dimension-one simple objects, unchanged English classification',
 'エニオン理論':'theory of anyon data, distinct from actual physical central charge modulo eight',
 'エニオン':'anyon quasiparticle types defined in overview',
 'ギャップ':'finite excitation-energy threshold; unchanged established physics name',
 '部分理論':'prime-power component of an Abelian anyon theory; descriptive mathematical component, specified by decomposition',
 '素数':'prime integer p in the displayed factorization, ordinary prerequisite mathematics',
 '指数関数':'complex exponential displayed immediately above, ordinary prerequisite mathematics',
 '周期':'shift of c_- preserving the displayed exponential, ordinary mathematical periodicity',
 'カイラリティ':'net directional thermal propagation corresponding to nonzero c_-, rather than anyon data alone',
 '周長':'circumference L of the cylinder, fixed geometrical length',
 'CFT':'conformal field theory, original acronym assumed familiar to reader of characters',
 'Laughlin':'proper name of a quantum Hall state, preserved source identity',
 'ボンド次元':'dimension of MPS auxiliary bond space controlling numerical truncation',
 '磁気長':'magnetic length ℓ_B, explicitly defined beside the reported circumference',
 'momentum polarization':'original English named partial-translation observable in small-angle limit',
 'Hall 粘性':'Hall viscosity η_H in the explicitly displayed circumference-squared contribution',
 'セミオン':'semion with spin phase i, defined and calculated in overview',
 '引数':'complex modular parameter passed to character χ, not an experimental adjustment parameter',
 '虚部':'imaginary part of τ, whose large/small value controls Boltzmann suppression',
 '係数':'matrix entry multiplying vacuum character, explicitly (ST^nS)_{11}',
 '低温':'large-imaginary-τ regime of the character, not actual sample cooling',
 '自由度':'subsystem degrees of freedom in the A/B factorization, ordinary established physics concept',
 '基底':'basis in the all-system trace, not ground state in this occurrence',
 '全トレース':'trace over both A and B factors; contextual expansion of ordinary trace operation',
 'トレース':'matrix/operator trace, whose subsystem is specified by adjacent words/formula',
 '単位行列':'identity on B in the expectation-value trace, not a physical state of A',
 '期待値':'expectation of a unitary in the normalized state',
 '規格化':'normalization, applied separately to complex phase and state norm in explicitly distinct clauses',
 '直交':'zero overlap of original and partially rotated normalized states',
 '長波長':'long-wavelength regime in which edge CFT supplies effective description',
 '切断面':'geometric surface separating subsystem A from B, not physical cleavage',
 '密度行列':'operator representing the reduced state, fixed by ρ_A=Tr_Bρ',
 'ハミルトニアン':'CFT energy operator H used in the Gibbs exponential',
 '基底状態':'ground state of the full original sample, not the tracing basis',
 '逆温度':'β parameter of the effective Gibbs exponential, explained without actual-heating implication',
 '摂動':'terms perturbing the pure CFT entanglement-Hamiltonian description',
 '有限集合':'finite integer set of measurement angles generated earlier in boundary chapter',
 '分類定理':'externally cited mathematical classification used as an input to boundary inference'
}
ordinary = {
 '二':'Number two counts subsystem parts and the later pair of characters; it is not a scientific name.',
 '境界':'Geometric/physical boundary is explicitly qualified in these clauses; review the full エンタングルメント境界 separately rather than giving the short everyday noun a new technical role.',
 '障害':'Descriptive obstruction to existence of a gapped boundary; no new formal obstruction invariant named by this noun.',
 '判定条件':'Conditions to draw a conclusion, referring to explicitly written integer and central-charge requirements; not a new technical term.',
 '必要条件':'Ordinary logical necessity with the antecedent integer conditions present in the formula.',
 '十分条件':'Ordinary logical sufficiency; Abelian qualification is retained and scope differs from necessary condition.',
 '分類結果':'Ordinary description of cited results, not a proposed technical name for a different classification.',
 '数値評価':'Ordinary statement of computing an observable numerically; object is separately named.',
 '近似':'Ordinary approximate status; mathematical object and omitted perturbations are expressly supplied.',
 '重み':'Ordinary explanatory label for Gibbs/Schmidt probabilities, not a new technical name.',
 '物理的な仮定':'Ordinary status of edge-CFT approximation; no implication of proof or exact equality.',
 '引数を求める':'Question about solving the inverse modular map; it does not assign a new name to a scientific object.',
 '確認：分子を低温の指標で表すには、どの引数を求めるか':'Summary asks which modular argument reconstructs the numerator from low-temperature characters. It names no additional scientific entity; 指標 and 引数 are individually reviewed.'
}

def decision(surface):
 if surface in settled:
  referent, alternatives, keys, reason = settled[surface]
  english = {'指標':'character','モジュラー変換':'modular transformation','高次中心電荷':'higher central charge','エンタングルメントハミルトニアン':'entanglement Hamiltonian'}[surface]
  return dict(role='disciplinary_name',impact='high',referent=referent,decision='KEEP',reason=reason,comparison=dict(current=surface,english_or_not_applicable=english,alternatives_or_not_applicable=alternatives,audience_reason=reason),evidence_sources=[sources[k] for k in keys])
 if surface in unresolved:
  referent, english, alternatives, reason, missing = unresolved[surface]
  return dict(role='explanatory_gloss' if surface=='位相の枝' else 'disciplinary_name',impact='high',referent=referent,decision='UNVERIFIED',reason=reason,uncertainty_reason=reason,missing_evidence=missing,blocks_whole_range_pass=True,comparison=dict(current=surface,english_or_not_applicable=english,alternatives_or_not_applicable=alternatives,audience_reason='Meaning is locally identifiable; preferred naming cannot be certified from that fact alone.'))
 if surface in ordinary:
  return dict(role='ordinary_syntax',impact='high' if surface.startswith('確認：') else 'incidental',decision='KEEP',reason=ordinary[surface])
 referent = incidental[surface]
 if surface=='Laughlin':
  return dict(role='proper_name',impact='incidental',decision='KEEP',reason='Laughlin identifies the cited quantum Hall state and preserves its proper name.')
 # Incidental carry-forward is limited to identity and syntax, never independent naming preference.
 return dict(role='disciplinary_name' if surface not in {'実数因子','部分理論','全トレース','有限集合','分類定理'} else 'explanatory_gloss',impact='incidental',referent=referent,decision='UNVERIFIED',reason=referent+'; no new name is introduced by this delta.',uncertainty_reason='This delta review has not completed independent Japanese preference evidence for this existing prerequisite name.',missing_evidence='Independent Japanese naming comparison if whole-manuscript acceptance is requested.',blocks_whole_range_pass=False,defer_reason='Referent is fixed by an adjacent explicit formula, prior definition, source proper identity, or reader prerequisite; spelling preference uncertainty here does not change the operation or claim. Any high-impact whole-manuscript first-use decision remains outside this delta verdict.')

def occurrences(text, surface, line):
 result=[]; start=0
 while True:
  at=text.find(surface,start)
  if at<0: return result
  result.append(dict(line=line,column=at+1));start=at+len(surface)

results=[]
for path in sorted(OUT.glob('*.inventory.json')):
 inv=json.loads(path.read_text());line=inv['review_lines'][0]
 text=Path(inv['input']).read_text().splitlines()[line-1]
 review=dict(input_sha256=inv['input_sha256'],review_lines=inv['review_lines'],manual_sweep=dict(completed=True,reviewed_lines=inv['review_lines']),dispositions=[],supplemental_concepts=[])
 scanned={x['surface'] for x in inv['repeated_candidates']}
 for row in inv['repeated_candidates']:
  d=decision(row['surface']);d.update(candidate_id=row['id'],surface=row['surface'],occurrences=row['occurrences']);review['dispositions'].append(d)
 all_terms=list(settled)+list(unresolved)+list(incidental)+list(ordinary)
 for surface in all_terms:
  if surface in scanned: continue
  occ=occurrences(text,surface,line)
  if not occ: continue
  # Avoid duplicating the short エニオン name inside the full エニオン理論 handle.
  if surface=='エニオン':
   occ=[o for o in occ if not text[o['column']-1:].startswith('エニオン理論')]
   if not occ: continue
  d=decision(surface);d.update(id='manual-'+str(len(review['supplemental_concepts'])+1),surface=surface,occurrences=occ);review['supplemental_concepts'].append(d)
 target=path.with_name(path.name.replace('.inventory.','.coverage.'))
 target.write_text(json.dumps(review,ensure_ascii=False,indent=2)+'\n')
 result=validator.validate(inv,review);result['inventory']=path.name;result['supplemental_count']=len(review['supplemental_concepts']);results.append(result)
(OUT/'validator-results.json').write_text(json.dumps(results,ensure_ascii=False,indent=2)+'\n')
(OUT/'independently-inspected-evidence.json').write_text(json.dumps(sources,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'validated_ranges':len(results),'scanned_candidates':sum(r['candidate_count'] for r in results),'supplemental_concepts':sum(r['supplemental_count'] for r in results)}))
