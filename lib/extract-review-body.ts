import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { toMarkdown } from 'mdast-util-to-markdown';
import { mathToMarkdown } from 'mdast-util-math';
import { gfmToMarkdown } from 'mdast-util-gfm';
import type { Root, RootContent } from 'mdast';
import remarkDetails from './remark-details';
import remarkMathHints from './remark-math-hints';
import { parseMathSteps, parseReferencedEquation } from './authored-note-blocks';

type Node = {
  type: string; value?: string; lang?: string | null; children?: Node[];
  title?: string | null; identifier?: string;
  data?: { hName?: string; hProperties?: Record<string, unknown> };
};

/** A source-faithful review projection with every disclosure closed. */
export function extractReviewBody(source: string) {
  const processor = unified().use(remarkParse).use(remarkGfm).use(remarkMath)
    .use(remarkDetails).use(remarkMathHints);
  const tree = processor.runSync(processor.parse(source)) as Root;
  const removed = { disclosures: 0, mathHints: 0, stepPopups: 0 };
  const project = (node: Node): Node[] => {
    if (node.data?.hName === 'details') {
      removed.disclosures++;
      // Only the outer summary is visible; never traverse the hidden body.
      const summary = node.children?.find(child => child.data?.hName === 'summary');
      return summary ? [{ type: 'blockquote', children: [{ type: 'paragraph', children: [
        { type: 'text', value: '[折りたたみ見出し] ' }, ...(summary.children ?? []),
      ] }] }] : [];
    }
    if (node.type === 'mathHint') {
      removed.mathHints++;
      return (node.children ?? []).flatMap(project);
    }
    if (node.type === 'code' && node.lang === 'math-steps') {
      const parsed = parseMathSteps(node.value ?? '');
      if (!parsed) throw new Error('Cannot project malformed math-steps block');
      removed.stepPopups += parsed.steps.filter(step => step.note || step.popupMath).length;
      return parsed.steps.map((step, index) => ({ type: 'math',
        value: `${index === 0 ? parsed.lhs : ''} = ${step.parts.map(part => part.tex).join(' ')}` }));
    }
    if (node.type === 'code' && node.lang === 'equation') {
      const parsed = parseReferencedEquation(node.value ?? '');
      if (!parsed) throw new Error('Cannot project malformed equation block');
      return [{ type: 'html', value: `<a id="eq-${parsed.id}"></a>` }, { type: 'math', value: parsed.tex }];
    }
    if (node.type === 'code' && node.lang === 'math-hint') {
      throw new Error('Unattached math-hint: cannot classify as hidden');
    }
    // Reference anchors retain identity without including the popup destination.
    if (node.type === 'html') {
      const ref = node.value?.trim().match(/^<!-- reference: ([a-z0-9-]+) -->$/);
      if (ref) return [{ type: 'html', value: `<a id="ref-${ref[1]}"></a>` }];
      if (/^\s*<!--/.test(node.value ?? '')) return [];
    }
    return [{ ...node, title: undefined, children: node.children?.flatMap(project) }];
  };
  const children = (tree.children as unknown as Node[]).flatMap(project) as RootContent[];
  const render = (nodes: RootContent[]) => toMarkdown({ type: 'root', children: nodes }, {
    extensions: [gfmToMarkdown(), mathToMarkdown()],
  });
  const definitions = children.filter(n => n.type === 'definition');
  const usedReferences = (node: Node): string[] => [
    ...(['linkReference', 'imageReference'].includes(node.type) && node.identifier ? [node.identifier] : []),
    ...(node.children ?? []).flatMap(usedReferences),
  ];
  const units = children.filter(n => n.type !== 'definition').map((node, index) => {
    const used = new Set(usedReferences(node as Node));
    return { index: index + 1, markdown: render([node, ...definitions.filter(d => used.has(d.identifier))]) };
  });
  return { markdown: render(children), units, removed };
}
