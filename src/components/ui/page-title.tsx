import { site } from '@/config/site';

/** The tab's title (React hoists <title> into <head>). */
export function PageTitle({ title }: { title?: string }) {
  return <title>{title ? `${title} — ${site.name}` : `${site.name} — ონლაინ მაღაზია`}</title>;
}
