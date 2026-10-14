# Named Phase Origins: Subject/Prerequisite Gate

Verdict: PASS within the assigned named-origin scope.

Perspective: subject/prerequisite only. This record does not certify scientific truth, explanation acts, Japanese terminology, or overall visual production.

Target: `public/diagrams/three-phase-correction.png`, with its prerequisites released as individual paragraph/equation packets from `content/derivation.md` and final caption/alt text. No other body, author report, or other gate report was read. The PNG was first opened only after all four prerequisite judgments were frozen and communicated to the coordinator.

Supported baseline: CFT character; vacuum exponent `L0-c/24`; modular representation `ST^nS`; source identities `theta_a=exp(2*pi*i*h_a)` and `S_1a=d_a/D`; source argument transformation from `-1/n+i*xi_r/L` to `1/n+i*L/(n^2*xi_r)`; semion example `n=3,c_-=1,arg(zeta_3)=-pi/4`.

## Frozen Sequential Records

1. **PASS: Left vacuum, lines 37-41.** The paragraph states suppression `exp[-2*pi*(xi_l/L)*h]` of nonvacuum contributions and retains vacuum energy `-c_-/24`. The attached character ratio changes its real argument by `1/n`. The baseline vacuum exponent and current suppression statement make the object (vacuum character contribution), operation (retain vacuum and divide), and next inference `exp[-2*pi*i*c_-/(24*n)]` available. Meaning/role and application suffice for this gate.

2. **PASS: Diagonal T, lines 101-106.** The paragraph defines `h_a` as the sector's minimum conformal weight and states that T is diagonal. The equality `T_aa=exp[2*pi*i*(h_a-c_-/24)]=theta_a*exp[-2*pi*i*c_-/24]` connects the supplied topological-spin identity and vacuum exponent. Its common central-charge factor can be raised to n without a new premise.

3. **PASS: T^n origin, lines 108-117.** The attached matrix product expands `(ST^nS)_11` as the sum over `S_1a*(T_aa)^n*S_a1` and factors out `exp[-2*pi*i*n*c_-/24]`. Packet 2 licenses that factor and explains the n in its phase. The baseline does not explicitly supply `S_a1=S_1a`; reconstructing the full `d_a^2` weighting would need that premise, but that issue lies outside this named-phase-origin gate and does not affect the common T factor.

4. **PASS: Right vacuum, lines 121-130.** The paragraph expressly associates the transformed character's imaginary part with a real factor and its real part `1/n` with a phase. The supplied transformed argument and baseline vacuum exponent yield `exp[-2*pi*i*c_-/(24*n)]`. Multiplication by Packet 3's T factor reconstructs the displayed `exp[-2*pi*i*(n+1/n)*c_-/24]`. The right-vacuum origin can therefore be identified separately and applied.

5. **PASS: Final figure and caption/alt, lines 168-170.** With `n=3,c_-=1`, the established factors give Left vacuum `-pi/36`, T^n `-pi/4`, and Right vacuum `-pi/36`. The figure places all three leftward changes on the same scale and connects each endpoint to the next start with a dotted line. The caption licenses those relations. Their endpoint is `-11*pi/36`; the supplied semion angle adds `-pi/4`, reaching `-5*pi/9`. The rightward Correction `+11*pi/36` starts there and ends at `-pi/4`. Named origins, their signed changes, and their use in recovering the semion phase are reconstructible from this acquired prefix.

## Revision Binding

- `content/derivation.md` SHA256: `91e99212dc1cd432255985c808f60d4852beb3cd56e18f9b936e61eea5c40b32`.
- `public/diagrams/three-phase-correction.png` SHA256: `2583e52dd869824db2e48a7a72dcb1b4c37c44bc13003f5faef959a0c2080ba8`.
- Each packet was frozen before requesting and acquiring its successor. No later packet was used to repair an earlier judgment.
