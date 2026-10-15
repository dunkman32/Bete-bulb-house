import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Container } from '@/components/ui/container';
import { PageTitle } from '@/components/ui/page-title';
import { Skeleton } from '@/components/ui/skeleton';
import { infoPageQuery } from '@/features/content/api/content-queries';

import { NotFoundPage } from './not-found-page';

/** /pages/:slug — a text page from the CMS (about, delivery, returns, …). */
export function InfoPage() {
  const { slug = '' } = useParams();
  const { data: page, isPending } = useQuery(infoPageQuery(slug));

  if (isPending) {
    return (
      <Container className="max-w-3xl space-y-4 py-16">
        <Skeleton className="h-12 w-2/3" />
        <Skeleton className="h-24 w-full" />
      </Container>
    );
  }
  if (!page) return <NotFoundPage />;

  return (
    <Container className="max-w-3xl pt-8 sm:pt-12">
      <PageTitle title={page.title} />
      <Breadcrumbs items={[{ label: page.title }]} />
      <h1 className="mt-8 font-display text-[clamp(2.2rem,5vw,3.5rem)] leading-tight font-light">
        {page.title}
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-subtle">{page.intro}</p>
      <div className="mt-12 space-y-10 border-t border-border pt-10">
        {page.sections.map((section) => (
          <section key={section.heading} className="grid gap-3 sm:grid-cols-[200px_1fr] sm:gap-10">
            <h2 className="font-display text-xl font-light">{section.heading}</h2>
            <div className="space-y-3 text-[15px] leading-[1.8] text-subtle">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Container>
  );
}
