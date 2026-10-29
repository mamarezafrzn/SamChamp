import { createHash } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

import { LOGO_SOURCE } from "@/lib/club-logos";

/*
 * Caching proxy for club logos. The backend serves each logo slowly and forbids
 * caching, so this route fetches every logo from it once, keeps it on disk, and
 * serves it to browsers with long cache headers. Saved logos are refreshed in the
 * background once they're a day old, so changed logos still show up.
 */

// .next/cache survives rebuilds and is already git-ignored.
const CACHE_DIR = path.join(process.cwd(), ".next", "cache", "club-logos");
const REFRESH_AFTER_SECONDS = 24 * 60 * 60;
/** Requests to the backend at once, so a burst can't overload it. */
const MAX_UPSTREAM_REQUESTS = 4;
const UPSTREAM_TIMEOUT_MS = 60_000;
const MAX_LOGO_BYTES = 2 * 1024 * 1024;
/** Path parts may only be file-name characters, which also rules out "../" tricks. */
const SAFE_SEGMENT = /^[\w-]+(\.[\w-]+)*$/;

interface Logo {
  body: Buffer;
  contentType: string;
  fetchedAt: number;
}

type FetchResult = { ok: true; logo: Logo } | { ok: false; status: number };

const inFlight = new Map<string, Promise<FetchResult>>();
let activeUpstream = 0;
const waitingForSlot: (() => void)[] = [];

async function withUpstreamSlot<T>(task: () => Promise<T>) {
  if (activeUpstream >= MAX_UPSTREAM_REQUESTS) {
    await new Promise<void>((resolve) => waitingForSlot.push(resolve));
  }
  activeUpstream++;
  try {
    return await task();
  } finally {
    activeUpstream--;
    waitingForSlot.shift()?.();
  }
}

const cacheFile = (key: string, ext: string) =>
  path.join(CACHE_DIR, `${key}.${ext}`);

async function readSaved(key: string): Promise<Logo | null> {
  try {
    const meta = JSON.parse(await readFile(cacheFile(key, "json"), "utf8"));
    const body = await readFile(cacheFile(key, "img"));
    return { body, contentType: meta.contentType, fetchedAt: meta.fetchedAt };
  } catch {
    return null;
  }
}

async function save(key: string, logo: Logo) {
  await mkdir(CACHE_DIR, { recursive: true });
  // Write to a temporary file first, so a reader never sees half a logo.
  const tmp = cacheFile(key, `${process.pid}.tmp`);
  await writeFile(tmp, logo.body);
  await rename(tmp, cacheFile(key, "img"));
  await writeFile(
    cacheFile(key, "json"),
    JSON.stringify({
      contentType: logo.contentType,
      fetchedAt: logo.fetchedAt,
    }),
  );
}

/** Fetches a logo from the backend and saves it; concurrent calls for one logo share a request. */
function fetchAndSave(key: string, relativePath: string): Promise<FetchResult> {
  const pending = inFlight.get(key);
  if (pending) return pending;

  const task = withUpstreamSlot(async (): Promise<FetchResult> => {
    try {
      const res = await fetch(LOGO_SOURCE + relativePath, {
        cache: "no-store",
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      });
      const contentType = res.headers.get("content-type") ?? "";
      if (!res.ok) return { ok: false, status: res.status };
      if (!contentType.startsWith("image/")) return { ok: false, status: 502 };

      const body = Buffer.from(await res.arrayBuffer());
      if (body.length > MAX_LOGO_BYTES) return { ok: false, status: 502 };

      const logo = { body, contentType, fetchedAt: Date.now() };
      await save(key, logo);
      return { ok: true, logo };
    } catch {
      return { ok: false, status: 504 };
    }
  }).finally(() => inFlight.delete(key));

  inFlight.set(key, task);
  return task;
}

function logoResponse(logo: Logo) {
  return new Response(new Uint8Array(logo.body), {
    headers: {
      "Content-Type": logo.contentType,
      // Browsers keep it for a day, then may show it while checking for a newer one.
      "Cache-Control": `public, max-age=${REFRESH_AFTER_SECONDS}, stale-while-revalidate=${7 * REFRESH_AFTER_SECONDS}`,
    },
  });
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await params;
  if (!LOGO_SOURCE || !segments.every((part) => SAFE_SEGMENT.test(part))) {
    return new Response(null, { status: 404 });
  }

  const relativePath = segments.join("/");
  const key = createHash("sha1").update(relativePath).digest("hex");

  const saved = await readSaved(key);
  if (saved) {
    // Serve the saved copy right away; refresh it in the background once it's old.
    if (Date.now() - saved.fetchedAt > REFRESH_AFTER_SECONDS * 1000) {
      void fetchAndSave(key, relativePath);
    }
    return logoResponse(saved);
  }

  const result = await fetchAndSave(key, relativePath);
  return result.ok
    ? logoResponse(result.logo)
    : new Response(null, { status: result.status });
}
