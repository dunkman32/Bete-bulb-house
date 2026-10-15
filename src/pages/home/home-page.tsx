import { useQuery } from '@tanstack/react-query';

import { HolidayBanner } from '@/components/shared/holiday-banner';
import { Container } from '@/components/ui/container';
import { PageTitle } from '@/components/ui/page-title';
import { SectionHeading } from '@/components/ui/section-heading';
import { categoriesQuery, productsQuery } from '@/features/catalog/api/catalog-queries';
import { KelvinScale } from '@/features/catalog/components/kelvin-scale';
import { ProductGrid } from '@/features/catalog/components/product-grid';
import { ProductRail } from '@/features/catalog/components/product-rail';
import { homePageQuery } from '@/features/content/api/content-queries';

import { CategoryTiles } from './category-tiles';
import { Editorial } from './editorial';
import { Hero } from './hero';
import { Lookbook } from './lookbook';
import { Perks } from './perks';

export function HomePage() {
  const { data: home } = useQuery(homePageQuery());
  const { data: categories } = useQuery(categoriesQuery());
  const { data: newArrivals } = useQuery(productsQuery({ sort: 'new', limit: 8 }));
  const { data: bestsellers } = useQuery(productsQuery({ tag: 'bestseller', limit: 8 }));

  return (
    <>
      <PageTitle />
      <Hero hero={home?.hero} />

      <Container className="mt-16 space-y-24 sm:mt-24 sm:space-y-32">
        {home && <Perks perks={home.perks} />}

        {home?.holiday && <HolidayBanner {...home.holiday} className="reveal" />}

        <CategoryTiles categories={categories?.filter((category) => !category.seasonal)} />

        <section className="reveal">
          <SectionHeading
            eyebrow="ახალი შემოსვლები"
            title="სიახლეები"
            link={{ label: 'ყველა სიახლე', to: '/shop?tag=new' }}
          />
          <ProductGrid products={newArrivals} className="mt-8" />
        </section>
      </Container>

      <Editorial editorial={home?.editorial} />

      <Container className="space-y-24 sm:space-y-32">
        <div className="reveal">
          <ProductRail
            eyebrow="ყველაზე გაყიდვადი"
            title="ბესტსელერები"
            link={{ label: 'ყველა პროდუქტი', to: '/shop' }}
            products={bestsellers}
          />
        </div>

        <section className="reveal">
          <SectionHeading
            eyebrow="გზამკვლევი"
            title="რომელი სინათლე ავირჩიო?"
            link={{ label: 'LED განათება', to: '/shop/led' }}
          />
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-subtle">
            ფერის ტემპერატურა (K) განსაზღვრავს ოთახის განწყობას. თბილი სინათლე ამშვიდებს, ცივი —
            აფხიზლებს. აირჩიე ოთახის მიხედვით:
          </p>
          <KelvinScale className="mt-8" />
        </section>

        {home && <Lookbook lookbook={home.lookbook} />}
      </Container>
    </>
  );
}
