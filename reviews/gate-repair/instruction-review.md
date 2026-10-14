# Independent Instruction and Runner Review

Verdict: **needs-changes**.

The two instruction references satisfy the requested decision contract. They require separate scientific and explanation-act judgments, reconstruct first-pass stance and salience before justifying a move scientifically, compare feasible realizations while holding content fixed, and track cumulative emphasis. They explicitly preserve nonexistence, incompatibility, counterexamples, mathematical conditions and useful contrasts. The remaining actionable findings concern the runner's accountable evidence and candidate binding.

## Findings

1. **High: initialization binds an arbitrary extracted body to an unrelated manuscript hash.** `scripts/prefix-reader.mjs:12-18` reads the manuscript and extracted body independently, then assigns the manuscript hash to units split from the body. No extraction manifest, rendered-output identity or correspondence check connects them. A stale or wrong `REVIEW_BODY_DIRECTORY` can therefore receive a current-source label and pass every subsequent source check. In a memory-backed execution of the actual runner, manuscript `real chapter` and body `Completely unrelated extracted teaching text.` initialized successfully, with the real manuscript's hash attached to the unrelated revealed unit. Require verified extraction provenance binding the input revision, rendered/extracted artifact and ordered unit identities, or generate extraction from the frozen candidate during initialization. Retain the unit-text hash, which is useful but does not prove correspondence.

2. **Medium: the scientific dimension can receive PASS without a located, source-bound premise witness.** `scripts/prefix-reader.mjs:50-51` requires only a nonempty `subject_reasoning.witness`; `:72-73` similarly accepts arbitrary notation/evidence strings. In contrast, the act dimension binds its quotes to current or acquired visible text. `reader-review.md:13` requires the exact demand and baseline/prior/current witness, reconstructed object/operation and usable inference; `:17` requires quote binding and consistency checks before advancing. A memory-backed record call accepted overall PASS with scientific witness `Invented premise that appears nowhere.` and evidence `Invented evidence`. Add a structured located subject record with the exact demanding passage and supporting quote/identity from the declared baseline or visible prefix. Do not try to certify the truth of the inference mechanically; the coordinator must still adjudicate it. The defect is absent accountable evidence, not inability to automate scientific judgment.

3. **Medium: revision checks cover the current chapter but can miss changes to the already-acquired prefix.** `scripts/prefix-reader.mjs:29-31` and `:40-41` verify only `unit.path`; `:80-81` reports summary without candidate verification. After chapter A is reviewed, modifying A while the runner continues chapter B is undetected because B's hash is still current. The recorded cumulative judgments then concern a different prefix from the final manuscript. This conflicts with `reader-review.md:3`'s unchanged-candidate condition and `:19`'s verified unchanged entry prefix. Verify all candidate source identities before each reveal/record or at minimum reject final acceptance when any frozen input differs; include extraction/config identity where they affect the visible route. Checking the current chapter alone is not enough.

## Instruction Assessment

- Future decision behavior is changed at the appropriate level: truth is necessary but does not authorize an utterance's force, position or prominence (`explanation-acts.md:3,14-22,26-30`). A scientifically necessary caveat receives the same act judgment as other moves.
- The rubric does not overfit to negative wording. It allows scientifically meaningful negative results and beneficial distinctions, while rejecting unsupported affirmative reader instructions as well (`:30`). Proposed repairs include retention, combining and relocation, so removal is not an automatic preference (`:32`).
- The reasoning applies to other scholarly teaching subjects: its operative units are propositions, premises, operations, scope, reader stance and sequencing rather than vocabulary from one physics topic.
- Proportionality is broadly appropriate: inspect consequential or suspect moves, and require located effects rather than a generic tone complaint. The runner requires at least one act record in every unit and a comparison for every recorded move, whereas the explanatory reference limits comparison to contested moves. This is a modest additional workflow cost, not a demonstrated correctness failure; document the structured-runner convention if retained.
- Prior-run preservation is implemented by exclusive initialization (`flag: 'wx'` at `:22`). The current runner also rejects reviewer-supplied source identity fields (`:42`) and prevents overall PASS when either dimension is non-PASS (`:70-71`).
- Isolation and semantic enforcement limits are candidly stated (`reader-review.md:9,17,21`). Shared filesystem access is instructional isolation; code cannot establish a fresh reviewer, audit undisclosed accesses, judge a comparison's adequacy or discover omitted consequential moves. Those remain coordinator obligations.

## Method and Limits

Read the blind-check skill and the three target artifacts only. Did not consult authoring rationale, prior review/trial reports or task history. No recursive delegation or target edits. Used static contract-to-code comparison and two focused memory-backed executions of the actual runner with mocked filesystem calls; no project review state was mutated. The executions establish the acceptance paths described in findings 1 and 2, not end-to-end UI extraction fidelity or a complete scholarly-note review. Finding 3 follows directly from the paths read in reveal, record and summary; it was not separately executed.

The runner changed during the initial inspection. This verdict concerns the final observed revision below; an earlier metadata-overwrite concern is absent from that revision and is not an outstanding finding.

Reviewed SHA-256 identities:

- `reader-review.md`: `26d2e06389493d5fceef68af4a234c90cb9a0d61c05578f78a031a93510158d5`
- `explanation-acts.md`: `9a0d1fda22e2a4e59c5a5029ef389d15b4449e621efef66e8422dac7ccdb8631`
- `prefix-reader.mjs`: `adbfcbcf50b4df8bf99ce4054f86a7e6dd5a1523ad4baadcb54f05b939cc72c2`
