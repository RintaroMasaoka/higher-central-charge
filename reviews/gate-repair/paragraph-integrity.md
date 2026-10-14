# Paragraph Gate Mechanical Integrity Review

Decision perspective: mechanical release and binding integrity only.

Verdict: **FAIL** for an unconditional mechanical gate. The ordinary serial path enforces a declared lane, one outstanding release, quoted evidence binding, and frozen external input hashes. It does not enforce all packet boundaries or run ownership requirements. Fresh reviewer identity and absence of suffix access remain **INDEPENDENT_UNVERIFIED** without coordinator launch/execution evidence, which was outside this review packet.

## Scope And Method

Read only the six implementation/test files listed below and the canonical reader-review requirements. No manuscript, existing review records, source chapters, author rationale, or history was read. Executed the existing paragraph-gate tests, the synthetic review-extraction test through Vite SSR, and additional synthetic fixtures in temporary directories. Imported implementation dependencies only as required to execute the extractor. No production extraction or check-renderer invocation was performed because those commands read configured manuscripts. No code was changed. This report is the only persistent output.

Runtime: bundled Node at `/Users/rintaromasaoka/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node`. Existing tests: 4/4 paragraph-gate tests passed; review-extraction assertions passed.

## Findings

1. **Packet size is not independently established at initialization.** `scripts/paragraph-reader.mjs:27` trusts `packet.paragraphs`. A synthetic packet with `markdown: "First.\n\nSecond."` and `paragraphs: 1`, whose manifest correctly hashes all fixture inputs, initializes and releases both prose paragraphs together. Matching hashes establish identity of supplied artifacts, not that packet metadata describes their structure. A trusted canonical extractor is therefore a necessary external assumption.

2. **The canonical splitter has unclassified prose and attachment cases.** `lib/extract-review-body.ts:77` counts Markdown paragraph nodes, while raw HTML has no counted descendants. The synthetic input `<div>\n<p>First.</p>\n<p>Second.</p>\n</div>` returns one packet containing both HTML paragraphs and `paragraphs: 0`. Whether these are rendered prose is outside the permitted renderer scope; the extractor itself does not fail closed on this case. At line 94, every zero-count node attaches: `First.\n\n```text\nSecond distinct block.\n``` ` becomes one packet, and `First.\n\n---\n\n![Later illustration](/later.svg)` attaches the illustration across a thematic break. Thus attachment is not restricted to an immediately attached equation/table/figure. Ordinary Markdown paragraph-to-paragraph separation and equation attachment passed; a multi-paragraph Markdown list is rejected rather than leaked. A trailing heading becomes a separate zero-paragraph packet, which does not leak into the prior paragraph.

3. **Stored release text can diverge from its reported binding.** `scripts/paragraph-reader.mjs:36` reads mutable state; lines 38-42 recheck external files but do not reconcile `state.units` with their frozen packets or recompute unit text hashes. In a synthetic run, changing only `state.units[0].text` to `INJECTED_SUFFIX` allowed `next` to release that string successfully with the original `text_sha256`. This requires write access to state and is not a demonstrated normal-path corruption, but establishes that state is an unaudited trust boundary. Records and release counters likewise rely on that writable state. No lock/atomic transaction protects concurrent invocations; concurrency was not tested.

4. **Lane declaration is enforced; reviewer ownership and field exclusivity are partial.** Init rejects `combined`; record rejects documented cross-lane keys (`moves` in subject, `witness` in act), and rejects overrides of the runner-owned id/lane/source/text bindings. However, arbitrary fields are spread into records at line 79. A subject record with `act_verdict: "PASS"` and an arbitrary `reviewer_id` was accepted. This is an extensible-schema risk, not a finding about the meaning of any actual record. No reviewer identity, launch identifier, no-history provenance, author exclusion, or authenticated record owner is stored/verified. A new directory and `flag: "wx"` prevent overwriting an existing initialized run, but cannot certify a fresh reviewer. Coordinator evidence must establish these requirements.

## Verified Mechanical Coverage

- One outstanding packet: a second serial `next` is rejected until a valid record is frozen.
- Source, projection, packets, and config changes after initialization are rejected.
- Manifest source path and source/projection/packet hashes are checked at initialization.
- Current evidence quotes bind to the current unit; context quotes bind only to the released prefix. A suffix quote fails.
- Act move FAIL propagates; a PASS record cannot contain non-PASS moves.
- Hidden disclosure bodies, math-hint text, step popup text, and unused link-reference definitions are absent in supplied synthetic extraction assertions.
- Declared record identity overrides are rejected; reinitializing an existing state is rejected.

## Frozen Input Hashes

SHA-256:

| File | Hash |
| --- | --- |
| scripts/paragraph-reader.mjs | a9e8fa933a0d3e331df7ff9476faee14d96ecb8615c2a67248ec4704d4d8d9db |
| lib/extract-review-body.ts | 8aab044984076aa72d190b5381e115c9b7433b854908918a030704071d3fcf38 |
| scripts/extract-review-body.mjs | 4512101858d7351f985b3d3cf22cef7d628270418f4d5d0e1efb197cd6903d61 |
| scripts/check-renderer.mjs | c34549484bb9033fffc93e2d39d76142b7220b3c4a8ff99607bce76b48a4cdab |
| tests/paragraph-gate.mjs | 3a0590528fe5fdc2b6e76bfdda7e805dbe847f54115551b53ef074476f20b08e |
| tests/review-extraction.ts | 1d2ec938aef6eb4aad1416c29e615affa763e45991eb431c6cdcb26896657667 |
| canonical study-note/references/reader-review.md | 34c085cd13e44d33912c3ec3ec1df2b2c96650cb9040c24b119e625b55f113ae |

Canonical path: `/Users/rintaromasaoka/Desktop/Skills/study-note/references/reader-review.md`.

## Specific Limits

This review does not judge prose, terminology, reader reasoning, explanation acts, figures, mathematical/scientific claims, or actual candidate coverage. It does not certify projection fidelity against the renderer, authentic reviewer isolation, actual production packets, symlink isolation, resistance to a malicious coordinator, or concurrent release safety. Full projection/packet files and future units are stored together; the canonical requirements explicitly permit instructional isolation on a shared filesystem, so their mere storage is not treated as a violation. Actual suffix access must be ruled out by auditing execution. The FAIL rests on reproduced mechanical packet/binding defects, while independence ownership remains separately unverified.
