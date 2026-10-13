import type { Root } from 'mdast';
import type { Plugin } from 'unified';

type MarkdownNode = {
  type?: string;
  value?: string;
  children?: MarkdownNode[];
};

// The source notes retain TeX typography ("--" for an en dash and "---" for
// an em dash). Markdown does not expand those sequences by itself. Running the
// conversion on parsed text nodes keeps math, code, and table syntax untouched.
const remarkTexDashes: Plugin<[], Root> = function () {
  return (tree: MarkdownNode) => {
    const visit = (node: MarkdownNode) => {
      if (node.type === 'text' && typeof node.value === 'string') {
        node.value = node.value.replace(/---/g, '—').replace(/--/g, '–');
      }
      node.children?.forEach(visit);
    };

    visit(tree);
  };
}


export default remarkTexDashes;
