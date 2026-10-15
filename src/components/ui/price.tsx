import { cn } from '@/lib/cn';
import { formatMoney, type Money } from '@/lib/money';

type PriceProps = {
  price: Money;
  compareAtPrice?: Money;
  /** The lowest of several prices: "45 ₾-დან". */
  from?: boolean;
  className?: string;
};

/** The price, and the old one struck through when on sale. */
export function Price({ price, compareAtPrice, from, className }: PriceProps) {
  const onSale = compareAtPrice && compareAtPrice.amount > price.amount;
  return (
    <span className={cn('inline-flex items-baseline gap-2 tabular-nums', className)}>
      <span className={cn(onSale && 'text-accent')}>
        {formatMoney(price)}
        {from && '-დან'}
      </span>
      {onSale && (
        <s className="text-[0.85em] text-muted-foreground">
          <span className="sr-only">ძველი ფასი: </span>
          {formatMoney(compareAtPrice)}
        </s>
      )}
    </span>
  );
}
