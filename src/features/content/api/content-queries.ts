import { queryOptions } from '@tanstack/react-query';

import { fetchAnnouncement, fetchHomePage, fetchInfoPage } from './content-api';

export const contentKeys = {
  all: ['content'] as const,
  announcement: () => [...contentKeys.all, 'announcement'] as const,
  homePage: () => [...contentKeys.all, 'home'] as const,
  infoPage: (slug: string) => [...contentKeys.all, 'page', slug] as const,
};

export const announcementQuery = () =>
  queryOptions({ queryKey: contentKeys.announcement(), queryFn: fetchAnnouncement });

export const homePageQuery = () =>
  queryOptions({ queryKey: contentKeys.homePage(), queryFn: fetchHomePage });

export const infoPageQuery = (slug: string) =>
  queryOptions({ queryKey: contentKeys.infoPage(slug), queryFn: () => fetchInfoPage(slug) });
