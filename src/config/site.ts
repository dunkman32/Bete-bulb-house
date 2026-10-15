import { lari } from '@/lib/money';

/** The store's own settings (not content: that comes from the CMS). */
export const site = {
  name: 'BETE',
  description: 'განათება, ელექტრო აქსესუარები და ჭკვიანი სახლი',
  freeShippingFrom: lari(150),
  contact: {
    email: 'hello@example.com',
    phone: '+995 555 00 00 00',
    address: 'თბილისი, საქართველო',
    hours: 'ორშ–შაბ · 10:00–20:00',
  },
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
  },
} as const;

export type NavItem = {
  label: string;
  to: string;
  highlight?: boolean;
  /** The season's link: a sparkle before it. */
  festive?: boolean;
  /** Only on wide screens (the header runs out of room below xl). */
  wide?: boolean;
};

/** The header's quick links beside the catalog menu (which lists every category). */
export const mainNav: NavItem[] = [
  { label: 'საახალწლო', to: '/shop/holiday', festive: true },
  { label: 'რელსური განათება', to: '/shop/track' },
  { label: 'LED განათება', to: '/shop/led' },
  { label: 'ჭკვიანი სახლი', to: '/shop/smart', wide: true },
  { label: 'ფასდაკლება', to: '/shop?tag=sale', highlight: true },
];

/** The CMS's text pages (/pages/:slug). */
export const helpNav: NavItem[] = [
  { label: 'მონტაჟი და კონსულტაცია', to: '/pages/services' },
  { label: 'მიწოდება', to: '/pages/delivery' },
  { label: 'დაბრუნება და გარანტია', to: '/pages/returns' },
  { label: 'ჩვენ შესახებ', to: '/pages/about' },
];
