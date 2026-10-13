import type { Root } from 'mdast';
import type { Plugin } from 'unified';

type Node = { type: string; value?: string; data?: Record<string, unknown>; children?: Node[] };

/** Put a stable destination around the original Markdown passage. */
const remarkNoteReferences: Plugin<[], Root> = function () {
  return tree => {
    const visit = (parent: Node) => {
      if (!parent.children) return;
      const output: Node[] = [];
      let range: Node | undefined;
      for (const node of parent.children) {
        const start = node.type === 'html' && node.value?.trim().match(/^<!-- reference: ([a-z0-9-]+) -->$/);
        const end = node.type === 'html' && node.value?.trim() === '<!-- /reference -->';
        if (start) {
          if (range) throw new Error('Note reference ranges cannot overlap');
          range = { type: 'noteReference', data: { hName: 'div', hProperties: { id: `ref-${start[1]}`, className: ['note-source-passage'] } }, children: [] };
          output.push(range);
        } else if (end) {
          if (!range) throw new Error('Unmatched note reference end');
          range = undefined;
        } else {
          visit(node);
          (range?.children ?? output).push(node);
        }
      }
      if (range) throw new Error('Unclosed note reference range');
      parent.children = output;
    };
    visit(tree as unknown as Node);
  };
};
export default remarkNoteReferences;
