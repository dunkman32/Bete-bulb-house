import { useQuery } from '@tanstack/react-query';
import { ArrowRight, ChevronDown, LayoutGrid } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router';

import { Container } from '@/components/ui/container';
import { Picture } from '@/components/ui/picture';
import { categoriesQuery } from '@/features/catalog/api/catalog-queries';
import { cn } from '@/lib/cn';

const MENU_ID = 'catalog-menu';

/**
 * The desktop "catalog" button and its panel of categories: a native popover (light dismiss and
 * Esc from the browser), placed under the header when opened and closed on scroll.
 */
export function CatalogMenu() {
  const { data: categories } = useQuery(categoriesQuery());
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const close = () => panel.hidePopover();
    const onToggle = (event: Event) => {
      if ((event as ToggleEvent).newState === 'open') {
        window.addEventListener('scroll', close, { once: true, passive: true });
      } else {
        window.removeEventListener('scroll', close);
      }
    };
    panel.addEventListener('toggle', onToggle);
    return () => {
      panel.removeEventListener('toggle', onToggle);
      window.removeEventListener('scroll', close);
    };
  }, []);

  const close = () => panelRef.current?.hidePopover();

  return (
    <>
      <button
        type="button"
        popoverTarget={MENU_ID}
        onClick={(event) => {
          const header = event.currentTarget.closest('header');
          if (header && panelRef.current) {
            panelRef.current.style.top = `${header.getBoundingClientRect().bottom}px`;
          }
        }}
        className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary py-2 pr-3.5 pl-4 text-[14px] text-primary-foreground transition-colors hover:bg-primary/85"
      >
        <LayoutGrid className="size-4" strokeWidth={1.5} />
        კატალოგი
        <ChevronDown className="size-3.5 opacity-70" />
      </button>

      <div id={MENU_ID} ref={panelRef} popover="auto" className="mega-menu">
        <Container className="py-8">
          <ul className="grid grid-cols-7 gap-4">
            {categories?.map((category) => (
              <li key={category.id}>
                <Link to={`/shop/${category.id}`} onClick={close} className="group block">
                  <div className="aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                    <Picture
                      image={category.image}
                      sizes="220px"
                      maxWidth={640}
                      className="transition-[scale,opacity] duration-700 ease-(--ease-out-soft) group-hover:scale-105"
                    />
                  </div>
                  <p className={cn('mt-3 text-sm font-medium', category.seasonal && 'text-accent')}>
                    {category.title}
                  </p>
                  <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-muted-foreground">
                    {category.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center gap-8 border-t border-border pt-5 text-sm">
            <Link
              to="/shop"
              onClick={close}
              className="group inline-flex items-center gap-2 font-medium"
            >
              ყველა პროდუქტი
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/shop?tag=new" onClick={close} className="text-subtle hover:text-foreground">
              სიახლეები
            </Link>
            <Link to="/shop?tag=sale" onClick={close} className="text-accent hover:underline">
              ფასდაკლებები
            </Link>
            <Link
              to="/pages/services"
              onClick={close}
              className="ml-auto text-subtle hover:text-foreground"
            >
              უფასო განათების პროექტი →
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
}
