# Mechanical Paragraph Binding Review

Verdict: **NEEDS_CHANGES** for mechanical replay rebinding and freeze-history consistency. This verdict covers only paragraph release, packet/source binding, lane-specific freeze, record/evidence rebinding, input identities, and history preservation. Reviewer freshness, actual first encounter, semantic suitability, scientific correctness, and actual reviewer execution isolation remain coordinator-owned evidence.

## Method and Scope

Read only the assigned scripts, extraction library, two synthetic test files, and canonical `study-note/references/reader-review.md`. Did not inspect manuscripts, existing review records, thread history, author rationale, or previous results. Did not modify the candidate or spawn reviewers. Ran synthetic fixtures with `/Users/rintaromasaoka/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node`.

- `node --test tests/paragraph-gate.mjs`: 6 tests passed.
- Loaded `tests/review-extraction.ts` through Vite using synthetic source only: all assertions passed.
- Additional isolated fixture `/private/tmp/paragraph-binding-final-fixture.mjs` initialized a legitimate run from `First.\n\nSecond.\n`, then tested changes to persisted packet/state binding and frozen-record/event consistency. Temporary fixture inputs were removed afterward.

## Supported Findings

1. **Replay accepts packet text that is no longer source-derived if its mutable binding fields are updated.** `scripts/paragraph-integrity.mjs:40` checks current files against hashes supplied by the same state, then `:43` rebuilds expected units from `packets.json` rather than re-extracting the source. The prose count at `:45` is also trusted metadata. After legitimate initialization, the fixture replaced the first packet text with `First.\n\nIllicit second paragraph.\n`, retained `paragraphs: 1`, and updated `state.sources[0].packets_sha256`, `state.units[0].text`, and `state.units[0].text_sha256`. The source and body projection stayed unchanged; the extraction manifest stayed unchanged. `next` returned exit 0 and released both prose paragraphs. Thus canonical source-derived packet rebinding is established at initialization, but not re-established during replay. `combine-paragraph-reviews.mjs:10` uses this same validator, so combination inherits the missing rederivation check; that propagation was inspected, not separately executed in the fixture.

2. **A changed frozen record can contradict its preserved freeze event without rejection.** `scripts/paragraph-integrity.mjs:57` checks event kind and unit id but does not bind the saved event verdict to the saved record verdict. After a legitimate `next` and `record(PASS)`, the fixture changed `records[0].verdict` to `FAIL` and replaced its nonempty witness while leaving the event `{kind: record, id: a-p1, verdict: PASS}` intact. `summary` returned exit 0 and reported the replacement `FAIL`. Evidence shape and quoted locations are revalidated, but the current record is not checked against the judgment that the event claims was frozen. The code preserves history against a second `init` and against extra record identity fields; it does not establish immutable evidence history against direct edits to a persisted state.

Both witnesses require direct edits to review-side persisted inputs/state. Ordinary CLI sequencing with untouched persisted bindings passed. These are mechanical limitations of replay validation under the requested preservation/rebinding perspective, not evidence that any actual reviewer or run changed those files. Full cryptographic protection from an actor allowed to rewrite every evidence artifact is outside this review; source rederivation and record/event consistency are still independently checkable properties.

## Supported Properties

Structured extraction constructs packets from an AST, removes hidden disclosure bodies/popups, retains visible equation/table/image content and used reference definitions, rejects multi-paragraph nested prose and unparsed visible HTML, and avoids attaching media across a thematic break. The existing synthetic checks demonstrate these cases. Packet partitioning is structural; whether a particular adjacent media item is semantically attached is outside this perspective.

Initialization checks manifest source identity via real paths, source/body/packet hashes, and equality with fresh structured extraction. It creates the state with `wx`, preventing a second initialization from replacing that state. Release blocks another `next` until a record is accepted. Records reject extra lane fields, bind demand/move quotes to the current packet, bind prerequisite/context quotes to the acquired prefix, and propagate failed act moves. Replay checks source/config/projection/packet hashes, exact unit equality against the persisted packet file, record identities, quote/required-field validity, event counts/order, and completeness when combination requests it. Combination requires matching lane identities and unit projections and labels its output as coordinator combination rather than an independent verdict.

## Candidate SHA-256

```text
35554f0d6d1f8ee413efe29889e7f0a29efea6b27fdfb838d21de87e24a30e7f  scripts/paragraph-reader.mjs
67a402ba91d2ca0dd3edc1d83f2276c434f2ee0eea934e888b953c0c1d793c92  scripts/paragraph-integrity.mjs
fda146a5f349c6f60d9a49f6618069e54cd6370428d461c133c10791da4df1ff  scripts/combine-paragraph-reviews.mjs
4512101858d7351f985b3d3cf22cef7d628270418f4d5d0e1efb197cd6903d61  scripts/extract-review-body.mjs
c34549484bb9033fffc93e2d39d76142b7220b3c4a8ff99607bce76b48a4cdab  scripts/check-renderer.mjs
c07e5b405845dffeb54156cbf871f4600f73917ceec257e826816fa35d479348  lib/extract-review-body.ts
86fd2c3acc0f8ca485d09376b9c5b4cea982b703ebf70dba1252144fe2ed3205  tests/paragraph-gate.mjs
6683135269eaa6c1140d1e7af18490ec2306feb777930a9fbde0204a41c0d92e  tests/review-extraction.ts
34c085cd13e44d33912c3ec3ec1df2b2c96650cb9040c24b119e625b55f113ae  /Users/rintaromasaoka/Desktop/Skills/study-note/references/reader-review.md
```

No complete renderer check or actual manuscript projection was run because this review was restricted to synthetic fixtures. The verdict is bound to the hashes above and the sole mechanical perspective.
