import type { Root } from 'mdast';
import type { Plugin } from 'unified';

type Node = {
  type: string;
  lang?: string | null;
  value?: string;
  data?: Record<string, unknown>;
  children?: Node[];
};

/** Attach an authored hint to the preceding display math without rewriting TeX. */
const remarkMathHints: Plugin<[], Root> = function () {
  return (tree) => {
    const visit = (parent: Node) => {
      const children = parent.children;
      if (!children) return;
      for (let i = 0; i < children.length; i++) {
        const equation = children[i];
        const hint = children[i + 1];
        if (equation.type === 'math' && hint?.type === 'code' && hint.lang === 'math-hint') {
          children.splice(i, 2, {
            type: 'mathHint',
            data: { hName: 'div', hProperties: { dataMathHint: hint.value } },
            children: [equation],
          });
        } else {
          visit(equation);
        }
      }
    };
    visit(tree as unknown as Node);
  };
};
export default remarkMathHints;
