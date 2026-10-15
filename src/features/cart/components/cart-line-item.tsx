import { Link } from 'react-router';

import { Picture } from '@/components/ui/picture';
import { QuantityStepper } from '@/components/ui/quantity-stepper';
import { MAX_QUANTITY, useCartStore, type CartLine } from '@/features/cart/store/cart-store';
import { formatMoney, multiplyMoney } from '@/lib/money';

type CartLineItemProps = {
  line: CartLine;
  /** Read-only (the checkout's summary): no stepper, no remove. */
  readOnly?: boolean;
  onNavigate?: () => void;
};

export function CartLineItem({ line, readOnly, onNavigate }: CartLineItemProps) {
  const setQuantity = useCartStore((state) => state.setQuantity);
  const remove = useCartStore((state) => state.remove);

  return (
    <div className="flex gap-4">
      <Link
        to={`/product/${line.productSlug}`}
        onClick={onNavigate}
        className="relative block aspect-[4/5] w-20 shrink-0 overflow-hidden rounded-lg bg-muted sm:w-24"
      >
        <Picture image={line.image} sizes="96px" maxWidth={320} />
        {readOnly && (
          <span className="absolute top-1 right-1 grid size-5 place-items-center rounded-full bg-foreground text-[11px] font-medium text-background">
            {line.quantity}
          </span>
        )}
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <Link
            to={`/product/${line.productSlug}`}
            onClick={onNavigate}
            className="text-[15px] leading-snug hover:underline"
          >
            {line.title}
          </Link>
          <p className="shrink-0 text-sm font-medium tabular-nums">
            {formatMoney(multiplyMoney(line.unitPrice, line.quantity))}
          </p>
        </div>
        <p className="mt-1 text-[13px] text-muted-foreground">{line.variantTitle}</p>
        {!readOnly && (
          <div className="mt-auto flex items-center justify-between pt-3">
            <QuantityStepper
              size="sm"
              value={line.quantity}
              max={MAX_QUANTITY}
              onChange={(quantity) => setQuantity(line.variantId, quantity)}
            />
            <button
              type="button"
              onClick={() => remove(line.variantId)}
              className="cursor-pointer text-[13px] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              წაშლა
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
