import { ShoppingBag } from 'lucide-react';

import { ButtonLink } from '@/components/ui/button';
import { Drawer } from '@/components/ui/drawer';
import { cartSubtotal } from '@/features/cart/lib/totals';
import { useCartCount, useCartStore } from '@/features/cart/store/cart-store';
import { formatMoney } from '@/lib/money';

import { CartLineItem } from './cart-line-item';
import { FreeShippingProgress } from './free-shipping-progress';

/** The cart as a sheet from the right; adding a product opens it. */
export function CartDrawer() {
  const lines = useCartStore((state) => state.lines);
  const isOpen = useCartStore((state) => state.isOpen);
  const close = useCartStore((state) => state.close);
  const count = useCartCount();
  const subtotal = cartSubtotal(lines);

  return (
    <Drawer
      open={isOpen}
      onClose={close}
      title={
        <>
          კალათა <span className="text-muted-foreground">({count})</span>
        </>
      }
      footer={
        lines.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-subtle">ჯამი</span>
              <span className="text-lg font-medium tabular-nums">{formatMoney(subtotal)}</span>
            </div>
            <p className="text-xs text-muted-foreground">მიწოდება გამოითვლება გაფორმებისას.</p>
            <ButtonLink to="/checkout" onClick={close} size="lg" block>
              გაფორმება
            </ButtonLink>
          </div>
        )
      }
    >
      {lines.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center px-8 py-16 text-center">
          <div className="grid size-16 place-items-center rounded-full bg-muted">
            <ShoppingBag className="size-6" strokeWidth={1.5} />
          </div>
          <p className="mt-5 font-display text-xl">კალათა ცარიელია</p>
          <p className="mt-2 text-sm text-muted-foreground">
            დაათვალიერე კატალოგი — განათება, როზეტები, ჩამრთველები.
          </p>
          <ButtonLink to="/shop" onClick={close} variant="outline" className="mt-6">
            კატალოგი
          </ButtonLink>
        </div>
      ) : (
        <div className="space-y-6 px-5 py-5 sm:px-6">
          <FreeShippingProgress subtotal={subtotal} />
          <ul className="divide-y divide-border">
            {lines.map((line) => (
              <li key={line.variantId} className="py-5 first:pt-0 last:pb-0">
                <CartLineItem line={line} onNavigate={close} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </Drawer>
  );
}
