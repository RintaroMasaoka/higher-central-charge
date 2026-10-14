# Mechanical Paragraph Gate Acceptance

Perspective: mechanical paragraph release, same-lane freeze order, evidence binding, and coordinator combination only.

Verdict: **PASS within the declared mechanical scope.** No blocking mechanical defect was found in the inspected frozen candidate. This verdict does not accept scientific content, reader understanding, explanation acts, terminology, visual relations, or manuscript production.

## Candidate Identity

SHA-256 hashes observed on 2026-10-14:

| Assigned file | SHA-256 |
| --- | --- |
| `scripts/paragraph-reader.mjs` | `35554f0d6d1f8ee413efe29889e7f0a29efea6b27fdfb838d21de87e24a30e7f` |
| `scripts/paragraph-integrity.mjs` | `4169b136b717f1682f540043d7dd3b8e139c133157902f3e7b9209cbca4065a4` |
| `scripts/combine-paragraph-reviews.mjs` | `fda146a5f349c6f60d9a49f6618069e54cd6370428d461c133c10791da4df1ff` |
| `scripts/extract-review-body.mjs` | `4512101858d7351f985b3d3cf22cef7d628270418f4d5d0e1efb197cd6903d61` |
| `scripts/check-renderer.mjs` | `c34549484bb9033fffc93e2d39d76142b7220b3c4a8ff99607bce76b48a4cdab` |
| `lib/extract-review-body.ts` | `c07e5b405845dffeb54156cbf871f4600f73917ceec257e826816fa35d479348` |
| `tests/paragraph-gate.mjs` | `158b10b15c9e2d5e7b88dde36cc2d9f0727f69d6a2d8d068c66eb04cdc7b1488` |
| `tests/review-extraction.ts` | `6683135269eaa6c1140d1e7af18490ec2306feb777930a9fbde0204a41c0d92e` |
| canonical `study-note/references/reader-review.md` | `34c085cd13e44d33912c3ec3ec1df2b2c96650cb9040c24b119e625b55f113ae` |

The canonical reference read was `/Users/rintaromasaoka/Desktop/Skills/study-note/references/reader-review.md`. Other relative paths in this report are relative to `Higher-central-charge`.

## Methods And Coverage

Read exactly the assigned implementation, tests, and canonical reference. Did not read manuscripts, existing review records, task history, author rationale, or discover additional project sources. No candidate code was edited. Synthetic fixtures were created in temporary directories and removed after execution.

Used bundled Node `/Users/rintaromasaoka/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node` from the project directory.

1. Ran `node --test tests/paragraph-gate.mjs`: seven tests passed, zero failed. The tests cover successive reveal refusal until recording, disallowed mixed-lane fields, invalid lane selection, inconsistent packet paragraph counts, act context quote binding and FAIL propagation, changes to source/projection/packets/configuration, initialization overwrite refusal, injected record identity fields, packet text changes, saved evidence revalidation, structured packet rederivation, and record-event verdict disagreement.
2. Loaded only `/tests/review-extraction.ts` through an isolated Vite SSR server with `configFile:false`: passed. Coverage includes closed disclosures, visible formulas, hidden math hints/popups, references, local image references, one-paragraph packets, equation attachment, rejection of multi-paragraph list units and unparsed HTML, and media separation across a thematic break.
3. Ran an additional synthetic integration fixture through the actual reader and combination CLIs. Its first packet contains exactly one prose paragraph with an attached equation and local image reference; the second contains another prose paragraph. Both lanes were initialized separately, each current judgment was recorded before its next reveal, and the completed combination returned two PASS results.
4. In that synthetic completed fixture, combination rejected eight independent invalid mutations: missing subject witness, unseen demand quote, record text hash mismatch, record source hash mismatch, record lane mismatch, changed verdict event, changed reveal-event unit identity, and changed packet text. A coherent UNKNOWN record and event produced an overall UNKNOWN for that packet.

`check-renderer.mjs` was inspected but not run because its normal path reads configured manuscripts and emits full projections. Rendering and actual manuscript projection equivalence are outside this assignment.

## Supported Findings

- Structured source extraction is rederived at initialization and through `validateState` during replay and combination. Rehashing a changed packet file and its state metadata alone does not bypass its comparison with the source-derived projection.
- The extractor counts nested prose paragraphs, rejects packets exceeding one, and attaches immediately following equations, tables, and image-only paragraphs. Release carries the derived packet text and source/text identities.
- The CLI requires exactly one lane and freezes its record before allowing the next reveal. Top-level record fields from another lane or injected identity fields are rejected. Saved records are revalidated rather than accepted solely because JSON exists.
- Quote binding checks current-unit demand/move quotes and available-prefix premise/context quotes. Mechanical field presence and act verdict propagation are checked. Source/configuration/projection/packet identities, reconstructed units, record identities, release order, and event verdicts are checked on subsequent operations.
- Combination independently validates both complete lanes, checks lane assignment and identical packet projections, records lane-state hashes, and propagates FAIL/UNKNOWN. It labels its output as coordinator combination rather than an independent verdict.

## Limits

Freshness and actual execution access remain coordinator-observed conditions. JSON cannot establish a no-history launch, prevent filesystem discovery, prove that the reviewer did not see a suffix, or assess the sincerity or meaning of its evidence. This review used a fresh assigned mechanical perspective; the coordinator must retain the launch and access record for that claim.

The state files are ordinary mutable JSON, not authenticated append-only evidence. Their checks detect the tested inconsistencies against retained authoritative inputs and events. They do not authenticate against a party coherently replacing all authoritative sources and metadata, and no hostile whole-authority replacement defense is accepted here. Valid text fields and bound quotations do not certify semantic interpretations or immutable provenance against an authorized coherent rewrite.

The synthetic PASS records are intentionally mechanical fixtures, not independent subject or explanation-act judgments. Actual scientific, reader, rhetorical, naming, visual, and production acceptance remains unverified by this report.
