import { Outlet, ScrollRestoration } from 'react-router';

import { CartDrawer } from '@/features/cart/components/cart-drawer';

import { AnnouncementBar } from './announcement-bar';
import { Footer } from './footer';
import { Header } from './header';

export function RootLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-foreground px-4 py-2 text-sm text-background focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        გადადი შიგთავსზე
      </a>
      <AnnouncementBar />
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <ScrollRestoration />
    </div>
  );
}
