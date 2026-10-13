'use client';

import { type ReactNode } from 'react';
import { MathMarkdown } from './math-markdown';
import { X } from 'lucide-react';
import { Popover, PopoverClose, PopoverContent, PopoverTitle, PopoverTrigger } from './ui/popover';
import { usePreviewPopover } from './use-preview-popover';

export function ReferencePopover({ label, title, children, className = '' }: {
  label: ReactNode;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const preview = usePreviewPopover();
  return <Popover open={preview.open} onOpenChange={preview.onOpenChange} modal={false}>
    <PopoverTrigger openOnHover delay={120} closeDelay={300} className={`reference-trigger ${className}`}>{label}</PopoverTrigger>
    <PopoverContent className="reading-reference" side="bottom" align="start" initialFocus={false}>
      <header className="reading-reference-header">
        <PopoverTitle><MathMarkdown inline>{title}</MathMarkdown></PopoverTitle>
        <PopoverClose aria-label="参照を閉じる"><X size={18} /></PopoverClose>
      </header>
      <div className="reading-reference-body note-content">{children}</div>
    </PopoverContent>
  </Popover>;
}
