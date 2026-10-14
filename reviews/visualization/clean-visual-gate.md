# Independent Visual Correspondence Gate

## asymptotic-regimes

PASS. Packet SHA256: `9c2cc8dc7a5de35866b3c53c36686d75a3446c9fc8a034576a9bd5d4930a3fb7`. Source: main.tex:233; supp_mat.tex:204-234. Fixed angle requires r=L/xi_r >> n^2. Momentum-polarization expansion of 1/(xi_r^2/L^2+1/n^2) requires n >> r, with r >>1 for vacuum dominance. Figure represents these two sufficient asymptotic regions, leaving the intermediate range unclassified. Log scales are 108.75 pixels/decade horizontally and 60 vertically: reference lines have the correct n and n^2 exponents, and both sample points have r=100 at n=2 and 1000. Upward/rightward arrows hold the other coordinate fixed. Equalities are explicitly reference curves, not thresholds.

Boundary integer condition source confirmation: main.tex:179-180 explicitly states both gcd conditions used in the membership figure.

Final coverage: 12/12 first-encounter packets frozen independently in the specified order. No mathematical/physical visual-correspondence defects found. Reader explanation, Japanese wording, visual taste, and production behavior were outside this gate.

## boundary-integer-membership

PASS. Packet SHA256: `d89c9d03af246292708eabf285a33fdefeaa383ab49e0a204b946abe953a69d9`. Independent gcd enumeration for n=1..12 gives coprime {1,5,7,11} and extended {1,3,4,5,7,8,9,11,12}; every filled/hollow marker matches and proper inclusion is correct. Range is explicit; dots encode integer eligibility, not phase values or a declaration of gappability. Actual c_-=0 is retained separately in caption.

## orbital-realspace-cuts

PASS (schematic). Packet SHA256: `1923522006b2a718b6bc89c614866aba2875d388b0256773cef8d18e563598f7`. Source: supp_mat.tex:662. Orbital partition assigns entire indexed orbitals to A or B; real-space partition splits every finite-width orbital's support at the same xc. Gaussian profiles have both sides colored according to position, including tails of orbitals centered across the cut. Axial x and circumferential y agree with cylinder geometry; no quantitative density claim is made.

## mps-bond-rotation

PASS. Packet SHA256: `7f53460ffde84fb47b86bfd7350d16797fcab157637ad259327859642499f7e3`. Source: supp_mat.tex:602-604,637. The operation bracket covers the right half B; its virtual insertion is correctly inverse exp(-i phi Kbar), and each channel is weighted by lambda squared. Calibration has exactly x1*Cbar+x0. Bottom physical A momentum formula uses a separate generator convention and positive phase; no equality with the source virtual label is asserted.

## three-phase-correction

PASS. Packet SHA256: `4c6270680a5b35474be08def3e114cdac924b9ab00be9900c1e9ec6028035658`. Source: main.tex:191,219,230. For n=3,c=1, left and right vacua each contribute -pi/36; T^n contributes -pi/4. Sum -11pi/36 plus zeta3=-pi/4 yields -5pi/9; correction +11pi/36 restores -pi/4. All displacements use 200 pixels/radian and endpoint projections match; signs and relative lengths are correct.

## modular-inverse-map

PASS. Packet SHA256: `e2e417332ecafc06a3c8e1c3f1f8e3edb92276977181bb595122e9b1dcb28fdb`. Source: main.tex:228. Direct z/(1+2z) for z=-0.5+0.1i gives 0.5+2.5i. Both axes use 130 pixels per unit; plotted offsets are (-65,-13) and (65,-325). The connecting curve is labeled as input-output correspondence, not a physical trajectory. Inverse map sign agrees with ST^nS matrix up to its immaterial scalar sign.

## stacked-phase-product

PASS. Packet SHA256: `acd9d37262635b24f851567e916d7e62f43ae15b31ab33843762e899724270e0`. Direct Gauss sums: U(1)2 gives 1-i; U(1)-4 gives sum over a=0..3 of exp(-3*pi*i*a^2/4)=2exp(-3*pi*i/4). Their product is -2sqrt(2). Common 55-pixel unit circles give lengths sqrt(2), 2, 2sqrt(2) with angles -pi/4,-3pi/4,-pi. Independent product factorization agrees with stacking (supp_mat.tex:109).

## semion-sum-phase

PASS. Packet SHA256: `972b793a707b3ad6352d5fed9c31199adbfba39ca42692afd0d58377301ed959`. Source: main.tex:289 U(1)2 trivial-sector row; direct 1+i^n calculation. Head-to-tail contributions produce 1+i, zero, 1-i. All units use 65 pixels; unit phases are radius 65 at +/-45 degrees. Zero has no phase arrow.

## two-edge-density

PASS (schematic). Packet SHA256: `a5e3ba60ac36032a6e6410576060c0044ca41a7c981c10d1f1faebb3bd4a807f`. Source: main.tex:200-216. Hl maps to the physical left edge, Hr to the entanglement cut. Tensor product and normalized Boltzmann factors agree with the low-energy factorization. Bars decrease with energy and show stronger ground dominance at large beta_l; caption explicitly excludes quantitative level spacing and measured probabilities.

## schmidt-complex-sum

PASS. Packet SHA256: `6e9e139474e0d5dfcdb6f3aec51698f7850b8d934eefb4dbbbb9af8db8152e35`. Direct calculation and main.tex:333-337. Unit circle radius 130 sets a common metric: contributions 65 and -65 cancel; lower components 97.5 and 32.5 give exactly 3/4+i/4 and magnitude sqrt(10)/4. Positive imaginary direction is upward. Zero phase is correctly undefined.

Perspective: mathematical and physical correspondence only. Each packet is inspected and frozen before the next is exposed. Author briefs and prior verdicts excluded. PNG inspected for every item.

## schmidt-trace

PASS. Packet SHA256: `5b4bed6cbb8b2a06af2d985e997c8d00585024df4f8d75195472c24793737cf8`. Source: main.tex:333-337 and direct partial-trace calculation. Orthogonality contracts paired indices to delta, yielding diagonal probabilities 1/2, 1/3, 1/6 with sum one. Pair links encode correspondence, not equal Schmidt amplitudes. The illustrative probabilities are explicitly distinguished from measured data.

## partial-rotation

PASS. Packet SHA256: `42a6469897b9d44c64422162779ea64e180a8f90371fccf4a645d100028d5fd7`. Source: main.tex:187. The four A marker families move upward by exactly one quarter of the periodic interval, with the top family wrapping to the bottom; B retains every position. Dashed upper/lower edges are periodic identifications, and the physical left boundary and entanglement cut are distinct. The depicted positive translation agrees with the displayed y map.
