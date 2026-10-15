import { X } from 'lucide-react';
import { useEffect, useRef, type ReactNode } from 'react';

import { cn } from '@/lib/cn';

import { IconButton } from './button';

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  side?: 'right' | 'left' | 'top';
  /** Shown in the header, next to the ✕. */
  title: ReactNode;
  children: ReactNode;
  /** Pinned under the scrolling content (totals, the main action). */
  footer?: ReactNode;
  className?: string;
};

/**
 * A side sheet on the native modal <dialog>: focus trap, Esc and the backdrop come from the
 * browser; the slide is CSS (`.drawer` in index.css).
 */
export function Drawer({
  open,
  onClose,
  side = 'right',
  title,
  children,
  footer,
  className,
}: DrawerProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      data-side={side}
      className={cn('drawer flex-col overscroll-contain open:flex', className)}
      onClose={onClose}
      // A click on the dialog itself (not its content) is a click on the backdrop.
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-3 sm:px-6">
        <div className="font-display text-lg">{title}</div>
        <IconButton label="დახურვა" onClick={onClose} className="-mr-2">
          <X className="size-5" strokeWidth={1.5} />
        </IconButton>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      {footer && <div className="border-t border-border px-5 py-5 sm:px-6">{footer}</div>}
    </dialog>
  );
}
