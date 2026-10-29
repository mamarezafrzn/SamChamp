// Every URL already handed to the preloader, and the images themselves, kept
// referenced so the browser holds on to them while the app is open.
const requested = new Set<string>();
const kept: HTMLImageElement[] = [];

/**
 * Downloads images in the background, a few at a time, so `<img>` tags with the same
 * URLs show instantly later. Works even when the server forbids caching, because the
 * browser reuses images the open page has already loaded.
 *
 * Keep `concurrency` below 6: browsers open at most 6 connections per server over
 * HTTP/1.1, and API requests to the same server need the rest.
 */
export function preloadImages(urls: string[], concurrency = 4) {
  const queue = urls.filter((url) => !requested.has(url));
  queue.forEach((url) => requested.add(url));

  const loadNext = () => {
    const url = queue.shift();
    if (!url) return;
    const image = new Image();
    image.onload = image.onerror = loadNext;
    image.src = url;
    kept.push(image);
  };

  for (let i = 0; i < concurrency; i++) loadNext();
}
