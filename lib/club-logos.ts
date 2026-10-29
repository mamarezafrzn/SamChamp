const API_URL = process.env.NEXT_PUBLIC_API_URL;

/** Where the backend serves club logos. */
export const LOGO_SOURCE = API_URL
  ? new URL("display-image/samchamp/clubs/", API_URL).href
  : null;

/** Our caching proxy for those logos (app/club-logos/[...path]/route.ts). */
const LOGO_PROXY_PATH = "/club-logos/";

/** Points a backend logo URL at our caching proxy; any other URL is returned unchanged. */
export function toProxiedLogo(url: string) {
  return LOGO_SOURCE && url.startsWith(LOGO_SOURCE)
    ? LOGO_PROXY_PATH + url.slice(LOGO_SOURCE.length)
    : url;
}
