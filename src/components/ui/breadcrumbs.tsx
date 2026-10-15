import { Fragment } from 'react';
import { Link } from 'react-router';

import { cn } from '@/lib/cn';

type Crumb = { label: string; to?: string };

/** "მთავარი / ქალი / პალტო": the last crumb is the current page. */
export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="ნავიგაცია" className={cn('text-[13px] text-muted-foreground', className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {[{ label: 'მთავარი', to: '/' }, ...items].map((item, index, all) => (
          <Fragment key={`${item.label}-${index}`}>
            {index > 0 && <li aria-hidden>/</li>}
            <li>
              {item.to && index < all.length - 1 ? (
                <Link to={item.to} className="transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-foreground">
                  {item.label}
                </span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
