import { Truck } from 'lucide-react';

import { site } from '@/config/site';
import { untilFreeShipping } from '@/features/cart/lib/totals';
import { formatMoney, type Money } from '@/lib/money';

/** "X ₾ more for free delivery", with a bar filling up to the threshold. */
export function FreeShippingProgress({ subtotal }: { subtotal: Money }) {
  const left = untilFreeShipping(subtotal);
  const progress = Math.min(1, subtotal.amount / site.freeShippingFrom.amount);
  return (
    <div className="rounded-xl bg-background p-4">
      <p className="flex items-center gap-2 text-[13px]">
        <Truck className="size-4 shrink-0" strokeWidth={1.5} />
        {left.amount > 0 ? (
          <span>
            კიდევ <strong className="font-semibold">{formatMoney(left)}</strong> და მიწოდება უფასოა
          </span>
        ) : (
          <span>მიწოდება თბილისში უფასოა 🎉</span>
        )}
      </p>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-foreground transition-[width] duration-500 ease-(--ease-out-soft)"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
