# Independent Gate Review

Scope: read-only review of `scripts/prefix-reader.mjs`, `scripts/extract-review-body.mjs`, `scripts/check-renderer.mjs`, and `tests/reader-gate.mjs`, against the two supplied Study-note rubrics. No manuscript, author rationale, earlier review, history file, or other project source was accessed. No recursive reviewer was launched. The only repository write is this report.

## Supported Defects

1. **Configured sources with zero extracted units are not frozen** (`scripts/prefix-reader.mjs:19`, `:26`, `:33`). Initialization reads and checks each chapter source, but retains source identity/hash only inside emitted units. A chapter with an empty projection emits no unit and consequently disappears from later source validation. In an isolated real CLI lifecycle, initialization succeeded for an empty-body chapter followed by a visible chapter; changing the empty chapter to a heading plus visible assertion still allowed `next` to reveal the second chapter with exit 0. The changed first chapter's new visible material is absent from the acquired prefix. This violates the requirement to bind every frozen source and can change the reader path without invalidating the run. Store a source inventory independently of unit emission, and validate that inventory on every version-2 operation. Add an init-to-next regression for an initially empty projection becoming nonempty.

2. **A definite dimension failure can be frozen as overall UNKNOWN** (`scripts/prefix-reader.mjs:86`, `:87`). The checks only constrain PASS. An isolated `record` with subject `FAIL`, explanation acts `PASS`, and overall `UNKNOWN` exited 0 and froze the contradictory record. The rubric reserves UNKNOWN for genuinely unavailable evidence; a located established subject failure does not become unavailable because the other dimension passes. Preserve FAIL whenever either independently verdict-bearing dimension fails, while allowing UNKNOWN when neither fails and at least one remains unavailable. Add the corresponding record regression. This is a record-consistency defect, not a false-PASS exploit: summary still reports the overall UNKNOWN as a finding, and the nested FAIL remains present.

## Supported Behavior

- Scientific PASS alone cannot produce overall PASS when the explanation-act dimension fails. Each act move needs a current-unit quote, proposition status, act/presupposition, first-pass signal, a prefix-bound context quote and positional rationale, and a realization comparison with signal change and preserved content. The unit separately requires an active question and cumulative effect. These are appropriate accountable-evidence requirements.
- The governing rubrics explicitly require independent first-pass uptake, placement and cumulative-effect judgments even for true qualifications that prevent real errors. They explicitly preserve necessary negative results and do not treat affirmative wording or counted negations as acceptance criteria. No contrary lexical-polarity heuristic was found in the inspected scripts.
- Extraction producers record source and projection hashes. Initialization compares both hashes and canonical source paths. Existing tests exercise mismatched hashes, absolute source paths, configuration mutation, changed current/earlier sources that have units, source-binding override, quote absence, unrevealed-context exclusion, and required act evidence.
- Historical state cannot be advanced or recorded by this version of the runner. `summary` is read-only. Producers create a new output directory instead of overwriting an existing directory; initialization creates state with `wx`.

## Methods And Results

Static inspection was confined to the six named files. `node` was unavailable on PATH, so execution used `/Users/rintaromasaoka/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node`. The supplied `node --test tests/reader-gate.mjs` suite passed all 9 tests. Additional probes used temporary directories and synthetic source/config/projection files, invoking the actual runner's `init`, `next`, and `record` commands. Probe outputs were: empty-source mutation `init_status=0`, `next_status=0`; contradictory aggregate judgment `record_status=0`, `Frozen visible-1: UNKNOWN`. Temporary fixture directories were removed. The probe source is `/private/tmp/final-gate-blind-probe.mjs`.

## Limits

Schema success does not establish that a quotation provides the stated license, that a comparison is materially different and preserves content, or that the act verdict follows from its first-pass effect. Both supplied rubrics correctly assign that semantic adjudication to the coordinator. No reader-facing manuscript or actual reader records were inspected, so this review does not certify speech-act suitability, scientific accuracy, coverage of consequential moves, cumulative effects, or coordinator adjudication.

The tests largely construct state directly. The additional lifecycle probe strengthens init-to-next coverage but does not execute the real Vite extraction producers or the renderer-to-extraction-to-review workflow. Source/projection hash binding was inspected and existing CLI init fixtures ran; actual rendering/extraction correspondence remains unverified in this restricted review. Launch isolation, reviewer history exclusion and execution auditing are external to these four files and were not certified. The two reproduced defects should be corrected before claiming the requested runner-integrity acceptance.

## Reviewed Hashes

SHA-256 at review time:

```text
20f2f737dfe50cd9b88d3e1de57a5a0d9b584dcd31d00aefa187f4f0b62917b2  scripts/prefix-reader.mjs
f80c9e6f2b2dfa71cc51179f3f0b0dd34b5268fe3c59bfe037043208e88d7111  scripts/extract-review-body.mjs
e6460a3bb8b300c870e0550c0d9a6ab806e241b7337c78e64e332b106b77ec5d  scripts/check-renderer.mjs
e3241a3688d3dd5b1df60002e4d84eba15d7336aeff6eb9dd71e130206d85a6b  tests/reader-gate.mjs
26d2e06389493d5fceef68af4a234c90cb9a0d61c05578f78a031a93510158d5  /Users/rintaromasaoka/Desktop/Skills/study-note/references/reader-review.md
9a0d1fda22e2a4e59c5a5029ef389d15b4449e621efef66e8422dac7ccdb8631  /Users/rintaromasaoka/Desktop/Skills/study-note/references/explanation-acts.md
```
