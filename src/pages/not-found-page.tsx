import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PageTitle } from '@/components/ui/page-title';

export function NotFoundPage() {
  return (
    <Container className="flex flex-col items-center py-28 text-center sm:py-40">
      <PageTitle title="გვერდი ვერ მოიძებნა" />
      <p className="font-display text-[clamp(5rem,14vw,9rem)] leading-none font-light text-border">
        404
      </p>
      <h1 className="mt-6 font-display text-3xl font-light">ეს გვერდი ვერ ვიპოვეთ</h1>
      <p className="mt-3 max-w-sm text-[15px] text-subtle">
        შეიძლება ბმული შეიცვალა ან პროდუქტი აღარ იყიდება. სცადე მაღაზიიდან.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink to="/shop">მაღაზიაში გადასვლა</ButtonLink>
        <ButtonLink to="/" variant="outline">
          მთავარი
        </ButtonLink>
      </div>
    </Container>
  );
}
