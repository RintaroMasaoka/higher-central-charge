import type { Root, RootContent, Paragraph } from 'mdast';
import type { Plugin } from 'unified';

/** Parse authored disclosures as Markdown, including math in their summaries. */
const remarkDetails: Plugin<[], Root> = function () {
  const parse = (text: string) => this.parse(text) as Root;
  return (tree) => {
    const transform = (parent: { children: RootContent[] }) => {
      const output: RootContent[] = [];
      const stack: Paragraph[] = [];
      const append = (node: RootContent) => {
        const parent = stack.at(-1);
        if (parent) (parent.children as unknown as RootContent[]).push(node);
        else output.push(node);
      };
      for (const node of parent.children) {
        if (node.type !== 'html') {
          if ('children' in node) transform(node as unknown as { children: RootContent[] });
          append(node); continue;
        }
        // HTML blocks may contain several tags and Markdown without blank lines.
        const fragments = node.value.split(/(<details\b[^>]*>|<\/details\s*>|<summary\b[^>]*>[\s\S]*?<\/summary\s*>)/g);
        if (fragments.length === 1) { append(node); continue; }
        for (const fragment of fragments) {
          if (!fragment.trim()) continue;
          if (/^<details/.test(fragment)) {
            const id = fragment.match(/\bid=["']([A-Za-z][\w.-]*)["']/)?.[1];
            const detail: Paragraph = { type: 'paragraph', data: { hName: 'details', hProperties: { ...(id ? { id } : {}), ...(/\sopen(?:\s|>)/.test(fragment) ? { open: true } : {}) } }, children: [] };
            append(detail);
            stack.push(detail);
          } else if (/^<\/details/.test(fragment)) {
            stack.pop();
          } else if (/^<summary\b/.test(fragment)) {
            const title = parse(fragment.replace(/^<summary\b[^>]*>/, '').replace(/<\/summary\s*>$/, ''));
            const children = title.children.flatMap(item => item.type === 'paragraph' ? item.children : []);
            append({ type: 'paragraph', data: { hName: 'summary' }, children });
          } else {
            const content = parse(fragment);
            transform(content);
            content.children.forEach(append);
          }
        }
      }
      parent.children = output;
    };
    transform(tree);
  };
};
export default remarkDetails;
