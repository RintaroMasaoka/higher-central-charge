import assert from 'node:assert/strict';
import { extractReviewBody } from '../lib/extract-review-body';
const sample = String.raw`# Heading
Before $u_1$.

<details open>
<summary>Visible $s$</summary>

SECRET_OUTER
<details><summary>SECRET_INNER_TITLE</summary>

SECRET_INNER
</details>
</details>

After.

$$
a=b
$$

\`\`\`math-hint
SECRET_HINT
\`\`\`

\`\`\`math-steps
lhs: Q
note: SECRET_STEP
part rhs: x+y
---
popup-math: SECRET_POPUP
part rhs: z
\`\`\`

\`\`\`equation
id: result
E=mc^2
\`\`\`

| A | B |
|---|---|
| $x$ | $y$ |

![Diagram](/diagrams/test.svg)
[Claim][source]
[source]: /6-1#ref-result

\`\`\`text
<details>literal</details>
math-hint
\`\`\`
`.replaceAll('\\`', '`');
const result = extractReviewBody(sample);
assert.ok(!result.markdown.includes('SECRET_'));
for (const visible of ['Before', 'After', 'Visible', 'u_1', 'a=b', 'Q = x+y', '= z', 'E=mc^2', 'eq-result', '/diagrams/test.svg', '/6-1#ref-result', '<details>literal</details>']) {
  assert.ok(result.markdown.includes(visible), visible);
}
assert.ok(result.markdown.indexOf('Before') < result.markdown.indexOf('Visible'));
assert.ok(result.markdown.indexOf('Visible') < result.markdown.indexOf('After'));
assert.ok(result.markdown.includes('| A'));
assert.equal(result.removed.disclosures, 1);
assert.equal(result.removed.mathHints, 1);
assert.equal(result.removed.stepPopups, 2);
assert.throws(() => extractReviewBody('```math-steps\nunknown\n```'), /malformed/);
assert.throws(() => extractReviewBody('```math-hint\norphan\n```'), /Unattached/);
console.log('Review extraction passed: hidden content, visible formulas, nested disclosures, code, tables, images and references.');

const linked = extractReviewBody('Opening paragraph.\n\nLater [conclusion][later].\n\n[later]: /future "HIDDEN_TITLE"');
assert.ok(!linked.units[0].markdown.includes('/future'));
assert.ok(linked.units[1].markdown.includes('/future'));
assert.ok(!linked.markdown.includes('HIDDEN_TITLE'));
