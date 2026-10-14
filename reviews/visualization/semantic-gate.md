# Visual Semantic Gate

Perspective: mathematical and physical fidelity of depicted relations only. PNGs are inspected sequentially and each verdict is frozen before the next PNG. This is not a prose, reader-order, typography, or production gate. The first source read exposed all four observable module definitions and their brief fields; those briefs are excluded as evidence. Accordingly this review makes no first-encounter reader claim. Later module packets exclude brief fields.

## 1. partial-rotation

Frozen verdict: geometry supported; rendered relation labels require repair.

Evidence: content/observable.md opening defines positive y shift by L/n in A with B fixed. The module uses dest=(i+1)%4 with y increasing upward, so all A shapes move up by L/4 and the top diamond wraps to the bottom. B positions are identical. Dashed y endpoints are paired with equal orientation; physical left edge and interior cut are distinct. PNG inspection confirms this geometry. In the PNG the mapsto and sim symbols have mojibake, obscuring the defining map and periodic identification. Repair encoding/rendering and recheck those two relation labels.

## 2. schmidt-trace

Frozen verdict: geometry and values supported; rendered symbolic relations require repair.

Evidence: the attached observable paragraph derives diagonal rho_A from orthonormal B Schmidt states. The figure connects identical indices 1,2,3 only and presents diag(1/2,1/3,1/6), zero off-diagonal entries, with sum 1. This is an illustrative normalized example, as the caption specifies. PNG matrix geometry and numbers agree. Kets, lambda, rho, and the B inner-product delta equation are visibly corrupted by mojibake. Repair rendering so the contraction and basis identity are readable.

## 3. schmidt-complex-sum

Frozen verdict: required fix to angle arc; weighted vectors supported; symbolic encoding repair required.

Evidence: observable momentum sum is a convex sum of unit complex phases. Top arrows are +/-1/2 on a unit circle of radius 130; bottom vectors have coordinates (3/4,0),(0,1/4) and their sum (3/4,1/4). Equal axis scales and norm sqrt(10)/4 agree. Caption correctly identifies illustrative rather than measured inputs. However the bottom black arc spans a full right angle from the real to imaginary axis, while the resultant phase is atan(1/3), about 18.4 degrees. An unlabeled angle arc in this phase diagram depicts an incorrect angle for the sum. Remove the arc or terminate it at the resultant direction. Minus signs and modulus bars in the PNG are mojibake; restore readable signs and modulus relation.

## 4. two-edge-density

Frozen verdict: qualitative geometry supported; density-factor symbols require encoding repair.

Evidence: content/observable.md CFT approximation uses a tensor product of normalized exp(-beta_l H_l) and exp(-beta_r H_r), with large beta_l at the physical left edge. The diagram puts H_l on the physical endpoint and H_r at the internal A/B cut, with increasing-energy arrows and decreasing illustrative weights. Dominance at low energy is stronger for left than right. Caption identifies schematic weights and the low-energy separated-edge approximation, so bars are not numerical evidence. In the PNG minus/beta signs and tensor-product glyph are corrupted and must be restored. Primary source was not yet accessible at the acquisition record's relative path; this conclusion uses the attached content relation only.

## 5. semion-sum-phase

Frozen verdict: supported.

Evidence: semion data d_1=d_s=1, theta_1=1, theta_s=i imply raw sums 1+i,0,1-i for n=1,2,3. Each left plane uses head-to-tail addition; right nonzero arrows have radius 65 versus raw resultant radius 65 sqrt(2), with +/-45 degree directions. n=2 right plane shows the origin and undefined phase. Both columns and all rows use the same units. PNG labels render correctly after the UTF-8 repair. This is direct arithmetic, with no claim of measured numerical evidence.

## 6. stacked-phase-product

Frozen verdict: supported.

Evidence: overview gives 1-i and 2 exp(-3i pi/4), whose product is -2 sqrt(2). Geometry uses common unit radius 55: first vector length 55 sqrt(2), second 110, third 110 sqrt(2). Clockwise arcs span -pi/4,-3pi/4,-pi and agree with the displayed complex numbers. The negative-real-axis endpoint and normalized phase -1 agree. PNG confirms signs, orientations, and relative lengths.

## 7. modular-inverse-map

Frozen verdict: supported.

Evidence: direct substitution (-0.5+0.1i)/(1+2(-0.5+0.1i))=0.5+2.5i. Module coordinates use one scale 130 per unit: input x=215,y=487, output x=345,y=175 relative to origin (280,500). Real ticks +/-0.5 and imaginary ticks 1,2 agree. Caption explicitly says the dashed curve connects input/output; it does not assert a continuous modular orbit. PNG confirms endpoint signs and equal axis scale. The inverse rather than forward operation matches the attached derivation.

## 8. three-phase-correction

Frozen verdict: supported.

Evidence: for n=3,c_-=1, the two vacuum phases each contribute -pi/36, T^3 contributes -pi/4, so central contribution is -11pi/36. Adding semion zeta_3 angle -pi/4 gives -5pi/9; correction +11pi/36 returns -pi/4. Every arrow uses x=470+200 angle, connected vertically at its preceding endpoint, and the bottom common axis confirms this scale. PNG displays leftward negative changes and rightward positive correction correctly.

## 9. boundary-integer-membership

Frozen verdict: supported.

Evidence: direct evaluation for n=1..12 gives coprime set {1,5,7,11} and gcd(n,12/gcd(n,12))=1 set {1,3,4,5,7,8,9,11,12}. Each filled/open marker agrees with these sets and their strict containment. The caption keeps the non-Abelian necessary condition distinct from the Abelian criterion and adds actual c_-=0 for a physical boundary. PNG labels and marker support agree.

## 10. mps-bond-rotation

Frozen verdict: supported.

Evidence: source supp_mat.tex lines 602-605 explicitly maps the product over right sites of exp(+i theta K_n) to the Schmidt-weighted bond sum exp(-i theta Kbar_alpha). Diagram brackets all depicted right/B tensors, separates the bond, and preserves this inverse sign. Source lines 635-641 give Kbar -> Kbar+x1 Cbar+x0 calibration. Bottom physical-A convention is separated and matches content's K=pL/(2pi); it does not identify uncalibrated Kbar with K. PNG confirms operation scope, bond weighting, and signs. Earlier source path attempts failed because /source was omitted; the actual source is now located under Higher-central-charge/literature/papers/2303.04822/source.

## 11. orbital-realspace-cuts

Frozen verdict: supported as a schematic.

Evidence: top divides an ordered orbital index set at one bond; lower panel divides each of three spatially extended orbital density profiles at the same x_c. All profiles have nonnegative weights on both sides, with left support teal and right support gray irrespective of center. The same boundary extends through every profile. No axis scale or normalized numerical probability is asserted: caption and label explicitly mark a schematic |phi(x)|^2. The x axial/y circumferential correspondence matches the attached content and source real-space partition discussion.

## 12. asymptotic-regimes

Frozen verdict: supported.

Evidence: logarithmic coordinates use x=75+(435/4)log10(n), y=615-60log10(L/xi_r). Equality lines therefore represent L/xi_r=n and n^2 exactly. The illustrative points (2,100) and (1000,100) have the correct positions. Fixed-n upward and fixed-L/xi_r rightward arrows agree with the two limits; the latter moves farther into 1<<L/xi_r<<n. The fixed-angle annotation is above n^2; small-angle annotation lies below n and above 1. Caption distinguishes reference curves from guaranteed validity thresholds. n doubling -> n^2 quadrupling is correct. PNG agrees; no numerical measurement claim is made.

## Repair Rechecks

partial-rotation: re-rendered PNG inspected alone. mapsto, 2pi/4 and periodic sim now readable and agree with the frozen geometry verdict. Final verdict supported.

schmidt-trace: re-rendered PNG inspected alone. Kets, lambda probabilities, orthogonality delta, and rho_A are now readable. Matrix values and index pairing unchanged and correct. Final verdict supported.

schmidt-complex-sum: re-rendered PNG inspected alone. Incorrect right-angle arc is removed. Weighted arrows and resultant unchanged and correct; minus signs and modulus relation now readable. Final verdict supported.

two-edge-density: re-rendered PNG inspected alone. Both negative thermal exponents, beta labels and tensor-product symbol now readable and correct. Final verdict supported.

Primary-source follow-up: main.tex lines 202-233 independently support the two-edge factorization, physical/entanglement edge assignment, and modular inverse endpoint relation; line 345 supports orbital versus real-space distinction. supp_mat.tex interpolation section and main.tex line 233 support the two asymptotic conditions. These checks do not change the frozen geometry conclusions.

Final mathematical/physical visual-semantic verdict: all 12 figure relations supported after the angle-arc removal and UTF-8 repairs. No unresolved semantic fix remains. Scope limitation: the observable module briefs were initially exposed, so this record is a single-perspective geometry/relation audit, not an independent first-encounter reader review. Per-figure PNG inspection and frozen judgments are retained above; no author report or brief is used as scientific evidence.

### PNG Revision Hashes

SHA-256 at final inspection completion (public/diagrams):

```text
asymptotic-regimes 1e740064cffe778ddc9620eb6ed398126dba920f927936b6477aafe001626034
boundary-integer-membership 2bc9af8778ae7c728d75e52267baa1b8c38ab34cc5304d74ce30e5d62be5f8d2
modular-inverse-map 368f05a8177480c6fbad0ff36aaa959744978afb34974f7459ee8ee6c31898b7
mps-bond-rotation b8ee6af2c08467430cbd7a3dd4d817116d5163794001c4c0c424fcdf5ccb7805
orbital-realspace-cuts 0148eb2ed569aa551af273192bc98a89380e2e9e5b76e24f0fa50879e664701d
partial-rotation 3de165b2db1271119df14faa07fe58e9ffc8f14fdb94a64b11b088693fdeb306
schmidt-complex-sum 4a228529c677bfaf535a4e7e8b9e4b7a65e86049fb1b62d29dbc3d03e1e69e2b
schmidt-trace 5789190ee36b96d457928bd472074d4f2ce1a9458dac2eeba3c91248b5166bbf
semion-sum-phase cd388c0aae8dc8b8eaf3062de7bc06054eaef5689fdc0015c8dd762dcb84c541
stacked-phase-product 910596b801c95d065fa954e35b8082f3e1d753e7050dfcefa22413b69c2f4b1b
three-phase-correction 2583e52dd869824db2e48a7a72dcb1b4c37c44bc13003f5faef959a0c2080ba8
two-edge-density dd616929a2ed503ce0000d2a0fcabd6ce38ee79918adb3aefd25a9204f8ad5e2
```

### Final Narrow MPS Delta

MPS PNG inspected alone after replacing the product notation with Right-half translation and adding phi=2pi/n. Frozen verdict: supported. The unchanged bracket spans the depicted right/B tensors, preserving the operation scope in source supp_mat.tex 602-605; the unchanged negative bond exponent correctly represents its inverse. The explicit phi value makes the same partial angle used in the bottom physical-A expression available. Calibration and distinct source/physical conventions remain intact. No unresolved semantic defect.

Latest mps-bond-rotation PNG SHA-256: 4bf5914417326210b9e4b17544c8b50dbcb1f1d1d61c36d6909f798eacbfab01.

Latest asymptotic-regimes PNG SHA-256: a43a01a933335a9b618ebc84b7b844d39f8e114a8152da5e149d71b0197e3b46. Coordinator reports a numerical-point label relocation only; this reviewer has not reinspected that image delta. The preceding semantic verdict covers its unchanged coordinate relations, not independent final placement verification.
