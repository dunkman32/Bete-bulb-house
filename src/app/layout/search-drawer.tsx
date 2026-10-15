import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Search } from 'lucide-react';
import { useDeferredValue, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { Container } from '@/components/ui/container';
import { Drawer } from '@/components/ui/drawer';
import { Picture } from '@/components/ui/picture';
import { Price } from '@/components/ui/price';
import { productsQuery } from '@/features/catalog/api/catalog-queries';

const POPULAR = ['რელსი', 'LED ზოლი', 'E27', 'სენსორული', 'როზეტი', 'დიმერი'];

/** Search from the header: live results while typing, Enter for the full list. */
export function SearchDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [term, setTerm] = useState('');

  // The dialog focuses its ✕ on opening (Drawer's effect runs first): move focus to the field.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);
  const search = useDeferredValue(term.trim());
  const { data: results } = useQuery({
    ...productsQuery({ search, limit: 4 }),
    enabled: search.length >= 2,
  });

  const showAll = (value: string) => {
    onClose();
    navigate(`/shop?search=${encodeURIComponent(value)}`);
  };

  return (
    <Drawer open={open} onClose={onClose} side="top" title="ძიება" className="max-h-[85dvh]">
      <Container className="max-w-4xl py-6">
        <form
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            if (term.trim()) showAll(term.trim());
          }}
          className="flex items-center gap-3 border-b border-foreground pb-3"
        >
          <Search className="size-5 shrink-0" strokeWidth={1.5} />
          <input
            ref={inputRef}
            type="search"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            placeholder="რას ეძებ?"
            aria-label="ძიება"
            className="min-w-0 flex-1 bg-transparent font-display text-2xl font-light outline-none placeholder:text-muted-foreground"
          />
        </form>

        {search.length < 2 ? (
          <div className="mt-6">
            <p className="text-xs tracking-[0.08em] text-muted-foreground uppercase">პოპულარული</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {POPULAR.map((word) => (
                <li key={word}>
                  <button
                    type="button"
                    onClick={() => showAll(word)}
                    className="cursor-pointer rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-foreground"
                  >
                    {word}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : results?.length === 0 ? (
          <p className="mt-8 text-subtle">„{search}“ — ვერაფერი ვიპოვეთ. სცადე სხვა სიტყვა.</p>
        ) : (
          <>
            <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {results?.map((product) => (
                <li key={product.id}>
                  <Link to={`/product/${product.slug}`} onClick={onClose} className="group block">
                    <div className="aspect-[4/5] overflow-hidden rounded-xl bg-muted">
                      {product.images[0] && (
                        <Picture
                          image={product.images[0]}
                          sizes="(min-width: 640px) 200px, 45vw"
                          className="transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                      )}
                    </div>
                    <p className="mt-2 text-sm">{product.title}</p>
                    <Price
                      price={product.price}
                      compareAtPrice={product.compareAtPrice}
                      className="text-sm text-subtle"
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => showAll(search)}
              className="group mt-6 inline-flex cursor-pointer items-center gap-2 text-sm font-medium"
            >
              <span className="border-b border-foreground/30 pb-0.5 group-hover:border-foreground">
                ყველა შედეგი
              </span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </button>
          </>
        )}
      </Container>
    </Drawer>
  );
}
