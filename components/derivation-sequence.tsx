'use client';

import { memo } from 'react';
import katex from 'katex';
import { MathMarkdown } from './math-markdown';
import { Lightbulb } from 'lucide-react';
import { Popover, PopoverContent, PopoverTitle, PopoverTrigger } from './ui/popover';
import { usePreviewPopover } from './use-preview-popover';

export type DerivationSequenceStep = {
  note?: string;
  popupMath?: string;
  parts: { id: string; tex: string }[];
};

const MathText = memo(function MathText({ tex }: { tex: string }) {
  const html = katex.renderToString(String.raw`\displaystyle ` + tex, {
    throwOnError: false, strict: false,
  });
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
});

export function Supplement({ note, popupMath }: Pick<DerivationSequenceStep, 'note' | 'popupMath'>) {
  const preview = usePreviewPopover();
  return <Popover open={preview.open} onOpenChange={preview.onOpenChange} modal={false}>
    <PopoverTrigger openOnHover delay={120} closeDelay={300} className="math-supplement-trigger" aria-label="数式の補足">
      <Lightbulb size={15} strokeWidth={1.5} aria-hidden="true" />
    </PopoverTrigger>
    <PopoverContent className="math-supplement" side="bottom" sideOffset={6} align="start" initialFocus={false}>
      <PopoverTitle className="sr-only">数式の補足</PopoverTitle>
      {note && <div className="math-supplement-prose"><MathMarkdown>{note}</MathMarkdown></div>}
      {popupMath && <div className="math-supplement-equation"><MathText tex={popupMath} /></div>}
    </PopoverContent>
  </Popover>;
}

export function DerivationSequence({ lhs, steps }: { lhs: string; steps: DerivationSequenceStep[] }) {
  return <section className="derivation-sequence" aria-label="式変形">
    <div className="derivation-sequence-lines">
      {steps.map((step, index) => <div className="derivation-sequence-line" key={index}>
        <span className="derivation-sequence-lhs">{index === 0 && <MathText tex={lhs} />}</span>
        <span className="derivation-sequence-equals">=</span>
        <div className="derivation-sequence-rhs">
          <MathText tex={step.parts.map(part => part.tex).join(' ')} />
          {(step.note || step.popupMath) && <Supplement note={step.note} popupMath={step.popupMath} />}
        </div>
      </div>)}
    </div>
  </section>;
}
