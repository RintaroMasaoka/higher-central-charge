# Higher central charge study note spec

- spec_id: higher-central-charge-study
- status: active
- artifact: content/
- governs: whole study website manuscript
- approval_migration_status: not-applicable (new manuscript)

## Objective and role
Enable a first-time reader of arXiv:2303.04822v4 to reconstruct how partial rotation of a cylindrical ground state measures higher central charges and what this implies for a gapped boundary. Deliver Japanese editable scholarly notes through a config-driven website and GitHub Pages.

## Audience
The learner has not read the paper and explicitly understands CFT characters. Other personal expertise is unconfirmed. Establish locally the Schmidt trace identity, anyon data, this paper's modular transformations, vacuum dominance, and phase extraction. Definitions alone must not be treated as understanding of the mechanism.

## Derivation
The objective requires a connected route from a wave function to an observable and then to a boundary obstruction. Develop the central derivation and elementary examples. Explain supplemental generalizations as applications; reproducing iDMRG or categorical proofs would exceed this route. Preserve physical hypotheses instead of promoting source agreement to a microscopic proof.

## Requirements
- R1: Boundary question, anyon data and weighted phase sum; worked semion and U(1)_2 times U(1)_-4 examples. These show the distinction beyond c_- and enable direct checks.
- R2: A/B geometry, physical versus entanglement boundaries, partial trace and Schmidt weighted translation. These establish what is actually evaluated.
- R3: Character trace, ST^nS fractional-linear map, transformed modulus, vacuum coefficient and all three anomaly phase contributions. These establish the paper's mechanism.
- R4: Vacuum sector, bosonic scope, nonzero sum, unperturbed entanglement edge-CFT approximation, fixed n and n²ξ_r≪L≪ξ_l visibly accompany the leading formula. These delimit its warrant.
- R5: General sectors and MPS extraction, momentum units/calibration, real-space versus orbital cuts, and published numerical evidence. Do not claim a reproduced numerical experiment.
- R6: Coprime necessary tests versus the wider Abelian necessary-and-sufficient test; supplemental finite algorithm, phase alias and circumference cost. Actual c_-=0 requires an independent check; do not silently use c_- modulo 8.
- R7: Exact primary-source locators, useful self-check questions and folded solutions; necessary premises remain visible with details closed.

## Conventions and invariants
Preserve d_a, θ_a, c_-, ζ_n, N_FS and source anyon labels. Distinguish modular T from partial translation. Define character and momentum sign consistently, documenting the source sign mismatch in reviews. Use physical displacement L/n to avoid ambiguous angle/momentum units. Positive real proportionality applies to the leading asymptotic term only. Never divide by zero or interchange fixed-n and momentum-polarization limits. Japanese terms retain English identification where community usage is unresolved; no audit labels in the manuscript.

In the MPS comparison, project K_alpha=p_alpha L/(2pi) belongs to the selected physical A generator. Source bar K_alpha is a left-accumulated virtual-bond conserved label; the source's right-half operation inserts its inverse transformation. Do not identify these labels by an unestablished sign-only map. Preserve the source-side operation and its origin calibration as a pair. This follows from the supplemental momentum-conservation, partial-MPS rotation and label-calibration definitions.

## Protected human realizations
None.

## Exclusions
Reproduction of iDMRG, lattice Majorana numerics, quantum hardware experiments, and proofs of external categorical classification theorems. Explain their roles, scope and published evidence.

## Sources and dependencies
literature/papers/2303.04822/source/main.tex and supp_mat.tex, local paper.pdf; adopted Study HTML specification 1.0.0 (linked compatible 1.0.1); renderer from Non-invertible-SPT with component lineage to Recknagel-Shomerus/website.

## Acceptance checks
Source-bound audit; fresh sequential visible-body reader; scientific and notation checks; Japanese wording coverage; math/extraction/build; desktop/mobile light/dark UI; GitHub source upload and live Pages verification. Record each unresolved gate explicitly.

Assign exactly one decision perspective to each fresh independent reviewer; the coordinator combines coverage and verdicts. Reader inference availability and explanation-act suitability use separate lanes. Sequentially reveal at most one paragraph with its attached equation or figure and freeze its lane judgment before the next reveal. Scientific fact checking, Japanese terminology, visual and production gates retain their own perspectives rather than borrowing a reader signature.

In the act lane, review what each consequential utterance asks the reader to attend to, accept or revise, and what its position signals as important, doubtful, exceptional or expected. Use only the acquired prefix. A true condition, or prevention of an actual wrong inference, does not by itself license its wording, prominence or placement. Compare feasible realizations while holding required scientific content fixed; inspect cumulative reminders and contrasts. Negative results remain admissible when they answer the subject question. Require located evidence and revision-bound records rather than free-form assurances.

## Open decisions
Additional learner background is unknown. Explain the necessary local relationships without claiming personal mastery.
