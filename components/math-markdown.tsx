import ReactMarkdown, { type Components } from 'react-markdown';
import type { PluggableList } from 'unified';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkDetails from '../lib/remark-details';
import remarkTexDashes from '../lib/remark-tex-dashes';
import rehypeEquationLayout from '../lib/rehype-equation-layout';

const inlineComponents: Components = { p: ({ children }) => <>{children}</> };

/** Shared Markdown/TeX rendering for authored prose, disclosures and UI labels. */
export function MathMarkdown({ children, inline = false, components, remarkPlugins = [] }: {
  children: string;
  inline?: boolean;
  components?: Components;
  remarkPlugins?: PluggableList;
}) {
  return <ReactMarkdown
    remarkPlugins={[remarkGfm, remarkMath, remarkDetails, ...remarkPlugins, remarkTexDashes]}
    rehypePlugins={[[rehypeKatex, { strict: false, throwOnError: false }], rehypeEquationLayout]}
    components={inline ? { ...components, ...inlineComponents } : components}
  >{children}</ReactMarkdown>;
}
