import { useState, type CSSProperties } from 'react';

import { Picture } from '@/components/ui/picture';
import type { ImageAsset } from '@/lib/image';
import { cn } from '@/lib/cn';

/**
 * Phones: a swipeable strip with dots. Desktop: the photos in a two-column grid (one photo takes
 * the full width). A bulb's photos (`light`) switch on in the dark theme.
 */
export function ProductGallery({
  images,
  light,
}: {
  images: ImageAsset[];
  light?: CSSProperties | null;
}) {
  const [current, setCurrent] = useState(0);
  const single = images.length === 1;

  return (
    <div className="relative">
      <ul
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory overflow-x-auto sm:mx-0 sm:gap-3 lg:grid lg:grid-cols-2 lg:overflow-visible"
        onScroll={(event) => {
          const list = event.currentTarget;
          setCurrent(Math.round(list.scrollLeft / list.clientWidth));
        }}
      >
        {images.map((image, index) => (
          <li
            key={image.url}
            className={cn(
              'relative aspect-[4/5] w-full shrink-0 snap-center overflow-hidden bg-muted sm:rounded-2xl',
              single && 'lg:col-span-2 lg:aspect-[5/6]',
              light && 'bulb-halo',
            )}
            style={light ?? undefined}
          >
            <div className={cn('absolute inset-0', light && 'bulb-photo')}>
              <Picture
                image={image}
                sizes={
                  single ? '(min-width: 1024px) 58vw, 100vw' : '(min-width: 1024px) 29vw, 100vw'
                }
                priority={index === 0}
              />
            </div>
            {light && <div aria-hidden className="bulb-glow absolute inset-0" />}
          </li>
        ))}
      </ul>
      {!single && (
        <div
          className="absolute inset-x-0 bottom-4 flex justify-center gap-1.5 lg:hidden"
          aria-hidden
        >
          {images.map((image, index) => (
            <span
              key={image.url}
              className={cn(
                'h-1.5 rounded-full bg-on-scrim transition-all duration-300',
                index === current ? 'w-5' : 'w-1.5 opacity-60',
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
