import type { ImageRef } from '@/lib/types';

// ImageProvider (spec §3-A). All requests go through the `/api/image` proxy
// (which holds the search key and runs the fallback chain server-side). The
// client adds a localStorage cache so the same query never re-fetches.

const CACHE_KEY = 'fitday:imgcache:v1';
const memo = new Map<string, ImageRef | null>();
const inflight = new Map<string, Promise<ImageRef | null>>();

type CacheShape = Record<string, ImageRef | null>;

function loadCache(): CacheShape {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) ?? '{}');
  } catch {
    return {};
  }
}

function persist(query: string, ref: ImageRef | null) {
  try {
    const cache = loadCache();
    cache[query] = ref;
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    /* quota / private mode — memo still works for the session */
  }
}

export async function getImage(query: string): Promise<ImageRef | null> {
  const key = query.trim();
  if (!key) return null;
  if (memo.has(key)) return memo.get(key)!;

  const disk = loadCache();
  if (key in disk) {
    memo.set(key, disk[key]);
    return disk[key];
  }

  if (inflight.has(key)) return inflight.get(key)!;

  const p = (async () => {
    try {
      const res = await fetch(
        `/api/image?q=${encodeURIComponent(key)}`
      );
      if (!res.ok) throw new Error(`image proxy ${res.status}`);
      const data = (await res.json()) as { image: ImageRef | null };
      const ref = data.image ?? null;
      memo.set(key, ref);
      persist(key, ref);
      return ref;
    } catch {
      // Don't cache transient failures to disk — allow a later retry.
      memo.set(key, null);
      return null;
    } finally {
      inflight.delete(key);
    }
  })();

  inflight.set(key, p);
  return p;
}

export function clearImageCache() {
  memo.clear();
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch {
    /* ignore */
  }
}
