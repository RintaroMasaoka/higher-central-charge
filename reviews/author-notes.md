# Author Notes

## Revision After First Freeze

Coordinator corrected source authority to public v4 and corresponding printed equation locators. On the subsequent scientific repair request, applications and references now distinguish the formal unweighted Ishibashi state (identity at infinite temperature, nonnormalizable) from a regulated pair state with amplitudes exp(-beta_r E_j/2), whose partial trace is exp(-beta_r H_r)/Z. The microscopic cut-and-glue identification and unperturbed CFT approximation remain physical assumptions. Reader-facing terminology was normalized as requested: 指標, モジュラー, ハミルトニアン, シュミット分解, ボンド, テンソル, フィット, 高次中心電荷; original quoted English source titles and twisted higher central charge retained. This revision supersedes earlier frozen manuscript hashes; historical source adjudications below remain a record of initial authoring.

Assigned reader baseline: paper unread; understands CFT characters; no other personal expertise assumed. Active contract: note.spec.md. Read bundled authoring, exposition, visual-realization, japanese-rendering, explanation-acts resources and local primary source main.tex/supp_mat.tex.

## Realized Sequence

- overview: boundary gap problem; quantum dimensions and spins; phase sum; explicit semion and product calculations. Product example exposes obstruction at c_-=0 before introducing microscopic extraction.
- observable: physical/entanglement edge geometry; exact partial trace and Schmidt identity; physical displacement and momentum units; explicit CFT approximation and lengths.
- derivation: holomorphic calculation; chosen momentum signs; low-temperature left edge; S denominator; inverse ST^nS map; vacuum coefficient; three anomaly contributions; nonzero-leading-sum and fixed-n restrictions.
- applications: general sectors and unnormalized twisted sum; nonchiral scope; bond labels, calibration, orbital/real-space cut; source numerical evidence; distinct small-angle limit.
- boundary: general necessary tests, wider Abelian sufficient tests, finite prime-component algorithm, independent actual-c_- input, alias examples and circumference cost.
- references: locators by printed source equation and exact supplemental section heading.

## Source Adjudications

1. main.tex eq:rotasCFT (printed Eq. 3) has P_l=-H_l/v,P_r=+H_r/v after characters with +1/n,-1/n. With standard positive-exponent character and e^{+iP L/n}, those signs conflict. Manuscript chooses P_l=+H_l/v,P_r=-H_r/v explicitly to reproduce printed character arguments, rather than asserting transcription of paper momentum convention.
2. ST^nS fractional-linear map is tau/(1-n tau). To express chi(z) through a low-temperature chi(w), apply inverse w=z/(1+nz); z=-1/n+i epsilon gives exactly 1/n+i/(n² epsilon).
3. All three anomaly phases retained: left Casimir 1/n; modular T^n central term n; transformed right Casimir 1/n. Observable phase only equals zeta_n after correcting c_- factor (unless actual c_-=0).
4. Supplemental single-angle c_- extraction is periodic. Period 24n/(n²+2); trivial anyon theory n=2 period 8. E8 and E8^3 give phase 1 despite nonzero actual c_-. Manuscript requires independently determined actual c_-=0 for physical gappability.
5. Abelian classification input separated from edge-CFT derivation. General coprime tests are only necessary; broader gcd condition sufficient only in Abelian category, with actual c_-=0 added for physical phase.
6. Nonchiral prefactor depends on sum of component central charges; explicit A_n exponent confined to holomorphic edge c=c_-. Source nonchiral cut-and-glue construction explained conditionally.
7. Zero Gauss sum means leading vacuum coefficient vanishes, not exact finite-size observable zero. No phase normalization in this case.
8. Supplemental general xi_r expression (near line 714) has dimensional-ratio/square-root issue. Only correct Laughlin specialization pi sqrt(2/3) ell_B reproduced; large-n source expression used with stated regime.
9. Source Eq. schmidt uses ambiguous angle/momentum normalization. Manuscript uses physical displacement L/n and angular displacement L phi/(2pi); dimensionless K=pL/(2pi).
10. Supplemental Schmidt decomposition lambda² typo not propagated: amplitude lambda, probability lambda².

## Scientific Conditions Preserved

Bosonic scope; vacuum for zeta_n; separated ends; unperturbed entanglement edge-CFT approximation; nonzero vacuum coefficient; fixed n; n²xi_r≪L≪xi_l; positive real proportionality only for leading term; explicit CFT origin of xi_r; actual c_- distinct from mod 8; calibrated momentum; real-space cut; published, not reproduced, numerics; categorical criteria treated as external inputs.

## Open Production and Review Inputs

- /diagrams/partial-rotation.svg to be supplied by coordinator; geometry figure embedded before using two-edge interpretation.
- Japanese scholarly wording independent coverage gate remains coordinator-owned. Original English names retained for higher central charge, twisted higher central charge, momentum polarization; English identifies specialized MPS methods. No whole-manuscript wording PASS claimed by author.
- Independent sequential visible-body reader, mathematical/source audit adjudication, rendering/build and link checks remain coordinator-owned.
- References use supported reference comments, targets #ref-ID; chapter and reference links use /chapter/ paths as coordinator requested. Residual relative-link/custom-heading syntax check passed.
- Optional disclosures contain calculations/check answers; required definitions, assumptions and conclusions remain visible.
