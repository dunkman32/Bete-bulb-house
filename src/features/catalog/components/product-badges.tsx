import type { Product, ProductBadge } from '@/features/catalog/types';
import { cn } from '@/lib/cn';
import { discountPercent } from '@/lib/money';

const LABELS: Record<ProductBadge, string> = {
  new: 'ახალი',
  sale: 'ფასდაკლება',
  bestseller: 'ბესტსელერი',
};

/** The product's badges as small pills; a sale shows its percent. */
export function ProductBadges({ product, className }: { product: Product; className?: string }) {
  if (!product.badges.length) return null;
  return (
    <ul className={cn('flex flex-wrap gap-1.5', className)}>
      {product.badges.map((badge) => (
        <li
          key={badge}
          className={cn(
            'rounded-full px-2.5 py-1 text-[11px] leading-none font-medium tracking-wide',
            badge === 'sale'
              ? 'bg-accent text-accent-foreground'
              : 'bg-card/90 text-foreground backdrop-blur',
          )}
        >
          {badge === 'sale' && product.compareAtPrice
            ? `−${discountPercent(product.price, product.compareAtPrice)}%`
            : LABELS[badge]}
        </li>
      ))}
    </ul>
  );
}
