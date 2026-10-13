# Scientific and Notation Choice Review

Scope: all six content chapters, initially 630 lines and revised to 647 lines after the nonchiral regulator repair. Includes titles, inline math, displayed math, tables, image alt caption, details/summary text, and references. All source lines were read. This reviewer was given the learner baseline (CFT characters known; paper unread; other expertise unknown) and raw scientific sources. No prior reviews or author notes were read. This is full-source scientific/choice review, not prefix-reader availability certification. No numerical simulation was rerun.

## Findings

1. Repaired: the original applications.md:37 compressed the unweighted Ishibashi pairing into a finite-temperature density matrix. The public PDF supplement IV, equations (34)-(36), instead displays the formal unweighted sum and infinite-temperature identity. Revised applications.md:37-54 correctly distinguishes non-normalizability, introduces coefficients exp(-beta_r E_j/2), computes the normalized partial trace, and states the cut-and-glue approximation as a physical assumption. The new algebra is valid.
2. Repaired and locally rechecked applications.md:37-70: regulator equations now use double-dollar display delimiters. Rendered verification remains the UI review's responsibility.
3. Repaired and locally rechecked applications.md:60-68: シュミットトレース / シュミット確率 were replaced by descriptive prose and explicit probability lambda_alpha^2. observable.md:55,60 still uses シュミット確率 as an explanatory gloss, with its meaning already explicit in the neighboring equations; naming preference remains unverified rather than a scientific error.
4. Pending minor typography at applications.md:108: ボンド次元 や still contains an unnecessary space.

No unresolved definite scientific error remains from this diagnostic pass. Final revised-content follow-up is local/diagnostic, not fresh independent acceptance of new text. Rechecked full revised chapters and the localized final applications.md:37-70 repair. Total source coverage is 647 lines: overview1-91, observable1-89, derivation1-171, applications1-131, boundary1-96, references1-69. Japanese naming evidence is separate and incomplete as recorded below.

## Checked Scientific Relations

- overview.md:23 normalized higher central charge, zero-sum exception, Gauss-Milgram phase and actual c_- versus mod8 distinction match public equations (1)-(2) and the cited bosonic framework. Semion table and U(1)_2 x U(1)_-4 example are algebraically correct: n=3 sum product is -2sqrt2 and N_FS=8.
- observable.md:19-57 partial trace, normalized Schmidt coefficients lambda_alpha, probabilities lambda_alpha^2, p_alpha L/n and K_alpha phi agree with operator algebra. Translation sign is fixed explicitly.
- derivation.md:9-162 character ratio, left vacuum phase, denominator S transform, inverse ST^nS map, transformed argument 1/n+iL/(n^2 xi_r), weight d_a^2, total phase n+2/n, and positive A_n match public equations (3)-(6). The source's contradictory P_l/P_r sentence is exposed and the chosen character convention is internally consistent. n=1 identity check is correct. The positive A_n formula is restricted to the ideal chiral case rather than transferred to c_-=0 nonchiral cases.
- applications.md:7-31 twisted sum and positive proportionality agree with public equations (7)-(8); unnormalized zeta_{n,a} is explicitly distinguished from normalized zeta_n. The semion phase exp(13pi i/9) and Ising phase exp(2pi i/9) agree with Table I. MPS label shifts, sector-dependent cut, real-space versus orbital cut, Ly=40ell_B, bond dimension3200 and boson cutoff5 agree with primary/supplemental text.
- applications.md:114-124 momentum-polarization phase and Hall-viscosity term agree with public equation (9), supplement (32)/(81), and the stated asymptotic regimes. No equality between the CFT coefficient and Hall viscosity is asserted outside the applicable QH analysis.
- boundary.md:9-31 necessary coprime-N_FS condition, stronger Abelian condition and actual c_-=0 requirement match the sources. The supplemental prime-power decomposition/bounds, finite n algorithm and D^2=12 example are correct. The phase-period formula 24n/(n^2+2) and E8 counterexamples correctly limit one-angle central-charge extraction. This review does not demand a reproof of the externally cited classification theorem.
- Corrected references use arXiv v4. Public denominator/numerator are (5)/(6), twisted-sector pair (7)/(8), and momentum polarization (9). Raw source equation counters must not substitute for the public PDF numbering.
- Diagnostic evidence correction: direct pixel inspection of /private/tmp/hcc-eq83-crop.png shows public equation (83) has its radical over 2pi^2/3 only, with c_-/(nu S) outside. The raw TeX has the same misplaced-root general formula; there is no PDF-versus-TeX correction here. Matching the CFT momentum-polarization L^2 coefficient to eta_H/(2pi hbar), with eta_H=hbar nu S/(8pi ell_B^2), instead gives xi_r=pi ell_B sqrt(2c_-/(3nu S)). For the note's nu=1/2 bosonic Laughlin specialization, c_-=1 and S=2 make c_-/(nu S)=1, so both forms reduce to pi sqrt(2/3) ell_B. boundary.md:87 uses only this unaffected specialization. No manuscript repair or new reader acceptance follows from this source diagnostic.

## Notation Choice Dispositions

| Symbols | Choice and comparison |
| --- | --- |
| a,b,1,s,psi,sigma,j | Retain source-native anyon labels. Different letters distinguish summed species, vacuum and example species. j for U(1) labels or energy eigenstates is local to distinct examples. Direct prose would obscure indexed sums. |
| d_a,theta_a,D,zeta_n,N_FS | Retain conventional/source-native invariants. d_a^2 and theta_a^n preserve weighted-spin relation; D is independently reused in S coefficients and entropy; zeta_n is the note's central phase quantity, not an unnecessary alias. N_FS controls arithmetic conditions and is repeatedly used. |
| c_- and h_a | Retain distinct chiral-central-charge and conformal-spin roles. The note explains theta_a=exp(2pi i h_a); calling theta a topological spin is a convention-sensitive terminology question, not conflation in the equations. |
| Psi_a,T_A;angle,T_a(angle),rho_A | Retain state/operator/expectation/density-matrix distinctions. Calligraphic T and subscripted operator T are useful source bridges rather than duplicate aliases. |
| lambda_alpha, p_alpha, K_alpha | Retain: coefficient versus probability square is necessary; p has inverse-length units and K=pL/(2pi) provides the dimensionless iMPS/angle bridge. Deleting K would make source comparison harder. |
| H_l,H_r,P_l,P_r,beta_l,beta_r,xi_l,xi_r,v,L | Retain meaningful l/r families tied to physical versus entanglement boundaries. xi=v beta packages lengths used repeatedly in regime inequalities. Meaning and units are preserved. |
| chi_a,H_a,L_0,tau,S,T,ST^nS | Retain familiar CFT motifs. The modular T versus partial-rotation operator distinction is explicit. ST^nS exhibits the composition needed by the inverse map. |
| A_n | Retain positive amplitude: independently removes nonuniversal magnitude from phase extraction and displays why a chiral formula cannot simply be used in a nonchiral case. Replacing it by full exponential at every use would obscure phase. |
| zeta_{n,a} | Retain fixed source label despite different normalization. Explicit bridge to zeta_n prevents silently equating two quantities. |
| Kbar_alpha,Cbar_alpha,x_0,x_1 | Retain literal source labels for affine momentum calibration. Subscripts0/1 encode constant/charge-dependent coefficients. Arbitrary replacement loses source reproducibility. |
| p_j,k_j,tilde k_j,N_j,m,M | Retain prime-component family in finite algorithm. Tilde distinguishes bound exponent from actual factor exponent, and N_j is actual FS exponent rather than bound. All are needed by the n formula. |
| eta_H,ell_B,nu,x_c | Retain conventional Hall viscosity, magnetic length, filling and cut coordinate. They carry dimensions or geometry, rather than abbreviating one-off prose. |
| E_j,Z,Psi_beta_r | New regulator notation earns its role through the state-to-trace calculation; Z is conventional partition function normalization and beta_r matches existing effective temperature. |

No definite gratuitous-symbol or mathematical type/convention failure found in this full-source pass. This does not certify availability at first use or the simultaneous prefix motif load; those remain the separate sequential review's task.

## Provenance

Public PDF SHA256: 332d6373a32f126c49343f84e4043463b979192f418b40aef71420e92952eaa7.

Raw main.tex SHA256: c00f76fdaced006c054807a36ae7918c5ab75a2a9af41f8fd17cafdd2742699e.

Raw supp_mat.tex SHA256: c3aec46214052c2aae6c431d8d4371f96c14aebb8c1a9eb04aabe6ab3a1b7658.

External Kaidi et al. higherc.tex SHA256: 222446c61f4379765a25e2018c43c24b56221cf95848e51223b3788ab18d7cc0.

Per-manuscript source and visible-projection hashes, exact candidate coordinates and line ranges reside in each *.inventory.json / *.coverage.json in this folder. All six validator calls passed mechanically. High-impact UNVERIFIED name records prevent an unqualified whole-range Japanese wording PASS. They are missing language evidence, not established scientific defects. Different referents sharing a scanner surface still require semantic occurrence-group refinement; mechanical validation cannot establish that refinement.
