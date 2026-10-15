import type { Announcement, HomePage, InfoPage } from '@/features/content/types';

import { ANNOUNCEMENT, HOME_PAGE, INFO_PAGES } from './mock/content-data';

// One function per CMS query. Today they read the demo content; when the CMS is chosen (Sanity,
// Strapi, Payload, Storyblok, …), replace the bodies and keep the signatures.

const delay = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchAnnouncement(): Promise<Announcement> {
  return structuredClone(ANNOUNCEMENT);
}

export async function fetchHomePage(): Promise<HomePage> {
  await delay();
  return structuredClone(HOME_PAGE);
}

/** A text page by its slug (not found → null). */
export async function fetchInfoPage(slug: string): Promise<InfoPage | null> {
  await delay();
  const page = INFO_PAGES.find((candidate) => candidate.slug === slug);
  return page ? structuredClone(page) : null;
}
