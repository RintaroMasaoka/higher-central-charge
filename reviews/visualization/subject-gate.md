# Independent Subject/Prerequisite Gate

Baseline: CFT characters known; first reading of the paper. Scope: exact placement paragraph, caption, alt, and attached PNG only. No full route or scientific accuracy certification. Each verdict was frozen before loading the next unit. Date: 2026-10-14.

## partial-rotation: PASS

Revision: PNG SHA256 `3de165b2db1271119df14faa07fe58e9ffc8f14fdb94a64b11b088693fdeb306`.
Demand: `T_A;2pi/n`, A/B, periodic y translation, physical boundary versus cut.
Witness: exact paragraph defines x/y/L, A/B, translation L/n; caption identifies periodic seam and both solid boundaries. PNG shows each shape advancing one row with wraparound while B is fixed.
Reconstructible operation: apply y -> y+L/4 mod L throughout A, leaving B unchanged. Next usable inference: this operation acts on the entire left subsystem, not just the cut. The required meaning and application are supplied locally.

## schmidt-trace: UNKNOWN (local contraction PASS)

Revision: PNG SHA256 `5789190ee36b96d457928bd472074d4f2ce1a9458dac2eeba3c91248b5166bbf`.
Demand: Schmidt-state expansion, lambda convention, partial trace.
Witness: placement says translation expectations are summed with probability lambda_alpha^2. Caption and PNG give same-index pairs, B orthonormality, and a normalized diagonal matrix.
Reconstructible operation: eliminate unequal-index terms through the displayed delta and retain the three probabilities on A's diagonal. Next usable inference: only diagonal Schmidt-state expectations contribute. Originating bipartite expansion and the role of lambda as its coefficient are unavailable in this exact packet; CFT-character familiarity does not imply them. Requested wider window: preceding single paragraph with its attached Schmidt/trace equations. No full-route pass.

## schmidt-complex-sum: PASS (local relation)

Revision: PNG SHA256 `4a228529c677bfaf535a4e7e8b9e4b7a65e86049fb1b62d29dbc3d03e1e69e2b`.
Demand: momentum-dependent complex direction, probability weights, cancellation, magnitude and phase.
Witness: paragraph assigns momentum to direction and probability to weight; earlier packet supplies lambda squared as probability. Figure supplies explicit exponential values and both sums.
Reconstructible operation: multiply each unit complex direction by its probability and add vectors. Next usable inference: opposing terms can make zero (no phase), while unequal nonparallel terms give a nonzero phase and magnitude below one. The subscript 1's sector meaning is not supplied, so PASS covers this illustrative sum, not sector interpretation.

## two-edge-density: PASS (meaning and application)

Revision: PNG SHA256 `dd616929a2ed503ce0000d2a0fcabd6ce38ee79918adb3aefd25a9204f8ad5e2`.
Demand: physical-edge and cut-edge Hamiltonians, distinct inverse-temperature roles, approximate product.
Witness: paragraph directly defines H_l/H_r and both beta roles. Caption supplies distant-edge low-energy approximation; figure displays normalized exponential factors and schematic relative weights.
Reconstructible operation: associate each edge with its own density factor and form the displayed tensor product. Next usable inference: large beta_l selects the lowest level, while beta_r represents multiple entanglement weights. Meaning/application suffice for this figure; no claim to derive the edge-CFT approximation from the restricted packet.

## semion-sum-phase: UNKNOWN (local normalization PASS)

Revision: PNG SHA256 `cd388c0aae8dc8b8eaf3062de7bc06054eaef5689fdc0015c8dd762dcb84c541`.
Demand: why the semion contribution changes with n; definition of zeta_n and c_-.
Witness: paragraph states c_-=1 produces zeta_1 and destructive interference at n=2; caption explicitly explains adding and normalizing the shown numbers. Figure gives 1+i, zero, 1-i.
Reconstructible operation: normalize each nonzero displayed sum to unit magnitude and leave zero undefined. Next usable inference: phases at n=1 and n=3 are opposite signed pi/4. The theta-power source of those three inputs and the c_- bridge are absent from this packet, so the subject derivation is unverified. Needed window: preceding paragraph with semion d/theta data and the zeta_n definition, each released separately.

## stacked-phase-product: PASS (displayed product)

Revision: PNG SHA256 `910596b801c95d065fa954e35b8082f3e1d753e7050dfcefa22413b69c2f4b1b`.
Demand: multiplication versus vector addition; modulus multiplication and angle addition.
Witness: caption states the sums multiply under stacking. PNG explicitly supplies both inputs and the product equations; earlier semion packet establishes the first input 1-i at n=3 and phase normalization.
Reconstructible operation: multiply sqrt(2) exp(-i pi/4) and 2 exp(-3i pi/4), then normalize. Next usable inference: product has phase -1. U(1)_2/U(1)_-4 names and the second sum's derivation are unavailable here; PASS is bounded to the changed multiplication figure and does not certify those imported data.

## modular-inverse-map: PASS (map application)

Revision: PNG SHA256 `368f05a8177480c6fbad0ff36aaa959744978afb34974f7459ee8ee6c31898b7`.
Demand: inverse modular map, complex input/output, increased imaginary part.
Witness: caption states input is the right numerator's character argument and inverse map evaluates a low-temperature character. PNG supplies z/(1+nz), both symbolic endpoints, numerical values, and common scale.
Reconstructible operation: substitute n=2 and xi_r/L=0.1, obtaining the plotted output. Next usable inference: the character is evaluated at a larger imaginary argument. Character familiarity supports this local application; derivation of the modular representation coefficient and its nonzero condition remains outside the packet.

## three-phase-correction: UNKNOWN (angle arithmetic PASS)

Revision: PNG SHA256 `2583e52dd869824db2e48a7a72dcb1b4c37c44bc13003f5faef959a0c2080ba8`.
Demand: identities of left/right vacuum and T^n factors; extraction of zeta from measured partial-rotation phase.
Witness: caption supplies signed factor angles, their sum, observed angle, and correction. Earlier packets establish the two edges, modular map name, and semion zeta_3 angle. PNG shows a common angle scale and continuous endpoints.
Reconstructible operation: add -pi/36, -pi/4, -pi/36, then the anyon angle; add the positive inverse correction to recover -pi/4. Next usable inference: correction cancels the central-charge phase. The exact placement is only 'を得る' plus source link; the relation binding T^n and both vacuum factors to the observable is unavailable. Needed window: immediately attached asymptotic observable equation and its paragraph. No claim that the displayed factorization itself is established.

## mps-bond-rotation: UNKNOWN

Revision: PNG SHA256 `b8ee6af2c08467430cbd7a3dd4d817116d5163794001c4c0c424fcdf5ccb7805`.
Demand: phi, K-hat_n, barred K/C, x0/x1, physical-to-virtual inverse action.
Witness: paragraph supplies vacuum/semion calibration conditions. Caption states right-site translation becomes inverse bond transformation and uses Schmidt probabilities; previous packets license weighted complex sums. Figure distinguishes source labels and the physical A-generator formula.
Reconstructible operation: weight displayed inverse bond phases by lambda squared and sum; apply physical K=pL/(2pi) in the separately displayed physical formula. Next usable inference: opposite exponent signs belong to distinct conventions, rather than one unexplained equality. Definitions of source phi, barred K/C, x0/x1 and mechanism transferring a site action onto the bond are absent from this exact packet. Need the immediately preceding symbol-definition paragraph(s), one at a time. No figure-to-full-route certification.

## orbital-realspace-cuts: PASS (cut distinction)

Revision: PNG SHA256 `0148eb2ed569aa551af273192bc98a89380e2e9e5b76e24f0fa50879e664701d`.
Demand: index partition versus partition of each orbital's spatial weight.
Witness: paragraph explicitly splits orbital A/B weights and rearranges tensors; caption distinguishes index cut and x=x_c cut. PNG labels each broad profile as one orbital, fixes the spatial cut, and labels x and schematic probability density.
Reconstructible operation: divide the single orbital's support across the fixed spatial boundary, rather than assigning its entire index to one side. Next usable inference: orbital and real-space Schmidt cuts differ for orbitals extending across x_c. This meaning/application is available without prior Landau-orbital spectral details; tensor rearrangement mechanism is not certified by this figure.

## boundary-integer-membership: PASS (set membership comparison)

Revision: PNG SHA256 `2bc9af8778ae7c728d75e52267baa1b8c38ab34cc5304d74ce30e5d62be5f8d2`.
Demand: two integer predicates and strict inclusion, not equivalence of boundary theorems.
Witness: paragraph works n=4 explicitly; PNG writes both predicates, labels fill/outline membership, enumerates sets, and states strict inclusion. Caption states distinct necessary/sufficient roles and the additional actual c_-=0 condition.
Reconstructible operation: test either gcd predicate for 1..12 and compare membership. Next usable inference: checking only coprime n leaves some Abelian-condition n untested. Definitions of N_FS and the underlying boundary theorem are outside this packet, but they are not needed to reconstruct the changed integer-comparison illustration.

## asymptotic-regimes: PASS (scaling comparison)

Revision: PNG SHA256 `a43a01a933335a9b618ebc84b7b844d39f8e114a8152da5e149d71b0197e3b46`.
Demand: fixed n versus fixed L/xi_r limits and distinct scale inequalities.
Witness: paragraph supplies transformed imaginary argument and loss of its largeness when n increases. Prior modular-map packet gives this expression explicitly. Caption and PNG give both inequalities, logarithmic axes, and reference-curve interpretation.
Reconstructible operation: move vertically at fixed n to increase L/(n^2 xi_r), or horizontally at fixed ratio to reduce it; compare ratio 100 at n=2 and 1000. Next usable inference: the limits use different asymptotic formulas, and doubling n quadruples the fixed-angle circumference scale. No microscopic derivation of momentum polarization is certified.

## Opened Support Windows

The original UNKNOWN verdicts above remain frozen. The following separately released paragraphs inspect only the requested prerequisite routes; any upgraded conclusion is bounded to those opened routes and the original PNG revision.

### Schmidt Support 1: PASS

Released paragraph: '規格化した状態のシュミット分解 ...' with attached Psi expansion, lambda>=0 and sum lambda squared=1. This defines the coefficient, paired states, and probability normalization demanded by the original illustration. Reconstructible object: a normalized bipartite pure state as same-index Schmidt pairs. Orthonormality/partial-trace step remains pending the next explicitly requested paragraph.

### Schmidt Support 2: PASS; Opened schmidt-trace Route PASS

Released paragraph: 'と書く。両側の状態はそれぞれ正規直交するため、B をトレースすると' with attached rho_A=sum lambda squared |alpha><alpha|. It supplies the exact orthonormality premise used by the PNG's delta contraction. The previously opened expansion makes the pair products available; tracing B leaves the depicted diagonal A weights. This resolves the original packet limitation for the opened route, without claiming the original closed packet was sufficient.

### Semion Support 1: PASS (sum definition)

Released paragraph: '正整数 n ごとに、各回転位相の n 乗を重み d_a^2 で加える' with attached zeta_n quotient. It supplies n's operation and the nonzero normalization rule. Reconstructible operation: raise each input phase to n, form the weighted sum, normalize. The meaning of d/theta as input anyon data is still pending the requested example paragraph.

### Semion Support 2: PASS (application only)

Released paragraph: 'n=1 の和は、内部のエニオンの統計と境界のカイラル中心電荷を結びつける' plus named Gauss-Milgram link and attached zeta_1=exp(2pi i c_-/8). It explains the imported relation's role and licenses substituting c_-=1. The changed figure requires application and phase comparison, not proof of this relation. The linked explanation was not opened, so this is not a certification of its adequacy or of a deeper conceptual derivation.

### Semion Support 3: PASS; Opened semion-sum-phase Route PASS

Released paragraph: 'U(1)_2 のエニオンは真空 1 とセミオン s の二種類で ... d_1=d_s=1、theta_s=i ... 和は 1+i^n'. This supplies the two types, weights, rotating phase, and explicit vacuum contribution. With Support 1, the three displayed sums and their normalized phases are reconstructible. Support 2 licenses the c_-=1 comparison at application depth. The mathematical sum relation is now supported; the full conceptual meaning of quantum dimension and anyon statistics is outside this changed illustration's limited gate.

### Three-Phase Support 1: PASS (total factorization)

Released paragraph: '掛け合わせると' with attached T_1 approximately A_n exp[-2pi i(n+2/n)c_-/24] sum d squared theta^n. It binds the observable to the central-charge factor and anyon sum. Reconstructible operation: substitute n=3,c_-=1 to obtain -11pi/36 plus the anyon angle. A_n positivity remains pending; origin of individual left/right/T^n terms remains outside this paragraph.

### Three-Phase Support 2: PASS (phase independence)

Released paragraph: 'この理想化したカイラル CFT の計算では' with attached explicit A_n>0. The inequality supplies the needed fact: A_n introduces no extra angle. The exponent's microscopic derivation and D normalization are not needed to use that stated positivity in this phase figure.

### Three-Phase Support 3: PASS (total correction); Factor Origins UNKNOWN

Released paragraph: 'である。主要項が非ゼロなら、規格化した観測値に既知の中心電荷の位相を戻すことで' with attached corrected T_1/|T_1| approximately zeta_n. With Supports 1/2 and opened semion inputs, the observed -5pi/9 and correction +11pi/36 are reconstructible. This resolves the observable-to-corrected-phase relation. The distribution among individually named left vacuum/T^n/right vacuum factors remains UNKNOWN unless their earlier single-paragraph formulas are supplied; the total formula alone does not establish those labels.

### MPS Support 1: PASS (convention meanings); Original Extra Operator UNKNOWN

Released paragraph: '無次元運動量 K_alpha=p_alpha L/(2pi) ...' defines the physical A phase, barred K as conserved momentum accumulated left of the cut, and right-half evaluation as insertion of the inverse bond phase. This supplies the meaning and application of the two convention rows. It offers a precise source link for the transfer mechanism, which is not inspected here. Original K-hat_n remains unavailable; calibration variables are pending the next requested paragraph. This does not review the revised PNG.

### MPS Calibration Equation Alone: UNKNOWN

Selector first found the attached calibration equation alone: barred K -> barred K+x1 barred C+x0, with integer x0/x1. It supplies allowed shifts but not barred C meaning or the calibration's purpose. Its immediate author-authorized preceding paragraph is required next; no verdict upgrade from an isolated equation.

### MPS Support 2: PASS (calibration meaning)

Released paragraph: 'infinite MPS (iMPS) のボンドのラベルには、運動量の原点と電荷の原点に由来する自由度がある' with the attached calibration equation. It defines barred C as charge label and identifies origin choices as the cause of integer shifts. Combined with the original placement paragraph's vacuum/semion calibration targets, the figure's calibration operation is reconstructible. Original K-hat_n and phi remain unavailable from the frozen original figure packet; the revised MPS image was not opened or accepted in this run.

### Three-Phase Factor Origins: Local Diagnosis Only

Locator searches authorized by the coordinator returned matching paragraph lines for more than one requested origin before their individual packets were extracted. This does not meet the strict first-encounter release discipline for those origin paragraphs. Subsequent records below are transparent local diagnosis and cannot upgrade the independent UNKNOWN for individual factor origins.

### Left-Vacuum Support: Local PASS

Extracted one paragraph beginning 'L << xi_l なら指標の虚部は大きい' with attached character ratio approximately exp[-2pi i c_-/(24n)]. It states vacuum suppression and vacuum energy -c_-/24; CFT-character baseline supports substituting n=3,c_-=1 to get -pi/36. This directly supplies the first row's named origin.

### T-Matrix Support: Local PASS

Extracted one paragraph beginning '種類 a の最低共形重みを h_a とする' with attached T_aa=exp[2pi i(h_a-c_-/24)]=theta_a exp[-2pi i c_-/24]. It defines T's diagonal entry and relates its phase to the anyon input. Raising the central-charge factor to n=3 gives -pi/4, independently of the theta^n contribution. This directly supplies the second row's named origin at application depth.

### Right-Vacuum Support: Local PASS

Extracted one paragraph beginning '変換先の真空指標には、虚部に由来する実数因子と、実部 1/n に由来する位相がある' with attached right numerator proportional to exp[-2pi i(n+1/n)c_-/24] times the anyon sum. With the known transformed real part 1/n and the previously supplied vacuum energy, its extra 1/n term contributes -pi/36. This directly supplies the third row's named origin; the n term belongs to the already identified T^n contribution.

## Coverage And Outstanding Acceptance

All 12 original units were extracted one at a time and frozen before the next. Eight have local changed-relation PASS immediately; Schmidt and semion UNKNOWNs resolve to PASS on the separately opened prerequisite routes. Three-phase total correction resolves to PASS, while independent named-origin coverage remains UNKNOWN because locator output exposed multiple origin paragraphs. Original MPS remains UNKNOWN for unintroduced K-hat_n/phi; its revised image requires a fresh reviewer and was not inspected in this run. No whole module or content file was displayed, no author brief or prior gate verdict was consulted, and no scientific or explanation-act verdict is claimed.
