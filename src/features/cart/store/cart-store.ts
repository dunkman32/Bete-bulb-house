import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { ImageAsset } from '@/lib/image';
import type { Money } from '@/lib/money';

/**
 * A cart line: the variant (what checkout sends) plus a snapshot to draw the line without
 * refetching. The snapshot's price is only for display: the server re-prices the order.
 */
export type CartLine = {
  variantId: string;
  productSlug: string;
  title: string;
  image: ImageAsset;
  /** "შავი · 4000K" */
  variantTitle: string;
  unitPrice: Money;
  quantity: number;
};

// Spots and bulbs are bought by the dozen.
export const MAX_QUANTITY = 50;

type CartState = {
  lines: CartLine[];
  isOpen: boolean;
  add: (line: Omit<CartLine, 'quantity'>, quantity?: number) => void;
  setQuantity: (variantId: string, quantity: number) => void;
  remove: (variantId: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      isOpen: false,
      add: (line, quantity = 1) =>
        set((state) => {
          const existing = state.lines.find((item) => item.variantId === line.variantId);
          const lines = existing
            ? state.lines.map((item) =>
                item === existing
                  ? { ...item, quantity: Math.min(MAX_QUANTITY, item.quantity + quantity) }
                  : item,
              )
            : [...state.lines, { ...line, quantity }];
          return { lines, isOpen: true };
        }),
      setQuantity: (variantId, quantity) =>
        set((state) => ({
          lines: state.lines.map((item) =>
            item.variantId === variantId
              ? { ...item, quantity: Math.max(1, Math.min(MAX_QUANTITY, quantity)) }
              : item,
          ),
        })),
      remove: (variantId) =>
        set((state) => ({ lines: state.lines.filter((item) => item.variantId !== variantId) })),
      clear: () => set({ lines: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
    }),
    {
      name: 'bete-cart',
      version: 2,
      // Carts saved by an older shape are dropped rather than shown broken.
      migrate: () => ({ lines: [] }),
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ lines: state.lines }),
    },
  ),
);

export const useCartCount = () =>
  useCartStore((state) => state.lines.reduce((count, line) => count + line.quantity, 0));
