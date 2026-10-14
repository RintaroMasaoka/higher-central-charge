# Candidate Acceptance Integrity Review

Verdict: **FAIL** for durable projection identity; mechanical verdict separation and prefix quote checks pass within the tested scope. No manuscript or speech-act semantic acceptance is certified.

## Snapshot and Method

Read only the three nominated runner/extraction scripts, `tests/reader-gate.mjs`, and the two canonical rubric references. No manuscripts, prior reports, histories, author discussions, or recursive delegation were accessed. Source files were not edited. Executed the nominated test suite using bundled Node v24.19.0, plus a synthetic temporary-fixture probe. Temporary fixture data were removed after each probe.

The runner and test file changed during the review. Re-read both and re-ran checks on the following final snapshot; conclusions below concern these hashes:

| File | SHA256 |
| --- | --- |
| scripts/prefix-reader.mjs | f4699d54cb48a8d5bbb6d91ac868c2f82a67e9f2d7a80d757aaedfabf611e8b0 |
| scripts/extract-review-body.mjs | f80c9e6f2b2dfa71cc51179f3f0b0dd34b5268fe3c59bfe037043208e88d7111 |
| scripts/check-renderer.mjs | e6460a3bb8b300c870e0550c0d9a6ab806e241b7337c78e64e332b106b77ec5d |
| tests/reader-gate.mjs | 6a30e8d37d4063016ce6af1ff78a4c93b42db949bb7864be4c6904820c5aa1c3 |
| canonical references/reader-review.md | 26d2e06389493d5fceef68af4a234c90cb9a0d61c05578f78a031a93510158d5 |
| canonical references/explanation-acts.md | 9a0d1fda22e2a4e59c5a5029ef389d15b4449e621efef66e8422dac7ccdb8631 |

Canonical references are under `/Users/rintaromasaoka/Desktop/Skills/study-note/references/`.

## Supported Finding

**F1: Full projection identity is checked at initialization but omitted from the frozen run.** `scripts/prefix-reader.mjs:15` stores only source path/hash; lines 17-19 check body and manifest correspondence; lines 20-28 retain only nonempty sections and their text hashes. The frozen state carries no per-chapter body hash, extraction identity, or body location. This fails the requested durable binding of configuration/projection identity, particularly when a configured source produces zero visible units.

Reproduction: keep the same configured source and config bytes; initialize one fresh run with body `''` and another with body `'\n'`, each with its correct, distinct `projectionSha256`. Both initializations succeed and their frozen `state.json` files are byte-identical. Consequently the frozen acceptance evidence cannot distinguish the exact projections checked at initialization. This is an identity loss, not a demonstrated difference in rendered scientific content. Nonempty section text remains preserved, and source/config changes remain rejected.

Required repair: retain an explicit per-configured-chapter projection identity, including zero-unit projections, alongside source/config identity. Test that distinct projection hashes remain distinguishable in frozen runs. The test currently titled `freezes configured sources with empty visible projections` verifies source mutation detection, not retention of the empty projection's identity.

## Verified Mechanical Behavior

- All 10 nominated tests pass. Changed current or earlier source text, changed config, source-binding overrides, missing required fields, missing premise/license quotes, and mismatched manifest hashes are rejected in the tested fixtures.
- Every configured source is collected before section filtering and checked on later commands. The zero-visible-unit source mutation test passes.
- Historical version-1 `next` is rejected without changing its state bytes; historical `record` is rejected. `init` uses exclusive creation, and historical `summary` contains no writes. Extraction output directories are created without overwrite in both nominated writers.
- Current verdict logic requires both dimensions for overall PASS, requires overall FAIL when either dimension FAILs, and now requires explanation-act FAIL when any move FAILs. The synthetic move FAIL / act UNKNOWN / overall UNKNOWN record is rejected. The initial snapshot lacked that last check; it is no longer a finding against the final hash.
- Separate scientific and explanation-act records are required. Scientific demand quotes bind to the current unit; premise and context-license quotes bind to the acquired prefix. Act records separately demand proposition status, act/presupposition, first-pass signal, context relevance, realization alternative, signal change, content preservation, active question, and cumulative effect.
- Both nominated extraction writers emit the `source`, `sha256`, and `projectionSha256` names consumed by runner initialization. Absolute extraction source paths resolve correctly in the test. Full extraction execution was not run because it would load modules outside the authorized reading packet.

## Language-Act Acceptance Limits

The canonical rubric correctly distinguishes scientific support from first-pass uptake, presupposed reader stance, prominence, timing, continuity, repetition, and materially different realizations with scientific coverage held fixed. It explicitly rejects negation counting, affirmative paraphrase as certification, and truth-based exemption for caveats. The runner imposes no polarity ban and accepts the located domain-condition fixture.

These are accountable record requirements, not semantic verification. A nonempty `first_pass_signal`, `why_here`, or `content_preserved` string can still be wrong; a quoted prefix can still be irrelevant; an alternative can still fail to preserve scientific content. The rubric assigns the coordinator inspection/adjudication of comparisons. None of the nominated scripts implements that semantic adjudication or verifies actual reviewer isolation/launch history. Their absence cannot be interpreted as a semantic PASS. This review makes no claim that any manuscript meets the language-act contract.

Coverage limits: inspected only the authorized packet and synthetic cases; did not inspect extraction implementation, note configuration, manuscripts, accepted reviewer records, production orchestration, launch records, or actual independent-reader execution. File/state tampering, concurrent command writes, crashes during state writes, and operating-system access enforcement were not assessed. The result applies only to the hashes above.
