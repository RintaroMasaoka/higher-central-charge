# Revised MPS Figure: Subject/Prerequisite Gate

Verdict: PASS for the single revised figure and attached caption, within the supplied reader baseline. This is a fresh subject/prerequisite reviewer, with no author history, prior verdicts, or author rationale. It does not certify source accuracy, explanation acts, typography, or the whole chapter.

Revision evidence (SHA-256):

- `public/diagrams/mps-bond-rotation.png`: `4bf5914417326210b9e4b17544c8b50dbcb1f1d1d61c36d6909f798eacbfab01`
- `content/applications.md`: `e22e18621a2c36d0021da5efa2dcb0c2245151bfd730aa50d47b6dc7ae3f1c1c`

Baseline supplied: Schmidt probabilities lambda_alpha^2; physical A formula T_a = sum lambda_alpha^2 exp(i p_alpha L/n); cylinder coordinates; phi=2pi/n. Reviewed instructions: `.codex/skills/study-note/references/reader-review.md`, subject lane. No whole manuscript, later body, references, or unrelated image was opened.

## Frozen Prefix Units

1. `applications.md:68`, one paragraph beginning "無次元運動量". PASS. `K_alpha=p_alpha L/(2pi)` and positive physical A phase `exp(2pi i K_alpha/n)` follow the baseline. The unfamiliar `bar K_alpha` is identified as the accumulated conserved momentum label to the left of the cut. The source right-half rotation is explicitly evaluated by inverse auxiliary-bond insertion `exp(-i phi bar K_alpha)`. The operation and its side/sign are available. Calibration is announced, so physical momentum matching is not yet assumed. Meaning and application suffice for the figure; no mechanism or proof is certified.

2. `applications.md:70-77`, calibration paragraph, attached equation, and equation-continuation sentence. PASS. `bar C_alpha` is named as the charge label; integer `x0,x1` specify `bar K_alpha -> bar K_alpha+x1 bar C_alpha+x0`. The prior inverse insertion lets the reader derive the uniform factor `exp(-i phi x0)` under an x0 shift, supporting "x0 を変えるだけでも全体の部分回転の位相が変わる". Thus origin choice matters to phase extraction. Exposure note: the coordinator's line-range packet included line77; it was read and frozen in this unit before the coordinator subsequently released line77 separately. That subsequent release was not counted as a new first encounter. The continuation beginning "という曖昧さ" completes the attached equation rather than importing a separate later argument.

3. `applications.md:79`, one calibration paragraph. PASS for meaning/application needed by this figure. The text supplies concrete matching conditions: vacuum lowest state has charge and momentum zero; opposite-charge states share the momentum label; semion lowest pair has charges +/-1/2 and momentum zero. "さらに物理的な境界からの位相との対応を含めて" discloses additional phase matching before CFT comparison. Consequently the source bond label is not already identified with the physical generator. Mechanism/proof of the imported matching and source truth remain outside this local gate.

All unit judgments were communicated and frozen before the next unseen paragraph or figure was released.

## Frozen Figure Unit

Input: PNG named above, accessible alt at line81, and attached caption at line83 only. PASS.

- Demand: identify where the operation acts. Witness: the prefix names right-half rotation; the PNG brackets the entire depicted B half as "Right-half translation", with A separately labeled. The cut is identified as "virtual bond". The caption states "全ての右側テンソルに作用する並進". Available inference: the physical action covers the right half, and its evaluation is represented at the cut.
- Demand: reconstruct bond-state contributions. Witness: baseline Schmidt probabilities and prefix inverse insertion. The alpha and beta rows separately show lambda_alpha^2 / lambda_beta^2 and the corresponding negative-sign phases in the shared bond block. Ellipses continue the rows; the displayed sum uses the same weight and phase. Available operation: multiply each probability by its phase, then sum over bond states.
- Demand: distinguish calibration freedom from physical A convention. Witness: frozen units2-3. The PNG separately labels "Calibrate the source labels" with the established label transformation and "Physical A-generator convention" with `K_alpha=p_alpha L/(2pi)` and the positive-phase sum. The caption says these are shown separately. Available inference: the two conventions have distinct label origins and signs; source calibration and physical-boundary phase matching are needed before comparison. The figure provides no equality arrow identifying bar K with K.
- New symbols: beta is an additional bond-state index, licensed by the repeated alpha/beta rows and sum/ellipsis. All other operative symbols are in the supplied baseline or frozen prefix. No unavailable premise is needed to use the depicted evaluation.

Residual scope: this acceptance relies on the explicitly supplied baseline and applies only to the changed figure. The external reference entry was not opened, because no deferred mechanism or proof is required to reconstruct this local figure's meaning/application. No source-scientific verdict is claimed.
