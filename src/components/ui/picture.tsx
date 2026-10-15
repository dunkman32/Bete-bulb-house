import { useState } from 'react';

import { cn } from '@/lib/cn';
import { imageSrc, imageSrcSet, type ImageAsset } from '@/lib/image';

type PictureProps = {
  image: ImageAsset;
  /** The rendered width per breakpoint, so the browser picks the right file. */
  sizes: string;
  /** Above the fold: load at once, with high priority. */
  priority?: boolean;
  maxWidth?: number;
  className?: string;
};

/** A responsive CDN image that fades in once loaded (the parent gives it its box). */
export function Picture({ image, sizes, priority, maxWidth, className }: PictureProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={imageSrc(image, 800)}
      srcSet={imageSrcSet(image, maxWidth)}
      sizes={sizes}
      alt={image.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      ref={(element) => {
        // Cached images are complete before React attaches onLoad.
        if (element?.complete) setLoaded(true);
      }}
      onLoad={() => setLoaded(true)}
      className={cn(
        'size-full object-cover transition-opacity duration-700',
        loaded ? 'opacity-100' : 'opacity-0',
        className,
      )}
    />
  );
}
