import { Menu, Search, ShoppingBag, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router';

import { Logo } from '@/components/shared/logo';
import { ThemeBulb } from '@/components/shared/theme-bulb';
import { IconButton } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { mainNav, type NavItem } from '@/config/site';
import { useCartCount, useCartStore } from '@/features/cart/store/cart-store';
import { cn } from '@/lib/cn';

import { CatalogMenu } from './catalog-menu';
import { MobileMenu } from './mobile-menu';
import { SearchDrawer } from './search-drawer';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const openCart = useCartStore((state) => state.open);
  const count = useCartCount();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <Container className="flex h-16 items-center gap-2 lg:h-[72px] lg:gap-6 xl:gap-8">
        <IconButton label="მენიუ" className="-ml-2 lg:hidden" onClick={() => setMenuOpen(true)}>
          <Menu className="size-5" strokeWidth={1.5} />
        </IconButton>
        {/* Phones: beside the menu, balancing search and cart around the centered logo. */}
        <ThemeBulb className="lg:hidden" />

        <Link
          to="/"
          aria-label="მთავარი გვერდი"
          className="text-[20px] max-lg:absolute max-lg:left-1/2 max-lg:-translate-x-1/2 lg:text-[22px]"
        >
          <Logo />
        </Link>

        <nav aria-label="მთავარი" className="hidden flex-1 items-center gap-5 lg:flex xl:gap-7">
          <CatalogMenu />
          <ul className="flex items-center gap-5 xl:gap-7">
            {mainNav.map((item) => (
              <li key={item.to} className={cn(item.wide && 'hidden xl:block')}>
                <NavItemLink item={item} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-0.5 lg:ml-0">
          <ThemeBulb className="max-lg:hidden" />
          <IconButton label="ძიება" onClick={() => setSearchOpen(true)}>
            <Search className="size-5" strokeWidth={1.5} />
          </IconButton>
          <IconButton label={`კალათა, ${count} ნივთი`} className="-mr-2" onClick={openCart}>
            <ShoppingBag className="size-5" strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute top-1 right-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-foreground tabular-nums">
                {count}
              </span>
            )}
          </IconButton>
        </div>
      </Container>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchDrawer open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}

function NavItemLink({ item }: { item: NavItem }) {
  const location = useLocation();
  // The current page: the category's path, or /shop with the item's `tag` (NavLink ignores the query).
  const [pathname, query] = item.to.split('?');
  const isActive =
    location.pathname === pathname &&
    new URLSearchParams(query).get('tag') === new URLSearchParams(location.search).get('tag');
  return (
    <Link
      to={item.to}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'relative inline-flex items-center gap-1.5 py-2 text-[14px] whitespace-nowrap transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100',
        item.highlight ? 'text-accent' : 'text-foreground',
        isActive && 'after:scale-x-100',
      )}
    >
      {item.festive && <Sparkles className="size-3.5 text-accent dark:text-glow" />}
      {item.label}
    </Link>
  );
}
