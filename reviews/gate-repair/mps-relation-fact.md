# MPS Operator-Label Relation: Source Validity

Perspective: scientific/source validity of the operator-label relation in `content/applications.md:68` only. Context examined: `content/applications.md:59-79`, `content/observable.md:41-54`, and primary source `literature/papers/2303.04822/source/supp_mat.tex:583-647`. No reader, rhetorical, naming, visual, or communicative-position verdict is given.

## Revision Binding

- `content/applications.md` SHA-256: `b1641ef94fed178f0dbb699df873298a61c707e7f524ad84020ac47dac3215e5`
- `literature/papers/2303.04822/source/supp_mat.tex` SHA-256: `c3aec46214052c2aae6c431d8d4371f96c14aebb8c1a9eb04aabe6ab3a1b7658`

## Verdict

**Conditionally supported.** The left-accumulated label and the inverse virtual-bond factor are directly supported. Their use to obtain an absolute physical partial-rotation phase is conditional on the phase/calibration convention; conservation alone does not determine that phase.

1. **Supported: label object.** Source line 632 explicitly identifies the Schmidt-state conserved charge and momentum labels as accumulations to the left of the cut. Thus the manuscript's left-accumulated conserved momentum description is supported; the bar label is not being identified with a right-half physical momentum eigenvalue.
2. **Supported: operation/sign correspondence.** Source line 591 defines the physical on-site rotation as `exp(+i theta K_n)`. Its right-half product is displayed in line 604. Lines 602-604 and 619 represent that operation's expectation through the virtual factor `exp(-i theta bar K_alpha)`. Thus the minus sign in manuscript line 68 is supported for rotation of the right half with the source's positive on-site rotation convention. The manuscript's preceding positive factor refers to the A-side physical momentum convention (`observable.md:47-53`); these two factors involve different labels/operation sides and cannot be equated merely by dropping the bar.
3. **Conditional: phase normalization.** Lines 619, 621, and 625 explicitly retain an overall `exp(i phi)` ambiguity in the transfer-matrix argument. Source `theta` is the rotation angle, whereas source `phi` is this separate overall phase. Manuscript `varphi` denotes the rotation angle and is therefore mapped to source `theta`, not source `phi`. The inverse factor is established, but the transfer-matrix proof alone does not establish its absolute phase as the physical observable.
4. **Supported: calibration is required.** Lines 630-639 identify the two integer label freedoms and give `bar K_alpha -> bar K_alpha + x_1 bar C_alpha + x_0`; lines 639-641 specify spectrum matching and the vacuum/semion conventions. Inserting this shift into the inverse factor gives `exp(-i theta x_0) exp(-i theta x_1 bar C_alpha)` multiplying the original factor. The first is an overall phase; the second can change relative phases between charge sectors. Therefore the manuscript's reference to the following origin calibration has direct scientific relevance to extraction of the partial-rotation phase.

## Conditions and Consequence

The correspondence uses implemented momentum conservation (lines 583-591) and the iMPS transfer-matrix limit assumed in lines 613-617, where the selected dominant eigenvector survives and subleading contributions vanish. Unit-cell size one is the proof's stated simplification (line 613), not an independently demonstrated restriction on every MPS implementation.

The bounded source window supports manuscript line 68 as a description of the virtual insertion used in the supplemental evaluation together with calibration. It does not support treating the uncalibrated inverse factor as a uniquely fixed absolute physical phase. Nor does this window establish that spectrum matching alone resolves every boundary/overall phase contribution: line 647 begins the separate real-space/orbital-cut discussion, whose later details were outside the permitted packet. That stronger conclusion remains unverified here.

The naive ket-action equation at source line 597 contains both a physical sign inconsistent with the later displayed right-half operator and a squared Schmidt coefficient in a ket expansion. This verdict does not rely on that equation; it relies on the explicit expectation-value theorem (602-604), transfer-matrix statement (619-625), and label definition (632).
