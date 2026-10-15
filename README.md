# BETE — online store

An online store for lighting and electrical goods: track lighting, LED, bulbs, sockets, switches
and touch switches. Georgian UI, prices in GEL (₾).

**Status: visuals only.** The catalog and the page content come from in-memory mock data, the cart
works (saved in `localStorage`), and checkout is a form that stops at "payments not connected yet".

## Stack

- Vite 8 + React 19 (React Compiler on) + TypeScript 6 (strict, `noUncheckedIndexedAccess`)
- React Router 8 (data router, `src/app/router.tsx`)
- TanStack Query for everything the server or the CMS will send
- Zustand for the cart (client state)
- Tailwind CSS 4: design tokens in `src/index.css` (`@theme`), no raw colors in components
- Noto Sans Georgian (self-hosted via Fontsource), lucide icons
- Oxlint + Prettier (with the Tailwind class sorter)

## Commands

```sh
pnpm dev          # dev server on http://localhost:5173
pnpm build        # type check + production build
pnpm typecheck
pnpm lint         # oxlint
pnpm format       # prettier --write .
```

## Structure

```
src/
├── app/            router, root layout (announcement bar, header + catalog menu, footer)
├── pages/          one folder per page: home, catalog, product, checkout, info, 404
├── features/
│   ├── catalog/    products, categories, filters (api/ = backend calls + queries)
│   ├── content/    CMS content: home page, text pages, announcement
│   ├── cart/       cart store, drawer, totals and shipping
│   └── checkout/   payment methods and the checkout request (where payments plug in)
├── components/     shared UI (ui/: button, drawer, picture, price, …)
├── config/site.ts  store settings: name, contacts, navigation, free shipping threshold
└── lib/            money (minor units), images (CDN sizing), query client
```

## Light and dark themes

The bulb in the header switches the theme (`lib/theme.ts`, saved in `localStorage`; until then
the system's). Colors are tokens in `src/index.css`: light in `@theme`, dark under
`:root[data-theme='dark']`. Use `bg-ink` / `text-on-ink` for bands that stay dark in both themes.
In the dark theme the bulbs and the New Year garlands (`features/catalog/lib/light.ts`) switch on:
they flicker one by one, then glow in their own color temperature. The New Year promo
(`components/shared/holiday-banner.tsx`) draws its trees in SVG (`festive-trees.tsx`), so each
bulb on their garlands lights up by itself, top to bottom, then twinkles.

## Where the backend, CMS and payments plug in

- **Catalog** (`features/catalog/api/catalog-api.ts`): one function per backend call. Replace the
  bodies with real requests; the signatures, queries and pages stay. Prices are in tetri
  (`Money.amount`, 1 ₾ = 100) and a cart line refers to a **variant** (finish × option), which is
  what an order and a payment line need.
- **CMS** (`features/content/api/content-api.ts`): the home page sections, text pages
  (`/pages/:slug`) and the announcement bar. Any headless CMS works (Sanity, Strapi, Payload,
  Storyblok, …). Image sizing for its CDN goes in one place: `lib/image.ts`.
- **Payments** (`features/checkout/lib/payments.ts`): `startCheckout()` should POST the order to
  our server, which re-prices it, creates the payment with the provider (TBC, Bank of Georgia,
  Stripe, …) and returns the provider's page to redirect to. Card data never touches this app.

## Photos

The demo photos are from Unsplash (free to use), hotlinked the way a CMS's CDN would serve them.
Replace them with the store's own product photos.
