# Paragraph Release Mechanical Acceptance

Verdict: FAIL for the frozen candidate below.

Perspective: mechanical integrity of paragraph release/freeze and lane binding only. This does not certify scientific, rhetorical, naming, visual, or actual reviewer-freshness acceptance. Reviewer freshness requires coordinator-owned launch and execution evidence; a JSON label cannot establish it.

## Findings

1. `scripts/paragraph-reader.mjs:44` rechecks saved unit text against a hash stored beside that text, but does not reconstruct the units from the unchanged, hash-checked packet file. The source, configuration, projection, and packet file checks therefore do not bind the current `state.units` to those inputs after initialization. In a synthetic run, valid initialization was followed by replacing the first state unit with `Replacement one.\n\nReplacement two.\n` and updating only that unit's text hash. `next` exited 0 and revealed both prose paragraphs. The original source, configuration, projection, packet file, and manifest stayed unchanged. This violates the one-prose-paragraph release and source-to-packet binding requirement if state files are accepted as review evidence without externally authenticated custody.

2. `scripts/combine-paragraph-reviews.mjs:9` through line 24 does not revalidate unit text hashes, source-to-unit reconstruction, lane-specific evidence schemas, quote binding, move verdict propagation, or the saved record-event verdict. It checks paired identifiers/hash strings and alternating event labels. The same synthetic fixture, with matching subject/act unit arrays, records containing only binding fields and `verdict: PASS`, and alternating reveal/record labels, exited 0 and produced `{ PASS: 2, FAIL: 0, UNKNOWN: 0 }`. Thus the combination can describe unbound packets and evidence-free lane records as PASS. Equality of both lane arrays does not establish their equality to the canonical extracted packets.

These are integrity findings about the accepted evidence boundary, not claims that real coordinator records were altered. If authenticated exclusive custody of state files is an external prerequisite, that prerequisite must be established by the coordinator; this code alone does not establish it.

## Coverage

- Initialization: real source path and source/projection/packet SHA-256 checks, plus exact equality to newly structured extraction, were inspected. The one-paragraph count is derived from parsed structure at initialization, not trusted on its own. PASS for this path.
- Extraction: parsed prose paragraphs are counted recursively; nested multi-paragraph list content and unparsed visible HTML are rejected; immediately following math/table/image nodes remain local; intervening separators/code split packets; unused reference destinations are not released in earlier units. Existing synthetic extraction assertions passed.
- Ordinary serialized release: a second `next` is blocked while the current unit is revealed; a valid same-lane record increments the cursor and unlocks the next unit. Existing synthetic tests passed.
- Lane fields and quote binding at `record`: distinct top-level subject/act fields, current-unit quotes, acquired-prefix context quotes, and act move FAIL/UNKNOWN propagation are checked. Existing negative tests passed. Interpretation of field content was not reviewed.
- Frozen inputs: ordinary changes to source, configuration, projection, packet file, and unit text without its saved hash are rejected. Existing negative tests passed. Self-consistent changes to state units are not rebound to canonical packets: FAIL.
- Combination: equal lane units, per-position identifiers/hash strings, completion count, and alternating event labels are checked. Canonical packet and evidence revalidation are missing: FAIL.
- Actual reviewer freshness, launch isolation, source access, and actual manuscript release execution: NOT REVIEWED; coordinator-owned evidence is required.

## Verification

Runtime: `/Users/rintaromasaoka/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node`.

`node --test tests/paragraph-gate.mjs`: 5 tests passed, 0 failed. `tests/review-extraction.ts` executed through a synthetic Vite SSR loader and passed. A separate temporary-directory synthetic probe reproduced both findings. Temporary fixtures were removed. No manuscript, existing review report, history, or additional source discovery was read; no candidate code was edited.

## Frozen File Hashes

SHA-256:

```text
177d4330dbd9cc518b4e8f9ff26d09d541199882e29fbf26b2d008a9f02531b6 scripts/paragraph-reader.mjs
c07e5b405845dffeb54156cbf871f4600f73917ceec257e826816fa35d479348 lib/extract-review-body.ts
4512101858d7351f985b3d3cf22cef7d628270418f4d5d0e1efb197cd6903d61 scripts/extract-review-body.mjs
c34549484bb9033fffc93e2d39d76142b7220b3c4a8ff99607bce76b48a4cdab scripts/check-renderer.mjs
5e0e4cbed24d416082da8ee0caf5515f891f47e4d678a46b3acdcba02e9eb649 scripts/combine-paragraph-reviews.mjs
005b0d728b5c092fca85e223120fa69c2c4a1ca16a6043cecaa58a68e4a87279 tests/paragraph-gate.mjs
6683135269eaa6c1140d1e7af18490ec2306feb777930a9fbde0204a41c0d92e tests/review-extraction.ts
34c085cd13e44d33912c3ec3ec1df2b2c96650cb9040c24b119e625b55f113ae /Users/rintaromasaoka/Desktop/Skills/study-note/references/reader-review.md
```

## Limits

This is a code-integrity decision from the specified files and synthetic fixtures. It does not authenticate coordinator custody or reviewer identities, verify real release histories, assess reader verdicts, or certify scientific correctness, explanation acts, terminology, manuscript appearance, or hidden-source rendering fidelity. The passing tests cover the normal serialized runner path and selected negative cases, not concurrent writes or every malformed state.
