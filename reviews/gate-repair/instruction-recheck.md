# Independent Instruction Recheck

Verdict: **needs-changes**.

Reviewed the frozen runner, both extraction entry points, focused gate tests, extraction implementation/tests, and the current Study-note reader-review and explanation-acts instructions. This reviewer received an isolated packet, did not read manuscript content, prior reviews, authoring/trial outputs, or task history, received no author follow-up, and did not delegate. No live review state was changed.

## Findings

1. **Historical runs remain writable through `next`.** `scripts/prefix-reader.mjs:35` permits a version-1 state to enter the reveal branch; lines 41–43 change `revealed`, append an event, and rewrite its state. Only `record` has the historical-version rejection at line 47. A temporary version-1 fixture with an unrevealed unit returned status 0 from `next`, with `revealed: true` and one new event. This contradicts the requirement to preserve historical runs. Reject mutating commands on historical state before any writes; keep read-only historical summary access. Add a test asserting byte-for-byte preservation on rejected historical `next`, including an already completed historical run.

2. **The standalone extraction entry point produces manifests the runner rejects for relative configuration paths.** `scripts/extract-review-body.mjs:16` records `source: resolve(sourcePath)`, whereas `scripts/prefix-reader.mjs:16` requires literal equality with `chapter.file`. `scripts/check-renderer.mjs:22` instead records the configuration's path string. The two supplied extraction routes therefore have different interoperability contracts. A temporary fixture with `chapter.file: "unit.md"`, the identical source digest and projection digest, and the standalone extractor's absolute source spelling failed initialization with `Extraction provenance mismatch: test`. Compare canonical source identities on both sides, or document and enforce one common manifest path convention. Preserve the source and projection hash checks. Test both entry-point conventions through initialization.

## Coverage And Limits

The instruction changes address the requested decision process: scientific reasoning and explanation acts have separate verdicts, acts require located quotations, presupposition, first-pass signal, current relevance, a realization comparison, and cumulative effect. Overall PASS cannot override a failed dimension. Negative mathematical content is explicitly preserved by the rubric; the code has no polarity or negation-count rejection. This is a proportionate evidence schema, subject to coordinator interpretation.

Source and projection hashes are checked at initialization; configuration and every stored source are checked on subsequent version-2 commands. Located demands must occur in the current unit, and premise/context quotations must occur in the acquired prefix. Existing tests exercise these safeguards. They do not certify the mathematical support, relevance of a quotation, fidelity of a comparison, or the communicative effect of prose. The rubric correctly assigns semantic adjudication to the coordinator.

The runner's acquired prefix contains projected chapter text only. A supported reader baseline and already-read entry material are not represented or bound in its state. Consequently a premise available only in the supplied baseline cannot directly satisfy `subject_reasoning.premise_quote`; a genuinely absent premise or absent act license also has no explicit structured missing-evidence form. This remains a portability/recording limitation: an external packet may supply baseline authority, but records need to distinguish that authority from a manuscript quote, and FAIL/UNKNOWN should be able to locate the demand while expressly recording unavailable support. I did not test a live coordinator protocol or infer that this external protocol is absent.

Reviewer execution isolation remains instructional. The runner contains all future units in its state, does not launch a reviewer, and does not audit its filesystem/tool access. The current instructions disclose this boundary and require launch/execution auditing. No independently audited manuscript reader run, actual first-pass interpretation, or semantic acceptance is certified by this code review.

Projection code uses the note's structured plugins and parsers, retaining visible disclosure summaries, formula steps, equations, tables, images and reference identities while excluding hidden material. Review units in the runner are heading-delimited sections rather than the extractor's finer units; paragraph-level first-use order inside a revealed section therefore depends on the reviewer following the rubric. The focused extraction tests cover synthetic examples; renderer parity across every supported authored construct and visual prominence was not established here.

## Verification

All 8 tests in `tests/reader-gate.mjs` passed using the bundled Node runtime. Two additional temporary-fixture checks reproduced findings 1 and 2. Fixtures were created under the system temporary directory and removed. The shell's default PATH had no `node`; the bundled runtime resolved that environment limitation. Neither extraction entry point was run against the manuscript. No semantic certification follows from passing the mechanical tests.

## Source SHA-256

```text
1cca0cca16c973d4bdc09883e49c76fbe5e11100db217d5cfdf1cbeb16e476f9  scripts/prefix-reader.mjs
e6460a3bb8b300c870e0550c0d9a6ab806e241b7337c78e64e332b106b77ec5d  scripts/check-renderer.mjs
f80c9e6f2b2dfa71cc51179f3f0b0dd34b5268fe3c59bfe037043208e88d7111  scripts/extract-review-body.mjs
5d073130475160b74c45f8bbe3f40fc37899fc2c1f95f95c38457821a6ee8189  tests/reader-gate.mjs
7d093906b4d10663652011aa9acd46a23f94cd1d7b441a738c2e3e4e5a2c26be  lib/extract-review-body.ts
14bf01ae74afc51269746acae18c226cd194301e2af0dac0885906b7eca1ddc3  tests/review-extraction.ts
26d2e06389493d5fceef68af4a234c90cb9a0d61c05578f78a031a93510158d5  /Users/rintaromasaoka/Desktop/Skills/study-note/references/reader-review.md
9a0d1fda22e2a4e59c5a5029ef389d15b4449e621efef66e8422dac7ccdb8631  /Users/rintaromasaoka/Desktop/Skills/study-note/references/explanation-acts.md
```

## Focused Repair Recheck

Verdict for the two previously reproduced implementation defects: **pass-with-notes**. This is an ordinary focused recheck by the same reviewer, not a second blind verdict. The blind-check isolation contract requires a fresh reviewer for a revised candidate; this reviewer has now received an author-side repair follow-up. The original report and original source binding remain intact above.

Current `scripts/prefix-reader.mjs:30` rejects historical mutation before the reveal branch. Repeating the original populated historical-unit fixture now rejected `next` and preserved state byte for byte. A separate `summary` invocation succeeded without changing that historical state.

Current `scripts/prefix-reader.mjs:17` compares canonical real paths while retaining both digest checks. Repeating the absolute-manifest/relative-config fixture now initialized successfully. This resolves the demonstrated mismatch, including canonical filesystem path aliases; no manuscript extraction or live-state access was required.

All 9 current focused gate tests passed. The new regression test uses an empty historical state; the additional populated fixture checks the actual previously mutating reveal path. No new defect was found in these repairs. The baseline/missing-evidence recording, instructional isolation, paragraph timing and semantic-certification limits stated above remain outside these mechanical repairs. A fresh independent reviewer is required for any newly claimed blind acceptance of the revised implementation.

Rechecked source SHA-256:

```text
20f2f737dfe50cd9b88d3e1de57a5a0d9b584dcd31d00aefa187f4f0b62917b2  scripts/prefix-reader.mjs
e3241a3688d3dd5b1df60002e4d84eba15d7336aeff6eb9dd71e130206d85a6b  tests/reader-gate.mjs
```
