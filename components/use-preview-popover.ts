'use client';

import { useState, type ComponentProps } from 'react';
import { Popover } from './ui/popover';

// Hover previews are temporary; the first press always keeps them open,
// even after the reader has spent time inspecting the preview.
export function usePreviewPopover() {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const close = () => { setOpen(false); setPinned(false); };
  const onOpenChange: NonNullable<ComponentProps<typeof Popover>['onOpenChange']> = (nextOpen, details) => {
    if (details.reason === 'trigger-press') {
      if (!pinned) {
        if (!nextOpen) details.cancel();
        setOpen(true);
        setPinned(true);
      } else {
        close();
      }
      return;
    }
    if (details.reason === 'trigger-hover' && pinned) {
      details.cancel();
      return;
    }
    setOpen(nextOpen);
    if (!nextOpen) setPinned(false);
  };
  return { open, onOpenChange };
}
