/** An image as the CMS / commerce backend gives it: the original's URL and its alt text. */
export type ImageAsset = { url: string; alt: string };

export const IMAGE_WIDTHS = [320, 480, 640, 800, 1080, 1440, 1920] as const;

/**
 * The image resized on the CDN. Today's mock images are Unsplash's (imgix parameters); when the
 * CMS lands, this is the one place to switch to its image API (Sanity, Storyblok, Cloudinary, …).
 */
export function imageSrc(image: ImageAsset, width: number) {
  const url = new URL(image.url);
  url.searchParams.set('w', String(width));
  url.searchParams.set('q', '75');
  url.searchParams.set('auto', 'format');
  url.searchParams.set('fit', 'max');
  return url.toString();
}

export function imageSrcSet(image: ImageAsset, maxWidth = 1920) {
  return IMAGE_WIDTHS.filter((width) => width <= maxWidth)
    .map((width) => `${imageSrc(image, width)} ${width}w`)
    .join(', ');
}
