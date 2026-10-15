import type { ImageAsset } from '@/lib/image';

// The CMS's content model: what editors change without a release (texts, images, pages).

export type ContentLink = { label: string; to: string };

export type HomePage = {
  hero: {
    eyebrow: string;
    title: string;
    text: string;
    image: ImageAsset;
    primary: ContentLink;
    secondary: ContentLink;
  };
  editorial: {
    eyebrow: string;
    title: string;
    text: string;
    image: ImageAsset;
    cta: ContentLink;
  };
  lookbook: {
    eyebrow: string;
    title: string;
    text: string;
    images: ImageAsset[];
    cta: ContentLink;
  };
  /** The season's promo (shown while it has content). */
  holiday?: {
    eyebrow: string;
    title: string;
    text: string;
    cta: ContentLink;
  };
  perks: Perk[];
};

export type Perk = {
  icon: 'delivery' | 'warranty' | 'installation' | 'certified';
  title: string;
  text: string;
};

/** A text page (about, delivery, returns, …) at /pages/:slug. */
export type InfoPage = {
  slug: string;
  title: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export type Announcement = { messages: string[] };
