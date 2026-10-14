# Scientific Validity Review

Perspective: scientific validity only; one Gauss-Milgram relation and its restricted CFT derivation.

Reviewed artifact: `content/overview.md`, outer `details#gauss-milgram` including its nested disclosure, lines 36-115. SHA-256 at review: `f9dbdf16b6ce06ccce504a8ef790e38cac209efc8b3b5215e1f30a366bc19d65`.

Verdict: **supported under the stated matched bulk/edge assumptions**. No mathematical repair is required.

## Direct Calculation

For the conventional generators S = [[0,-1],[1,0]] and T = [[1,1],[0,1]], STS and T^-1 S T^-1 both equal [[-1,0],[1,-1]]. Their fractional-linear action is tau/(1-tau). Thus the displayed identity has the correct generator order and requires no extra charge-conjugation factor. The CFT matrices must represent these modular operations, as assumed in the disclosure; agreement of coordinate maps alone would not establish this for arbitrary unrelated matrices.

Set alpha = exp(-2 pi i c_-/24). Substituting T_CFT = alpha T_top gives alpha S T_top S = alpha^-2 T_top^-1 S T_top^-1. Hence the resulting factor is alpha^-3 = exp(+2 pi i c_-/8). Both sign and denominator are correct.

The vacuum component is sum_a d_a^2 theta_a / D^2 on the left and exp(2 pi i c_-/8)/D on the right. Multiplication by D yields the claimed relation. The normalization is D, not D^2. Consequently the n=1 sum has magnitude D and the phase determines c_- modulo 8.

## Source Conditions

[Kitaev, cond-mat/0506438v3](https://arxiv.org/pdf/cond-mat/0506438v3), Appendix E, equation (172), states the physical relation for bosonic systems with modular anyon data. Equations (232)-(233), Appendix E.5, give (ST_top)^3 = Theta C, S^2 = C, and the normalized Gauss sum Theta. Nondegenerate braiding is essential to this modular setting.

Appendix D.2, equations (166), (169), and footnote 16 distinguish one-chirality chiral-algebra characters from general edge partition functions. Its discussion supports the common negative c_-/24 factor and matched S data. Appendix E explicitly limits the standard proof to conformal edges under suitable boundary conditions and does not establish a general non-CFT proof.

## Scope And Remaining Conditions

The character T phase requires every state in sector a to have L0 in h_a + Z. Ordinary bosonic chiral-algebra modules satisfy this integer grading; the sentence about descendants is valid in that setting. It should not be transferred to unresolved superalgebra sectors with half-integer grading or arbitrary sums of modules with different weights modulo one. No such extension is claimed here.

The equality c = c_- belongs to the declared positive, one-directional edge. The text separately identifies c_- as the difference for general edges and sources the general relation; it does not derive the latter by putting a nonchiral character into the restricted calculation.

Concrete wrong inference requiring repair: none within the reviewed disclosure's bosonic modular and matched rational-edge scope. The cited source's unresolved general proof is a limit of that source's proof, not a contradiction of its stated relation.
