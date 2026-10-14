import fs from 'node:fs';

const dir = new URL('./', import.meta.url);
const inventory = JSON.parse(fs.readFileSync(new URL('captions-inventory.json', dir)));
const lines = fs.readFileSync(new URL('captions-visible.md', dir), 'utf8').split('\n');
const ordinary = {
  'であり': '述語を接続する連用形で、対象の名前ではない。',
  'である': '文末の断定助動詞で、対象の名前ではない。',
  'ではない': '模式図と測定値、線と境界を区別する否定構文。',
  'になる': '計算または図上の変化の結果を述べる動詞構文。',
  'による': '寄与の原因または操作への対応を示す助詞句。',
  'ゼロ': '数値0を表す通常の数の読みで、状態の新しい分類名ではない。',
  'マイナス': '符号付き角度の負号を読み上げる語。',
  '一': '小数、分数、符号の付いた数の構成部分。',
  '三十六分': '分母36を読む分数の構成部分。',
  '上': '図の上側、上段、または基準線の上方を指す位置語。',
  '下': '図の下側、下段、または基準線の下方を指す位置語。',
  '下段': '図の配置段を指し、新しい物理的対象の分類ではない。',
  '二': '寄与や状態の個数または平方根の数値を示す。',
  '五': '小数0.5または2.5の数値の構成部分。',
  '使': '使う、使ったという動詞の語幹。',
  '例': '数値または状態の例示を示す普通名詞。',
  '円筒': '試料の幾何形状を表す普通名詞で、独立した状態名ではない。',
  '分': '分けるという操作動詞の語幹。',
  '印': '操作前後で追う図中の記号で、物理的励起の名称ではない。',
  '右': '図の列、因子、端または矢印の向きを指す位置修飾。',
  '各段': '繰り返された図の段を指す通常の数量表現。',
  '同': '同じ、同一という一致関係の修飾語。',
  '向': '向く、向きという図中の方向を述べる語幹。',
  '含': '整数が集合に含まれることを述べる動詞の語幹。',
  '四分': '分母4を読む分数の構成部分。',
  '因子': '表示済みの積に現れる各要素を参照し、新しい演算名ではない。',
  '実線': '図の線種を指定し、科学的対象の名前を代替しない。',
  '寄与': '表示された複素数の各項を指す説明語で、新しい励起種の名前ではない。',
  '尺度': '軸や条件を比較するスケールを述べる普通の説明語。',
  '左': '図の列、実線、物理的端を指す位置修飾。',
  '広': '軌道の広がり、または整数条件の広さを述べる形容・動詞語幹。',
  '式': '表示済みの数式を指す普通の参照語。',
  '戻': '和の原点への到達、角度補正または周期移動を述べる動詞語幹。',
  '描': '図に描くという表現操作の動詞語幹。',
  '条件': '直前の整数条件または不等式を参照する説明語。',
  '正': '座標軸の正の向きを指定する符号修飾。',
  '残': '操作後の状態、成分または重みの残存を述べる動詞語幹。',
  '比': 'Lと有効長の商を参照する普通の数学的操作語。',
  '比較': '図中の条件、重み、値を比べる行為を述べる語。',
  '点': '複素平面または条件図のプロット位置を指す幾何的普通名詞。',
  '物理的': '境界、端、運動量、相への限定を示す形容修飾で、単独の概念名ではない。',
  '矢印': '方向や寄与を表す図の記号で、独立の演算子名ではない。',
  '破線': '図の線種を指定する語。',
  '示': '示すという表示・説明動詞の語幹。',
  '端': '試料または離れた端の空間位置を指し、独立したモード名ではない。',
  '結': '入力出力、段の端点、またはシュミットの組を図上で結ぶ動詞語幹。',
  '表': '表すという動詞の語幹で、表という科学的分類の名前ではない。',
  '複数': '状態または準位の個数が一つではないことを示す数量語。',
  '負': '数または座標軸の符号修飾。',
  '赤紫': '図の色指定で、エニオン種や切断の正式名ではない。',
  '足': '複素数または角度を足すという算術動詞の語幹。',
  '軸': '図に表示された座標軸の幾何的参照語。',
  '重': '積み重ねる、重み、重み付けの部分文字列。全語の対象を別途補足概念として確認する。',
  '長': '長さという量の一部、または棒の長さの普通の説明。',
  '青緑': '図の色指定で、Aの自由度の新しい専門名ではない。'
};

const elementaryEvidence = {
  locator: 'reviews/reader-depth/japanese/coverage.json#complex-phase; reviews/gate-repair/japanese-late-density/coverage.json',
  usage: '既存の日本語記録は複素数の位相、基底、密度行列、トレースを既出の数学・量子力学概念として扱う。今回の各参照では同一の初等的または既出の対象を維持する。',
  limitation: '新しい専門名選好の独立な文献調査ではない。'
};
function existing(surface, referent, reason) {
  return {role: 'disciplinary_name', impact: 'incidental', referent, decision: 'KEEP', reason,
    evidence: {...elementaryEvidence, usage: reason}, scope: '既出の名称の局所再出現。全体の名称選好を再認証しない。'};
}
function unresolved(surface, referent, reason, alternatives, high = true) {
  return {role: 'explanatory_gloss', impact: high ? 'high' : 'incidental', referent,
    decision: 'UNVERIFIED', reason,
    comparison: {current: surface, english_or_not_applicable: referent, alternatives_or_not_applicable: alternatives,
      audience_reason: '同じ対象を扱う日本語の研究分野での使用比較を得ていない。推測による置換は行わない。'},
    uncertainty_reason: '現在の資料は対象の意味を示すが、日本語での優先表現を確定する使用比較を供給しない。',
    missing_evidence: '同じ対象を扱う独立した日本語の分野資料二件、または明示的なプロジェクト採用規約。',
    blocks_whole_range_pass: high};
}
const names = {
  'エニオン': {...existing('エニオン', 'anyon excitation', '既存のanyon名称を同じ物理的対象に使用する。'),
    evidence: {locator: 'reviews/wording/term-evidence.json#エニオン', usage: 'Hashisaka and Kato use エニオン for two-dimensional quasiparticles and fusion.'}},
  'セミオン': {...existing('セミオン', 'semion sector of the existing example', '既存のセミオン例の同じセクターを参照する。'),
    decision: 'UNVERIFIED', uncertainty_reason: '本レーンは既存のセミオン名称の分野別日本語選好を再調査していない。',
    deferred_reason: 'セクター、数値例、既存名称の対応が保たれ、新しい対象を命名せず、語の変種も導入しない。', blocks_whole_range_pass: false},
  'エンタングルメント切断': unresolved('エンタングルメント切断', 'entanglement cut between A and B', 'A/Bの切断を明示する説明語。意味は固定されるが専門名としての日本語選好はこのレーンでは未確認。', 'エンタングルメント境界; entanglement cut'),
  '位相': existing('位相', 'complex multiplicative phase, not phase of matter', '複素数の向きまたは乗法因子の位相を参照する既出の名称。相という物質の分類と区別される。'),
  '単位円': existing('単位円', 'unit circle in the complex plane', '半径1の円という既出の初等数学対象を図で参照する。'),
  '実軸': existing('実軸', 'real axis of complex coordinates', '表示済みの複素座標の実数方向を指す。'),
  '整数': existing('整数', 'integers n from 1 to 12', '明示された範囲の整数nを指す既知の数の分類。'),
  '添字': existing('添字', 'index of Schmidt states or orbitals', '状態または軌道のラベルに使う添字であり、意味の異なる新しい専門名を導入しない。'),
  '相': existing('相', 'phase of matter, including stacked phases', '積み重ねる相またはAbelian/non-Abelianな相を指す。複素数の位相ではない。'),
  '真空': {...existing('真空', 'vacuum sector or vacuum contribution', '既出の真空セクターまたは左右の真空の寄与を参照する。'),
    decision: 'UNVERIFIED', uncertainty_reason: '真空セクターの日本語名称選好を本レーンでは再調査していない。',
    deferred_reason: '既存セクター名の再出現であり、修正後は左/右が寄与の場所の修飾と分かる。', blocks_whole_range_pass: false},
  '確率': existing('確率', 'probability weights of the illustrated states', '例示の状態の重みとして確率を参照する初等的な名称。'),
  '和': existing('和', 'sum of the displayed complex contributions or probabilities', '複素数の寄与または例示の確率を加えた量を指す既知の算術語。'),
  '積': existing('積', 'product of complex numbers or density-matrix factors', '掛け合わせた量という既知の数学的操作の名称。'),
  '虚部': existing('虚部', 'imaginary component of complex argument', '表示された複素数の虚部を参照する。'),
  '角度': existing('角度', 'signed angle of complex vectors', '表示された複素数の向きを角度として参照する。'),
  '軌道': {...existing('軌道', 'Landau orbital, not a particle trajectory', '本文で導入されたLandau軌道を参照し、粒子の軌跡ではない。'),
    decision: 'UNVERIFIED', uncertainty_reason: 'Landau軌道の既存名称選好はこの限定レーンで再調査していない。',
    deferred_reason: '同じLandau軌道の幅、添字、重みを描写し、対象の同一性や名称を変更しない。', blocks_whole_range_pass: false},
  '集合': existing('集合', 'set of integers satisfying the specified predicate', '整数条件を満たす値の集合で、対比する条件は同じ文章に示される。'),
  '固定角': {role: 'ordinary_syntax', impact: 'incidental', reason: 'nを固定して角度を変えないという既出の条件を短く参照する修飾。別の新しい物理量や操作の名前ではない。'}
};

const dispositions = inventory.repeated_candidates.map(item => {
  if (item.surface === '原点') return {candidate_id: item.id, surface: item.surface, groups: [
    {...existing('原点', 'origin of the complex plane', '複素平面で座標がゼロの点を指す。'), occurrences: item.occurrences.filter(o => o.line !== 27)},
    {...unresolved('原点', 'origin of the MPS conserved-label calibration', 'ここでは複素平面の点ではなく、運動量・電荷ラベルの原点を指す。校正語彙の日本語用例不足を保持する。', 'ラベルの原点; calibration of label origins'), occurrences: item.occurrences.filter(o => o.line === 27)}
  ]};
  if (item.surface === '切断') return {candidate_id: item.id, surface: item.surface, groups: [
    {role: 'ordinary_syntax', impact: 'incidental', reason: '図の中央のA/B分割または既出のエンタングルメント切断を位置として参照する。', occurrences: item.occurrences.filter(o => [15,24].includes(o.line))},
    {...unresolved('切断', 'MPS bond at the right-half division', 'MPSの右半分の操作が表現されるボンドの位置。補助ボンド上の逆変換の用語範囲に含まれる。', 'ボンドの切断; MPS cut'), occurrences: item.occurrences.filter(o => [26,27].includes(o.line))},
    {role: 'ordinary_syntax', impact: 'incidental', reason: '軌道添字の分割と実空間の重みの分割を対比する通常の操作説明。', occurrences: item.occurrences.filter(o => o.line === 29)}
  ]};
  if (item.surface === '境界') return {candidate_id: item.id, surface: item.surface, groups: [
    {role: 'ordinary_syntax', impact: 'incidental', reason: '破線が試料の物理的な端ではないことを示す幾何的な境界。', occurrences: item.occurrences.filter(o => o.line === 14)},
    {...existing('境界', 'boundary of a physical phase in the gapped-boundary criterion', 'Abelianな物理的相の境界についての既存判定問題を指す。'), occurrences: item.occurrences.filter(o => o.line === 32)},
    {role: 'ordinary_syntax', impact: 'incidental', reason: '近似の保証線と解釈してはいけない基準線を境界と呼ぶ否定文。物理的な境界状態の名称ではない。', occurrences: item.occurrences.filter(o => o.line === 35)}
  ]};
  const judgment = ordinary[item.surface] ? {role: 'ordinary_syntax', impact: 'incidental', reason: ordinary[item.surface]} : names[item.surface];
  if (!judgment) throw new Error(`Missing authored decision: ${item.surface}`);
  return {candidate_id: item.id, surface: item.surface, occurrences: item.occurrences, ...judgment};
});

inventory.structural_candidates.forEach((item, i) => dispositions.push({
  candidate_id: `h${i + 1}`, occurrences: [{line: item.line, column: item.column ?? 1}],
  role: 'ordinary_syntax', impact: 'high',
  reason: `抽出用ID ${item.text} は審査資料の区切りで、読者に表示される見出しではない。`,
  no_scientific_handle_reason: 'この行はモジュールIDを機械的に付けたメタデータであり、原稿の科学的対象を命名しない。',
  heading_key_phrase: item.text, english_or_not_applicable: 'Not applicable: extraction identifier',
  alternatives_or_not_applicable: 'Not applicable: not reader-visible wording'
}));

const supplemental = [];
function supplement(surface, judgment) {
  const occurrences = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('#')) continue;
    let at = -1;
    while ((at = lines[i].indexOf(surface, at + 1)) !== -1) {
      if (surface === 'Abelian' && lines[i].slice(Math.max(0, at - 4), at) === 'non-') continue;
      occurrences.push({line: i + 1, column: at + 1});
    }
  }
  if (!occurrences.length) throw new Error(`Absent supplemental: ${surface}`);
  supplemental.push({id: `caption-term-${supplemental.length + 1}`, surface, occurrences, ...judgment});
}
for (const [surface, referent] of [
  ['単位ベクトル','unit vector'], ['規格化','normalization to unit modulus'], ['複素数','complex number'],
  ['引数','argument of the character as a function'], ['指標','CFT character'], ['写像','displayed modular map'],
  ['実部','real component'], ['逆モジュラー写像','inverse of the specified modular transformation'],
  ['部分回転','the defined partial rotation of A'], ['周方向','circumferential direction of the cylinder'],
  ['周座標','circumferential coordinate'], ['シュミット分解','Schmidt decomposition'], ['シュミット状態','Schmidt basis state'],
  ['内積','inner product of the B states'], ['対角成分','diagonal matrix entries'], ['非対角成分','off-diagonal matrix entries'],
  ['トレース','trace over B'], ['正規直交性','orthonormality of the B basis'], ['密度行列','density matrix'],
  ['複素平面','complex plane'], ['虚軸','imaginary axis'], ['CFT','conformal field theory'],
  ['準位間隔','spacing between the shown levels'], ['逆温度','inverse temperature'], ['基底状態','ground state of the left physical-edge Hamiltonian'],
  ['有効逆温度','effective inverse temperature already defined in the body'], ['低エネルギー近似','low-energy approximation'],
  ['並進','translation acting on the right-hand tensors'], ['シュミット確率','Schmidt probability weights'],
  ['運動量','physical momentum of A'], ['Landau 軌道','Landau orbital'], ['実空間','real space as distinguished from orbital indices'],
  ['Abelian','Abelian topological phase'], ['non-Abelian','non-Abelian topological phase'],
  ['必要条件','necessary condition'], ['位相条件','the condition on higher-central-charge phases'],
  ['漸近領域','asymptotic regime'], ['対数軸','logarithmic axes'], ['有効エッジ長','the previously defined effective edge length'],
  ['テンソル','tensor forming the previously defined MPS']
]) {
  const row = existing(surface, referent, `${surface} は上記の既出対象を再参照し、このcaptionで新しい名称や別の意味を導入しない。`);
  if (['指標','シュミット分解'].includes(surface)) {
    const pair = surface === '指標' ? 'CFT character' : 'Schmidt decomposition';
    row.evidence = {locator: `reviews/wording/term-evidence.json#${surface}`, usage: `既存資料の独立した二つの使用記録が${pair}の同じ名称を支持する。`};
  }
  if (surface === 'シュミット状態') row.evidence = {
    locator: 'content/observable.md:47; https://cat.phys.s.u-tokyo.ac.jp/lecture/QM2_17/quantum_mechnics_II.pdf#section1.6',
    usage: '同じ基底ベクトルについて本文の既存名称シュミット状態を再使用。講義§1.6は両側の規格直交基底を用いてシュミット分解を記述する。',
    comparison: '基底状態(ground state)の誤った名称を避け、本文の採用済み照応を保つ。'
  };
  if (['CFT','Landau 軌道','Abelian','non-Abelian','有効エッジ長'].includes(surface)) {
    row.decision = 'UNVERIFIED'; row.uncertainty_reason = '既存の名称の日本語選好をこのcaption限定レーンでは再調査していない。';
    row.deferred_reason = '既存名称・記号・対象の対応を保ち、名称を変更せず別の概念を導入しないため、局所修正の判定へ影響しない。';
    row.blocks_whole_range_pass = false;
  }
  supplement(surface, row);
}
for (const [surface, referent, alternatives] of [
  ['補助ボンド上の逆変換','inverse virtual-bond transform','仮想ボンド上の逆変換; ボンド上に作用する逆変換'],
  ['ラベルの校正','calibration of conserved momentum/charge label origins','ラベルの対応付け; 原点を定める'],
  ['原点の校正','calibration of label origins','原点の較正; 原点を定める'],
  ['ボンド状態','states on the MPS auxiliary bond','仮想ボンド状態; auxiliary-bond states'],
  ['MPS','matrix product state','行列積状態; Matrix Product State']
]) supplement(surface, unresolved(surface, referent, `${surface} はMPS操作の同じ対象を参照するが、本レーンには同じ操作・対象の日本語使用比較がない。科学レーンの意味の支持と名称選好を分ける。`, alternatives));
for (const [surface, reason] of [
  ['重み','確率、準位または軌道の成分の重みを述べる説明語。独立の新しい保存量名ではない。'],
  ['12 と互いに素','整数と12の間の関係を完全に指定した通常の算術説明。新しい集合の固有名ではない。'],
  ['微小角','角度が小さい極限についての既出の条件修飾。新しい物理量の名称ではない。'],
  ['符号付き角度','角度の正負を保存して表示する説明語。別の専門的角度分類を導入しない。'],
  ['中心電荷の位相','中心電荷が寄与する位相因子を説明する関係句。新しい中心電荷の種類の名前ではない。'],
  ['観測位相','この図で合成された観測量の位相を指す説明句。独立した新しい観測量の正式名ではない。'],
  ['左側の真空の寄与','左側に対応する真空の寄与という展開した位置修飾。左真空という新しい種類を命名しない。'],
  ['右側の真空の寄与','右側に対応する真空の寄与という展開した位置修飾。右真空という新しい種類を命名しない。']
]) supplement(surface, {role: 'ordinary_syntax', impact: 'incidental', reason});

const coverage = {
  input_sha256: inventory.input_sha256, review_lines: inventory.review_lines,
  perspective: 'Japanese disciplinary-name identity and explanatory wording; caption-only record completion',
  manual_sweep: {completed: true, reviewed_lines: inventory.review_lines},
  exposure_limitation: 'Initial aggregate caption exposure is retained; this is not a first-encounter sequential gate.',
  naming_scope: 'Existing global names are carried forward locally; missing preference evidence is explicitly deferred or UNVERIFIED, not supplied by manuscript repetition.',
  dispositions, supplemental_concepts: supplemental,
  verdict: 'Mechanical candidate coverage complete subject to validator; no unconditional whole-range Japanese naming PASS.'
};
fs.writeFileSync(new URL('coverage.json', dir), JSON.stringify(coverage, null, 2) + '\n');
console.log(JSON.stringify({candidates: dispositions.length, supplemental: supplemental.length, sha256: inventory.input_sha256}));
