# Japanese Caption Wording Review

Perspective: Japanese disciplinary-name identity and natural explanatory wording only. Scientific truth, numerical values, explanatory acts, reader order, and visual encoding are outside this decision lane.

Scope: all 12 new captions and 12 alt texts in five `content/` chapters, matched to the exported `caption`, `alt`, and `placement` fields of the three figure modules. The reviewer read no author briefs. Nearby context was restricted to each module's exact placement paragraph and, for the Schmidt naming question, `content/observable.md` lines 37–51. Other body text was not reviewed.

Exposure limitation: the initial location search accidentally displayed all captions together. Subsequent packets were read one at a time and their decisions frozen before the next packet, but this is not a first-encounter sequential review. Do not use this record to certify that stronger property.

## Revision Binding

Initial module SHA256 values:

- `core.mjs`: `4b63c8bb453e8d82d569b517aa53d9404d7915576b30ec4170b883107a05afd8`
- `observable.mjs`: `c3062d1c294ed2e345b18b05b2a806dee71e29b1b6e40e17ee36d10cd3c431c1`
- `applications.mjs`: `93fa7a3e1c1c9a5e6ddd48c15d78f61db415cd891c9c2786b78dcbacf2d7ef1c`

Caption-only projection: `captions-visible.md`. Extraction: Node imports the three figure modules and emits only figure ID, caption, and alt, with one field per line. `captions-inventory.json` was generated with the study-note Japanese inventory script for lines 1–36. Its initial projection SHA256 is `1f30159946a7dd32f98450e4cd219ac03121ebb738807ad193ac0ea7ab4d5fd3`. It identifies 76 repeated surfaces and 12 structural candidates; the structural headings are figure IDs added for review and are not reader-visible scientific headings.

The surface inventory is retained as evidence. `coverage.json` now supplies individual decisions and exact occurrence coordinates for all 88 candidates, including 76 repeated surfaces and 12 extraction identifiers, plus 53 manually added concept/rendering pairs. `原点`, `切断`, and `境界` have disjoint occurrence groups for their differing uses. The complete assigned caption/alt range was manually read for omitted concepts. The mechanical validator passes; that does not establish an unconditional naming verdict.

## Frozen Packet Decisions

| Packet | Content caption / alt lines | Japanese wording decision |
| --- | --- | --- |
| `partial-rotation` | observable 7 / 5 | KEEP ordinary operation prose. `部分回転` names the already defined operation; `周方向`, `周座標`, `物理的な境界`, `エンタングルメント切断` retain their supplied geometric/reduced-state referents. No new compressed term introduced. |
| `schmidt-trace` | observable 51 / 49 | CHANGE `A と B の基底状態` in both fields: this normally denotes ground states, whereas supplied context identifies orthonormal Schmidt vectors. `シュミット状態`, already used at observable 47, preserves the local identity. See naming evidence below. |
| `schmidt-complex-sum` | observable 66 / 64 | KEEP. `単位円`, `複素数`, `実軸`, `虚軸`, `複素平面`, `原点`, `確率` are existing elementary mathematical names; direction and magnitude modifiers are ordinary explanatory prose. `二状態` is a count, not a replacement disciplinary name. |
| `two-edge-density` | observable 94 / 92 | KEEP wording. `基底状態` here refers to the ground state selected by the large inverse temperature, unlike the Schmidt packet. `密度行列`, `CFT`, `逆温度`, `準位`, and `低エネルギー近似` retain supplied identities. `有効逆温度` describes the already defined effective parameter. No scientific statement certified. |
| `semion-sum-phase` | overview 136 / 134 | KEEP prose. `真空`, `セミオン`, `位相`, `規格化`, `単位ベクトル` retain established body referents; `三つの和`, `先端から足し`, `両列・全段` describe the figure rather than introduce technical categories. Existing semion naming preference is not independently reopened. |
| `stacked-phase-product` | overview 154 / 152 | KEEP. `相を積み重ねる` is an operation description, not a proposed replacement for stacking terminology; `複素数の積`, signed angles, lengths, and axes use ordinary mathematical prose. `エニオン` retains the existing project name. |
| `modular-inverse-map` | derivation 90 / 88 | KEEP supplied CFT naming: `指標` means character; `逆モジュラー写像` describes the inverse of the specified modular action rather than a new named transform. `実部`, `虚部`, `引数`, `入力`, `出力`, `線形軸`, and `点線投影` retain local mathematical/diagram referents. No mandatory prose repair. |
| `three-phase-correction` | derivation 170 / 168 | CHANGE alt `左真空` / `右真空` to `左側の真空の寄与` / `右側の真空の寄与`: the original compounds compress figure labels and obscure the intended ordinary spatial modifier. Caption `中心電荷の位相`, `エニオンの位相`, `観測位相`, and `既知の補正` describe supplied factors, not newly named charges. |
| `mps-bond-rotation` | applications 83 / 81 | CHANGE caption/alt `物理的な A の運動量` to `A の物理的な運動量` so the modifier attaches to momentum. `MPS`, `テンソル`, `シュミット確率`, and `ボンド状態` reuse supplied referents. Preferred Japanese wording for the inverse auxiliary-bond transform and calibration remains UNVERIFIED, separately from scientific verification. |
| `orbital-realspace-cuts` | applications 93 / 91 | KEEP ordinary distinction between splitting orbital indices and splitting spatial weights. `Landau 軌道`, `MPS`, `ボンド`, `実空間`, and `添字集合` retain supplied referents. No invented translation or compressed scientific handle. |
| `boundary-integer-membership` | boundary 33 / 31 | CHANGE `互いに素な整数の集合` / `互いに素な集合` to identify the comparison target, `12 と互いに素な整数の集合`. Without the target, the shortened alt can suggest pairwise coprimality among the listed integers. `Abelian` / `non-Abelian`, `必要条件`, `位相条件`, and `真に含まれる` reuse established distinctions. No mathematical membership verdict. |
| `asymptotic-regimes` | applications 124 / 122 | KEEP. `固定角`, `微小角`, `漸近領域`, `対数軸`, `有効エッジ長`, `基準線`, and `尺度` label previously supplied conditions and plotting quantities. No new scientific handle or translation identity loss found; validity of asymptotic conditions is outside this lane. |

All direction words, colors, line styles, row/column references, counts, demonstratives, arithmetic verbs, and modal/negation constructions in these packets were read as ordinary prose describing the figure. They do not silently replace a disciplinary name. This sentence is a prose-scope statement, not a catch-all inventory disposition.

## Naming Evidence And Comparisons

`基底状態` in the Schmidt packet: current = `基底状態`; English referent = Schmidt basis vector/state, not ground state; alternatives = `基底ベクトル`, `シュミット状態`. The local project has adopted `シュミット状態` at observable 47 for the same vectors, so it is the least disruptive correction. [University of Tokyo quantum mechanics II, §1.6](https://cat.phys.s.u-tokyo.ac.jp/lecture/QM2_17/quantum_mechnics_II.pdf) describes Schmidt decomposition using orthonormal bases for A and B and identifies the decomposition's basis with the reduced density matrix's diagonalizing basis. This is a physics lecture in the quantum mechanics community. Independently, [University of Tsukuba condensed-matter lecture, energy gap](https://www.px.tsukuba.ac.jp/~onoda/cmp/node73.html) identifies `基底状態` with the lowest-energy state. Both usages were checked through their indexed source passages. This supplies positive identity evidence for CHANGE, not a claim that all Japanese sources prohibit the phrase basis state in other contexts.

Established Japanese names `エニオン`, `シュミット分解`, `モジュラー変換`, and CFT `指標` were compared with their English names and legitimate alternatives using the project's `reviews/wording/term-evidence.json`: エニオン / anyon / 任意子・アニオン; シュミット分解 / Schmidt decomposition / Schmidt分解・シュミット展開; モジュラー変換 / modular transformation / モジュラ変換; 指標 / character / キャラクター. The exact supplied referents have not changed, and these captions do not introduce different variants. This is reuse of existing naming evidence, not a new independent certification of the manuscript's entire terminology.

`補助ボンド上の逆変換`: explanatory gloss with interpretation-sensitive referent, the induced inverse transformation on a virtual/auxiliary MPS bond. English comparison = inverse virtual-bond transform (descriptive, no separate canonical operation name established); Japanese alternatives = `仮想ボンド上の逆変換`, `ボンド上に作用する逆変換`. No same-operation Japanese disciplinary usage comparison or explicit adopted project naming authority has been supplied. Preferred rendering is UNVERIFIED. Missing evidence: Japanese symmetry-aware MPS/FQH running prose describing this operation. No supported CHANGE follows from the evidence gap.

`原点の校正` / `ラベルの校正`: explanatory gloss with interpretation-sensitive referent, matching/fixing the momentum and charge label origins. English comparison = calibration/matching of label origins; alternatives = `原点の較正`, `原点を定める`, `ラベルの対応付け`. No Japanese iMPS/FQH comparison establishing a preferred rendering is supplied. Preferred rendering is UNVERIFIED; missing evidence is same-operation Japanese community prose. A metrological spelling preference would not alone settle this wording. No supported mandatory replacement.

Remaining unchanged global naming decisions, including MPS, bond terminology, CFT, semion, Landau orbitals, Abelian/non-Abelian, and effective edge length, are outside this fresh caption lane's re-certification. Their identities were checked against supplied local uses; naming-evidence completeness was not independently reopened. The two MPS naming uncertainties can affect operation interpretation, so they prevent an unqualified whole-range Japanese naming PASS. They do not constitute an unsupported scientific rejection.

## Recheck Status

At the first recheck, `schmidt-trace` caption and alt had both changed to `シュミット状態`, matching the local usage and removing the ground-state collision. Projection SHA256 after that repair: `c9ce8f8938c7b206c7baf140fd7927edc2d15e1b3dccc186c4c81cbd39285058` (caption + newline + alt).

Final recheck: all four repairs are present in both module fields and published content. The full altered caption/alt sentences were reread: `左側の真空の寄与による` and its right-side counterpart now express contributions rather than compressed vacuum labels; `A の物理的な運動量` attaches the modifier correctly; both coprimality occurrences explicitly identify 12. No further supported wording repair remains in these packets. All unchanged packet decisions remain applicable. A Node equality check confirmed all 12 caption strings and all 12 alt strings exactly match the content source.

Final module SHA256 values:

- `core.mjs`: `a8fbaea80b9fb2f76b93286e05fd93b7982b573e0b77fe3642e6c1bb8c2fe84e`
- `observable.mjs`: `6626a2d398bddacbcbf65f5e851d6c449bbf770a831a99589b281b84bab27ad2`
- `applications.mjs`: `3c0e23eac0792b209560cca3c05f1aeabae32c58459670ee80b13524915fab05`

Final content SHA256 values:

- `overview.md`: `8225cd445307b562cd6bbf37d816ddf658d3326855359694e6ec76fe4886d0d9`
- `observable.md`: `c9bac7c8b020f232daa537857f8201a8f71c0b88e49e5c72cc725f13441be0ce`
- `derivation.md`: `91e99212dc1cd432255985c808f60d4852beb3cd56e18f9b936e61eea5c40b32`
- `applications.md`: `e22e18621a2c36d0021da5efa2dcb0c2245151bfd730aa50d47b6dc7ae3f1c1c`
- `boundary.md`: `eda0e21a05e505f3edb5dd443a3c99a3d99b5bc7b6eab4e1b5be490294948639`

Changed caption-plus-alt projection SHA256 values:

- `schmidt-trace`: `c9ce8f8938c7b206c7baf140fd7927edc2d15e1b3dccc186c4c81cbd39285058`
- `three-phase-correction`: `0f77cd03dac1d92608af89a11fecd9f2b40c6378bf6e076fe8063bab85f4d1e6`
- `mps-bond-rotation`: `76497bec9f590abb858f383b055201b9d402826180af4ba685681ebb2604310f`
- `boundary-integer-membership`: `8cb1d50c535906629e1642e3a91efd479cf274d6efb2e938be82b68211d65bcf`

The extracted 36-line projection and its inventory were regenerated after the coordinator restored spaces in `選んだ A の` and `校正と A の`. Those final strings were reread and introduce no new naming issue. Final projection SHA256 is `35645a13c06f1a95b292a664a89551d283b5e49a47a88dd32988823e62e77e84`. The MPS source-to-operation correspondence is separately supported by the scientific lane; that support does not supply Japanese community naming evidence, and this lane retains the preferred-rendering UNVERIFIED decisions.

Mechanical validation: `validate_japanese_coverage.py captions-inventory.json coverage.json` returns `ok: true`, `candidate_count: 88`, range `[1,36]`, and the final projection SHA256 above. The coverage-generation script stores individually authored surface decisions and copies only the inventory's exact coordinates. It does not infer a favorable semantic verdict from successful validation. The coverage marks uncertain MPS naming/glosses and entanglement-cut naming explicitly UNVERIFIED, and records unchanged global-name deferrals rather than inventing evidence.

Verdict: bounded wording review with four supported repairs; no unqualified whole-range naming or sequential-first-encounter acceptance. Unread manuscript and separate decision perspectives remain unverified here.
