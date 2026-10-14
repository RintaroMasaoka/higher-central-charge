# Bounded Reader Review M

## Method and Limits

Governing rubric: only `before/skill/reader-review.md` and `before/skill/explanation-acts.md`. Task baseline and identities: `trials/tasks.json`. A uses only the supplied `original-overview.md` as prior-visible prefix; B starts independently with no prefix. Records below are in source order; a later paragraph is not used to license an earlier passage. No manuscript edits, project/source discovery, prior reports, other instruction versions, external source retrieval, or recursive reviewers were used.

The permitted extracted files were delivered in a single read. Thus this is an ordinary source-order review, not a tool-enforced one-unit-at-a-time reveal. The reviewer cannot independently inspect the launch record to verify `fork_turns: none`. The strict independent gate is consequently **INDEPENDENT_UNVERIFIED**; the coordinator must assess the launch and execution evidence. Findings remain bounded local diagnoses. Diagram review covers the supplied caption and structural role only; pixel inspection is outside this trial. No whole-website acceptance or verification against the cited paper is claimed. Subject verdicts concern reconstructible reasoning in the packet, not external provenance certification.

## Task A

Overall: **FAIL**. Subject/prerequisite: **FAIL** at A4. Explanation acts: **FAIL** at A6. Neither is cured by later material.

### A1: `original-observable.md:3–15`

- Demand and witness: `L/n`, `T_A`, and vacuum `1` are available through the local geometry and the prefix's vacuum convention. The expectation value uses a normalized ground state, consistent with the prefix and the usual meaning of a state expectation.
- Content and act: define an A-only translation, distinguish the partition from a new physical edge, select the vacuum sector, and define its overlap. The caption and preceding phrase “円筒を…切り” license the immediate clarification “実際に切って…端を作る操作ではない”: two operations are materially competing at this point.
- Resolution and return: reader can specify which subsystem moves, recognize two different boundaries, and form the overlap. Unitarity supplies the bound; the lattice restriction makes the operation realizable.
- Comparison: removing the physical-cut distinction would leave the locally introduced “切り” ambiguous and obscure why only one existing physical edge enters. No pixel claim is made.
- Subject **PASS**; explanation act **PASS**.

### A2: `original-observable.md:19–44`

- Demand and witness: the trace identity requires A-only action, given at lines 3 and 19. “B に作用する単位行列を先にトレース” states the required contraction. Orthogonality and normalization of the displayed Schmidt factors supply the diagonal reduced state.
- Content and act: convert the overlap to a reduced-state trace and then to a probability-weighted sum. “エニオンや CFT の仮定を要しない” scopes a mathematical identity in a text whose prefix invokes a CFT approximation; it establishes the boundary of that approximation.
- Resolution and return: the reader can reconstruct the trace contraction and sum `lambda_alpha^2 <alpha|T_A|alpha>`.
- Comparison: omission of the exactness statement would preserve the algebra but lose the explicit division between kinematics and the later model. It is short and attached to the identity whose scope it determines.
- Subject **PASS**; explanation act **PASS**.

### A3: `original-observable.md:48–59`

- Demand and witness: simultaneous momentum choice is explicitly assumed. Translation sign, distance, `hbar`, and the relation `K=pL/(2pi)` are locally given.
- Content and act: specialize the trace to momentum eigenstates and translate distance to angle. The two parameterizations license the unit correspondence; this does not presume a reader mistake.
- Resolution and return: the reader obtains the weighted phases and can infer cancellation. The closed disclosure heading asks a check computable from the visible sum; no hidden answer is needed.
- Subject **PASS**; explanation act **PASS**.

### A4: `original-observable.md:63–74`

- Demand: “左右のエッジ自由度を結合して、ギャップのある内部を作る…では、一方をトレースすると…熱密度行列の形になる.” The claimed coupling-to-thermal reduction needs the particular entangled-state weights, or an explicit assumption specifying them.
- Available witness: preceding paragraphs supply only a general Schmidt spectrum `lambda_alpha^2`. Basic linear algebra permits arbitrary normalized nonnegative weights. Coupling two edges and opening a gap does not by itself identify those weights as `exp(-beta E_alpha)/Z` for the edge CFT Hamiltonian.
- Object and operation: partial trace is available; the relation identifying its spectrum with CFT Boltzmann weights is unavailable. The product approximation at lines 65–74 identifies the proposed model and its two Hamiltonians, but is not a derivation of the causal “すると” at line 63. Line 76 is not counted retroactively.
- Act and return: the passage usefully shifts from an exact trace to a low-energy model, explains separated boundaries, and distinguishes effective inverse temperature from actual heating. “熱密度行列” makes that temperature distinction locally relevant. The communicative goal is licensed; the missing subject relation remains.
- Comparison: a realization that makes thermal reduction an explicit additional model assumption would preserve the planned evaluation and remove the unsupported inference from gap opening alone. No replacement prose is supplied.
- Subject **FAIL**; explanation act **PASS**. This is a reasoning/assumption-availability finding, not an externally established contradiction of the paper's cut-and-glue treatment.

### A5: `original-observable.md:76`

- Demand and witness: preceding exact trace and approximate CFT product make the scope of the approximation consequential. The paragraph states that CFT perturbations are neglected and assigns physical-assumption status to the model.
- Content and act: delimit the approximation. “厳密な等式ではなく” contrasts with the exact identity already established at line 26, so the distinction has a visible license and usable consequence.
- Resolution: reader can classify subsequent CFT evaluation as approximate. The external claims about the paper and numerical comparison remain unverified in this packet.
- Comparison: removing the status statement would leave the model's applicability less determinate. This qualification adds a relation, rather than repeating the effective-temperature clarification.
- Subject **PASS** for the stated model status, external provenance unverified; explanation act **PASS**. A4 remains frozen.

### A6: `original-observable.md:78–84`

- Demand and witness: `xi_l=v beta_l` and `xi_r=v beta_r` define thermal lengths. Low/high-temperature selection is intelligible; the `n^2` modular condition is explicitly announced as next-chapter coverage, not derived here. Its derivation is outside the supplied unit.
- Content and act: specify the next evaluation regime, then warn that `xi_r` is not unconditionally the microscopic bulk correlation length. Evidence: “微視的な内部の相関長と無条件に同じものではない.”
- Available license: no bulk correlation length, substitution using it, or competing length prescription has been introduced. The immediately preceding “CFT の有効温度を長さに換算した量” already fixes this symbol's role. The text supplies neither a relation between the two lengths nor a condition deciding whether they coincide.
- Resolution and continuity: the condition tells the reader which parameters to compare. The final warning then redirects attention to an unintroduced comparison and asks the reader to avoid an inference the visible path has not requested. It adds no usable criterion for checking the inequality.
- Comparison: omission of that final warning preserves the definition, inequality, model scope, and promised modular calculation. A substantive relation or substitution rule would give the comparison a purpose, but none is present. This finding is about the act and placement, not a claim that the two lengths must coincide.
- Subject **PASS** for the definitions and explicitly deferred regime statement; modular derivation and microscopic-length relation unverified. Explanation act **FAIL**.

## Task B

Overall: **FAIL**. Subject/prerequisite **PASS**; explanation acts **FAIL** at B1.

### B1: `interval-note.md:3`

- Content: endpoint values do not determine the image of every function. Subject **PASS** as a valid general limit of endpoint-only evaluation, accessible to the stated quadratic-function baseline.
- Act: “まず、端点だけを使う方法に頼ってはいけない” begins by prohibiting a strategy. It presupposes a proposed strategy or a reason to guard against it before the function, interval, or actual range problem appears.
- Available license: the title gives range and injectivity as the subject; the baseline gives high-school quadratic knowledge. Neither supplies an actual endpoint-only proposal or a competing procedure at this point. The following example is not used retroactively.
- Resolution: “一般の関数に通用する万能な方法ではない” rejects universality but supplies no positive procedure for this as-yet-unspecified problem. The opening moves attention to an imagined error before establishing the subject operation.
- Comparison: beginning with the example would retain all required range and injectivity content, including the later endpoint/vertex comparison. The universal warning's deletion loses no required inference in this bounded task.
- Explanation act **FAIL**.

### B2: `interval-note.md:5`

- Demand and witness: the interval and square map are defined before evaluation. Endpoint values, the attained vertex value, and decrease/increase across zero are correct.
- Act and return: evaluate the example and establish that every value from zero to four occurs. The high-school quadratic baseline supplies continuity of the graph; its two branches support `image=[0,4]`. The endpoint-versus-interior comparison is locally relevant because the values are now actually computed.
- Subject **PASS**; explanation act **PASS**. B1 remains frozen.

### B3: `interval-note.md:7`

- Demand and witness: preceding decrease/increase establishes nonmonotonicity and the interior vertex. The paragraph converts this into the procedure for the displayed quadratic interval.
- Act and return: direct attention to endpoints and vertex when locating image endpoints. The negative “単調ではない” reports the demonstrated structure and determines which candidate extrema to use; it is not an unsupported correction.
- Comparison: deleting the paragraph would retain the answer but remove the reusable quadratic-extrema procedure. Its retention has a distinct instructional return.
- Subject **PASS**; explanation act **PASS**.

### B4: `interval-note.md:9`

- Demand and witness: the inverse-uniqueness question is stated before introducing injectivity. Both `-1` and `1` belong to the given domain and square to one.
- Act and return: use a concrete collision to reject injectivity. The rejected proposition is that each attained output has a unique input; the displayed collision decides it. The reader can distinguish image determination from input uniqueness.
- Subject **PASS**; explanation act **PASS**.
