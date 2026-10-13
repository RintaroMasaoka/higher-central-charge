import type { Element, Root } from 'hast';

// Keep KaTeX's accessible MathML intact; separate the visible formula and tag.
export default function rehypeEquationLayout() {
  return (tree: Root) => {
    function visit(node: Root | Element) {
      for (const child of node.children) {
        if (child.type !== 'element') continue;
        visit(child);
        if (!child.properties.className?.toString().includes('katex-html')) continue;
        const tag = child.children.find((item) => item.type === 'element'
          && Array.isArray(item.properties.className) && item.properties.className.includes('tag'));
        if (!tag) continue;
        child.properties.className = ['katex-html', 'numbered-equation'];
        child.children = [
          { type: 'element', tagName: 'span', properties: { className: ['equation-body'], tabIndex: 0 }, children: child.children.filter((item) => item !== tag) },
          tag,
        ];
      }
    }
    visit(tree);
  };
}
