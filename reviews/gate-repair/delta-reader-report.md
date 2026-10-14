# Independent delta reader report

Reader baseline: CFT characters, basic linear algebra and complex arithmetic; the paper is new. Instructional isolation: only the three assigned study-note rubric resources and the assigned packets have been read. No source, binding, earlier judgment, author report, history or suffix discovery was used. Scientific judgments below test reconstruction from the visible text and ordinary mathematical reasoning, not independent verification of the cited classification theorem.

## Boundary 4: frozen before reference task

Packet SHA256:
- prefix: `3da952d9a405f592268597161d6ca09dc7a7f57bf10b3fa24096364e8dc4df5d`
- unit: `d2a4ce597d1f9922f7d2a9df4e3c0b1470e849b248970c45f06e4e2074c7c688`

Actually acquired: complete boundary prefix, then complete boundary unit. Active question: how a known total quantum dimension supplies a finite set of measurements covering the Abelian statistical obstruction when the spin exponent is unknown.

### Scientific/prerequisite records

B-S1. Quote/demand: “Abelian では全ての $d_a=1$ なので、$\mathcal D^2$ は真空を含むエニオン種類の数となる。” Required premise: $\mathcal D^2=\sum_a d_a^2$, supplied in the opening prefix. Reconstruction: count species, factor the resulting integer. Next usable inference: the prime factors index the stated component theories. PASS.

B-S2. Quote/demand: “各部分理論の Frobenius–Schur 指数 $N_j$ は $p_j$ の冪” and its two bounds. Required premise: existence of the prime-power decomposition and classification bounds. Current unit explicitly identifies these as “Abelian 分類の入力”; the earlier sufficient-condition theorem was likewise presented as a classification result. The learner can use a supplied theorem without a derivation. The product of mutually coprime $N_j$ divides $2\mathcal D^2$: for odd factors their exponents are bounded by $k_j$, and for 2 by $k_j+1$. PASS for usable inference, external theorem verification outside this packet.

B-S3. Quote/demand: “$2\mathcal D^2/p_j^{\widetilde k_j}$ は、他の部分理論の $N_i$ では割り切れる”. Required premise: preceding bounds and distinct primes. Let the displayed cofactor be $q_j$. It retains sufficient powers of every other prime and removes the entire power of $p_j$. Thus $N_i\mid q_j$ for $i\ne j$ and $\gcd(q_j,p_j)=1$. Multiplying by admissible $m$ preserves both properties. The prefix already supplied spin powers and factorization of anyon sums under products. Next inference: other factors contribute positive species counts and cannot change the measured phase. PASS.

B-S4. Quote/demand: “$m$ を走らせると $N_j$ を法とする互いに素な全ての剰余を覆う。” Required premise: $N_j=p_j^{s_j}\le p_j^{\widetilde k_j}$ and $q_j$ is invertible modulo $N_j$. Available witness: B-S2/B-S3 and the displayed full range for $m$. Every unit residue modulo $N_j$ has representatives in that range; multiplication by the coprime cofactor permutes them. The inverse/permutation step is implicit but reconstructible by elementary modular arithmetic from the immediately preceding coprimality statement. PASS; it is a small algebraic inference rather than an assumed paper-specific fact.

B-S5. Quote/demand: “各 $N_j$ は $n$ と互いに素であるか、$n$ を割り切る。” Required premise: the acquired Abelian gcd criterion. Current text gives the contradiction explicitly: an intermediate power of $p_j$ dividing $n$ leaves $p_j$ also in the quotient. Therefore an admissible exponent either kills a whole component or samples one of its coprime residues. Together with multiplicativity of the sums, all measured phases equal to 1 imply all phases in the preceding sufficient condition equal to 1. PASS. This covers the statistical condition; the already acquired boundary section still requires actual $c_-=0$ for physical edge gappability.

B-S6. Quote/demand: “面積則 $S_{\mathrm A}\simeq\alpha L-\log\mathcal D$ の普遍的な定数項”. $S_{\mathrm A}$ is locally identifiable as entanglement entropy, $L$ is already defined, and the following sentence specifies eliminating $\alpha L$ and identifying an integer. This is a route for acquiring the input, not an entropy calculation instruction. The reader can infer the intercept is $-\log\mathcal D$ and hence recover $\mathcal D$. PASS for this advertised input route. Definition/calculation of entropy from $\rho_A$, fitting reliability and integer uncertainty are not provided and are not certified here.

Scientific/prerequisite verdict: PASS within the supplied classification inputs and stated approximation regime.

### Explanation-act records

B-A1. Quote: “補足資料は、全量子次元 $\mathcal D$ が分かれば有限個の部分回転で Abelian の統計の障害を覆える手順を示す。” Proposition status: conditional method statement. Act/presupposition: opens a method for the heading's unknown-exponent problem, presupposing only the already established sufficient condition. First-pass signal: the new useful input is $\mathcal D$; the conclusion concerns the statistical obstruction. Prefix license: the preceding criterion depends on $N_{\mathrm{FS}}$, while the preceding physical-boundary paragraph separately requires actual $c_-=0$. Comparison: placing the entropy route after the arithmetic would preserve all facts but postpone how the substituted input is obtainable; the actual short placement establishes its relevance immediately. PASS.

B-A2. Quote: “これらは補足で用いられる Abelian 分類の入力である。” Proposition status: attribution and premise status. Act/presupposition: tells the reader where the undemonstrated decomposition and bounds enter. First-pass signal: these are accepted structural inputs, while the ensuing measurement selection will be explained. Context license: the paragraph asserts substantial new prime-power classification facts without deriving them. Comparison: omission preserves the mathematics but makes the boundary between quoted structural input and the note's ensuing derivation less clear; expanding proofs here would interrupt the finite-measurement question. PASS.

B-A3. Quote: “なぜこの選択で十分なのか。” Proposition status: explanatory question, followed immediately by its answer. Act/presupposition: calls for the consequence of the displayed measurement choice; no mistaken stance is imposed. First-pass signal: the selection's cofactor has a reason, not just a prescription. Context license: the non-obvious measurement formula just introduced. Comparison: beginning directly with the cofactor explanation preserves subject content and reduces one rhetorical cue; the present question makes the connection to sufficiency clear without delaying an answer. PASS.

B-A4. Quote: “これが先ほどの Abelian の十分条件を覆うことも確かめよう。” Proposition status: transition to a second, distinct completeness argument. Act/presupposition: asks the reader to connect component-wise measured residues to the whole-theory criterion. First-pass signal: isolating a component alone has not yet established coverage of the earlier test set. Context license: preceding paragraph only proves isolation and coverage within a selected component; the prefix's criterion concerns all admissible whole-theory exponents. Comparison: omission would leave the reader to supply the prime-power dichotomy and product argument unaided; moving the argument earlier would use the measurement set before its meaning was established. PASS.

B-A5. Quote: “実際、$p_j$ が $n$ を割るのに $N_j$ が $n$ を割り切らなければ…十分条件の最大公約数は $1$ にならない。” Proposition status: contradiction proving a dichotomy. Act/presupposition: rules out an intermediate prime valuation inside the displayed criterion. First-pass signal: the excluded case is part of exhausting the arithmetic possibilities, not an accusation that the reader made an error. Context license: the immediately asserted coprime-or-divisible dichotomy. Comparison: stating only the affirmative dichotomy preserves the claim but loses its reason; a valuation formula would preserve the reasoning but require new notation. The actual negative conditional is efficient and licensed. PASS.

Cumulative effect: the acquisition begins with an input route, states classification inputs, explains component isolation, then proves whole-test-set coverage. The two explanatory prompts correspond to two different missing relations. The preceding prefix contains scope and approximation qualifications, but this unit adds no repeated warning about physical gappability or imagined novice error. The classification-input sentence usefully marks what is assumed rather than revisiting it defensively.

Explanation-act verdict: PASS. Overall boundary-unit verdict: PASS, with theorem/source verification and entropy estimation outside the review scope. This verdict was written and frozen before reading the reference task.

## References 7: independently judged after boundary freeze

Packet SHA256:
- prefix: `5f8f5b38df1860953db75fc350b1e1feb63280a33a713b4ce4775e571bcc8fce`
- unit: `db0c501931b02bcce42e1e00813e5d6d698917f8b4a35ac276f34dcfb071b403`

Actually acquired: reference prefix through the MPS reference entry, then the numerical-results reference entry. The first combined output truncated a middle portion; packet lines 330–520 were reread to acquire that missing portion. No following reference entry was read. Active question: where to locate the numerical comparisons and implementation details already described.

R-S1. Quote/demand: “原論文 Fig. 2（Kitaev model）、Fig. 3（ボソン Laughlin 状態）、Table I（位相の予測）。” Premise: what systems and predictions these labels refer to. Witness: acquired numerical-example section explicitly names Kitaev Ising and boson Laughlin systems, assigns Figs. 2/3 to comparisons and Table I to calculated phases. Reconstruction: map each main-text numerical result to its source figure/table. Next usable action: open the indicated figure or table for the corresponding comparison. PASS for local reconstruction; exact source-locator correctness is not independently certified because external source access was excluded.

R-A1. Quote: the complete numerical-results entry, including “特に *Numerical performance of partial rotation* を参照する。” Proposition status: reference mapping and directed lookup. Act/presupposition: offers source destinations to a reader who has acquired the numerical examples; presupposes neither an error nor doubt in those examples. First-pass signal: the figures/tables carry the comparisons, the supplemental subsections carry model-specific calculations and convergence performance. Context license: the acquired numerical section reports finite circumference, bond dimension and occupancy limits and cites “Numerical performance”; the later circumference-cost paragraph cites it as well. Comparison: replacing the specific subsection titles with a general supplement link retains source identity but loses the useful lookup granularity; repeating convergence limitations here would add no new locating information. The actual concise entry serves the reference section's role. PASS.

Cumulative effect: earlier reference entries carry some convention and normalization qualifications, but this entry simply maps numerical claims to locations and returns the reader to source inspection. It neither amplifies those qualifications nor introduces an unsupported general caution.

Scientific/prerequisite verdict: PASS for reader use of the supplied locators. Explanation-act verdict: PASS. Overall references-unit verdict: PASS within this bounded locator review, not verification of the original paper or certification of earlier reference entries.

## Optional derivation hint, acquired last

Read only `content/derivation.md` lines 88–93 after acquiring the visible derivation in the boundary prefix. Extracted six-line SHA256: `e95a92ad0db7259c63f73efe0869dd7d3db9f7f25229b354194f86e89c3c3a90`. The HTML wrapper was read only to identify summary versus hidden hint. The substantive judgment uses the visible derivation prefix up to this check, not later derivation or the reference discussion.

H-S1. Quote/demand: “左辺の分子の引数は、右辺の指標の引数を $ST^nS$ の写像に入れたものである。” Premise: the displayed transformation formula and map. Available witness: the visible derivation gives $f(\tau)=\tau/(1-n\tau)$, $z=-1/n+i\xi_r/L$, and $\chi_1(z)=\sum_a(ST^nS)_{1a}\chi_a(1/n+iL/(n^2\xi_r))$. Reconstruction: left argument equals $f$ of the right argument; to find the right argument solve $f(\tau)=z$. Solving $z(1-n\tau)=\tau$ yields $\tau=z/(1+nz)$. At the supplied $z$, the denominator is $in\xi_r/L\ne0$. Next usable inference: evaluate the inverse to obtain positive large imaginary part $L/(n^2\xi_r)$. PASS.

H-A1. Quote: “右辺を低温で評価するため、その引数を求めたい。したがって、分子の引数に逆写像を作用させる。” Proposition status: explanatory purpose and operation selection. Act/presupposition: answers the optional check by identifying the known and unknown arguments; presupposes only the displayed equality and low-temperature aim. First-pass signal: the reason for applying the inverse is the direction of the character equality, rather than a generic rule about modular transformations. Context license: the immediately visible section specifically seeks to write the known right-boundary numerator through characters with large imaginary argument and has displayed this inverse evaluation. Comparison: merely repeating $z/(1+nz)$ preserves the formula but loses the operational reason for choosing inverse rather than forward map; adding an explicit rejected forward-operation warning would introduce a corrective stance without further mathematical gain. The actual hint gives the required relation directly. PASS.

H-A2. Quote: “写像は $\tau/(1-n\tau)$ なので、その逆は $z/(1+nz)$ となる。” Proposition status: short algebraic recap. Act/presupposition: supplies a calculable answer to the check. First-pass signal: the inverse is settled by elementary algebra, with no new convention or source authority. Context license: both formulas and the evaluated result are already in the visible passage. Comparison: omitting this final recap would preserve the main explanation but force a return to the preceding formula; its short repetition is useful inside a separately opened answer. PASS.

Cumulative effect: the visible derivation already explained the inverse construction; the hidden hint repeats it as an optional understanding check, adding a left/right-argument reading of the character equation. This is purposeful rehearsal on demand, not another visible warning or correction that redirects the main route.

Japanese sentence/gloss review, restricted to the six extracted lines:
- “指標”, “引数”, “写像”, “逆写像”, “低温” retain their established referents from the acquired CFT/mathematical prefix. No new disciplinary name or translated concept is introduced in this hint. “分子の引数” is a local gloss for the argument of the numerator character, licensed by the immediately supplied transformation equality; it is not proposed as a new formal name. “左辺”, “右辺” identify the equation sides. The full modifier “右辺の指標の引数” disambiguates the object before the shorter “その引数”.
- The sentence “左辺の分子の引数は、右辺の指標の引数を…入れたものである” preserves map direction. “その引数” in the next sentence refers to the right-hand character's argument because the sentence first names “右辺”; the subsequent “分子の引数に” clearly switches back to the known numerator argument. No scope, agency or causal-direction defect found.
- The check heading asks for a mathematical argument already available in the prefix; it introduces no extra conceptual handle. English alternatives (argument, inverse map) would add no concept distinction here. This is a sentence/gloss suitability PASS, not a full Japanese terminology-gate PASS: no source-bound inventory, independent disciplinary-usage sources or coverage validator was supplied/run, and no whole-range preferred-name claim is made.

Hint scientific/prerequisite verdict: PASS. Hint explanation-act verdict: PASS. Japanese sentence/gloss suitability: PASS within this local scope. Overall local hint verdict: PASS.

## Limits

These are three local acceptance judgments. The acquired prefixes supplied context and were not exhaustively certified. Bibliographic source accuracy, full classification proof, numerical estimation reliability, rendering and full-manuscript Japanese nomenclature remain outside this run. No content edits or recursive delegation were performed. The only write is this report. Packet hash binding and separate verdicts are explicitly recorded; isolation relies on the observed tool access sequence rather than enforced filesystem restrictions.
