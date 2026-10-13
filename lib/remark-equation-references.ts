import type { Root } from 'mdast';
import type { Plugin } from 'unified';

type Node = { type: string; value?: string; children?: Node[]; url?: string; data?: { hName?: string } };

/** Link prose references only when the corresponding equation exists locally. */
const remarkEquationReferences: Plugin<[{ ids: string[] }], Root> = function ({ ids }) {
  const known = new Set(ids);
  return tree => {
    function visit(parent: Node) {
      if (!parent.children || ['link', 'linkReference', 'code', 'inlineCode', 'math', 'inlineMath', 'heading'].includes(parent.type)) return;
      // A summary is already an interactive disclosure control.
      if (parent.data?.hName === 'summary') return;
      parent.children = parent.children.flatMap(node => {
        if (node.type !== 'text' || !node.value) { visit(node); return [node]; }
        const result: Node[] = [];
        let cursor = 0;
        for (const match of node.value.matchAll(/\(([^()\n]+)\)/g)) {
          if (!known.has(match[1])) continue;
          const index = match.index!;
          if (index > cursor) result.push({ type: 'text', value: node.value.slice(cursor, index) });
          result.push({ type: 'link', url: '#eq-' + encodeURIComponent(match[1]), children: [{ type: 'text', value: match[0] }] });
          cursor = index + match[0].length;
        }
        if (!cursor) return [node];
        if (cursor < node.value.length) result.push({ type: 'text', value: node.value.slice(cursor) });
        return result;
      });
    }
    visit(tree as Node);
  };
};
export default remarkEquationReferences;
