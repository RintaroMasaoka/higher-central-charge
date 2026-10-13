import React from 'react';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import { parseFragment, type DefaultTreeAdapterMap } from 'parse5';
import { MathMarkdown } from '../components/math-markdown';

type Node = DefaultTreeAdapterMap['node'];
function find(node: Node, tag: string): DefaultTreeAdapterMap['element'][] {
  return [ ...('tagName' in node && node.tagName === tag ? [node] : []),
    ...('childNodes' in node ? node.childNodes.flatMap(child => find(child, tag)) : []) ];
}
const text = (node: Node): string => 'value' in node ? node.value : 'childNodes' in node ? node.childNodes.map(text).join('') : '';
const html = (source: string) => renderToStaticMarkup(<MathMarkdown>{source}</MathMarkdown>);
const source = String.raw`# Heading $h^2$

Body $b$.

$$
d = 2
$$

| Column |
| --- |
| Cell $t$ |

[Link $l$](https://example.com)

<details id="outer" open>
<summary class="title">Outer $s$</summary>

- List item

  <details id="inner">
  <summary>Inner $i$</summary>

  Content $c$.

  </details>

> <details>
> <summary>Quote $q$</summary>
>
> Quoted body $v$.
>
> </details>

</details>

Inline code ` + '`$literal$`' + '\n\n```text\n$code$\n```';
const output = html(source);
const tree = parseFragment(output);
for (const tag of ['h1', 'td', 'a', 'summary']) {
  assert.ok(find(tree, tag).length, tag);
  for (const element of find(tree, tag)) assert.ok(find(element, 'math').length, `${tag}: ${text(element)}`);
}
assert.equal(find(tree, 'summary').length, 3);
const outer = find(tree, 'details').find(n => n.attrs.some(a => a.name === 'id' && a.value === 'outer'))!;
assert.ok(outer.attrs.some(a => a.name === 'open'));
assert.equal(find(outer, 'details').length, 3);
assert.equal(find(find(tree, 'li')[0], 'summary').length, 1);
assert.equal(find(find(tree, 'blockquote')[0], 'summary').length, 1);
assert.ok(find(tree, 'a')[0].attrs.some(a => a.name === 'href' && a.value === 'https://example.com'));
assert.ok(find(tree, 'math').some(n => text(n).includes('d = 2')));
for (const literal of find(tree, 'code')) {
  assert.equal(find(literal, 'math').length, 0);
  assert.match(text(literal), /\$(literal|code)\$/);
}
assert.equal(find(tree, 'code').length, 2);
for (const Tag of ['span', 'button'] as const) {
  const compact = parseFragment(renderToStaticMarkup(<Tag><MathMarkdown inline>{'Label $x^2$'}</MathMarkdown></Tag>));
  assert.equal(find(compact, 'p').length, 0);
  assert.equal(find(compact, 'math').length, 1);
  assert.ok(text(compact).includes('Label'));
}

const config = JSON.parse(readFileSync(new URL('../note.config.json', import.meta.url), 'utf8'));
for (const chapter of config.chapters) {
  const rendered = html(readFileSync(new URL('../' + chapter.file, import.meta.url), 'utf8'));
  assert.ok(!rendered.includes('katex-error'), chapter.id);
}
console.log('Math rendering passed: common prose/heading/table/link/disclosure/code syntax and all configured chapters.');
