import type { IncomingMessage, ServerResponse } from 'node:http';
import { getQuery, sendJson } from './_util';

// Image-sourcing proxy (spec §3-A). Runs the fallback chain server-side and
// returns a single best photo (or null → the client shows an icon fallback).
// Keys live only here. Provider is selected by IMAGE_SEARCH_PROVIDER.

interface ImageRef {
  url: string;
  source: string;
  link: string;
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> {
  const q = getQuery(req, 'q')?.trim();
  if (!q) {
    sendJson(res, 400, { error: 'missing_query' });
    return;
  }

  try {
    const image = await sourceImage(q);
    // Cache successful lookups at the edge for a day.
    if (image) res.setHeader('cache-control', 'public, max-age=86400');
    sendJson(res, 200, { image });
  } catch {
    sendJson(res, 200, { image: null });
  }
}

async function sourceImage(query: string): Promise<ImageRef | null> {
  const provider = (process.env.IMAGE_SEARCH_PROVIDER || 'serpapi').toLowerCase();
  const chain: (() => Promise<ImageRef | null>)[] = [];

  if (provider === 'bing') chain.push(() => fromBing(query));
  else chain.push(() => fromSerpApi(query));

  // mood-cut / failure fallbacks
  chain.push(() => fromUnsplash(query));
  chain.push(() => fromPexels(query));

  for (const step of chain) {
    try {
      const ref = await step();
      if (ref?.url) return ref;
    } catch {
      /* try next provider */
    }
  }
  return null;
}

async function fromSerpApi(query: string): Promise<ImageRef | null> {
  const key = process.env.IMAGE_SEARCH_KEY;
  if (!key) return null;
  const url = `https://serpapi.com/search.json?engine=google_images&ijn=0&q=${encodeURIComponent(
    query
  )}&api_key=${key}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = (await res.json()) as {
    images_results?: { original?: string; thumbnail?: string; link?: string }[];
  };
  const hit = data.images_results?.find((r) => r.original || r.thumbnail);
  if (!hit) return null;
  return {
    url: hit.original || hit.thumbnail!,
    source: 'google',
    link: hit.link || hit.original || '',
  };
}

async function fromBing(query: string): Promise<ImageRef | null> {
  const key = process.env.IMAGE_SEARCH_KEY;
  if (!key) return null;
  const url = `https://api.bing.microsoft.com/v7.0/images/search?count=5&mkt=ko-KR&q=${encodeURIComponent(
    query
  )}`;
  const res = await fetch(url, {
    headers: { 'Ocp-Apim-Subscription-Key': key },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as {
    value?: { contentUrl?: string; hostPageUrl?: string }[];
  };
  const hit = data.value?.find((v) => v.contentUrl);
  if (!hit) return null;
  return {
    url: hit.contentUrl!,
    source: 'bing',
    link: hit.hostPageUrl || hit.contentUrl!,
  };
}

async function fromUnsplash(query: string): Promise<ImageRef | null> {
  const key = process.env.UNSPLASH_KEY;
  if (!key) return null;
  const url = `https://api.unsplash.com/search/photos?per_page=1&query=${encodeURIComponent(
    query
  )}&client_id=${key}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = (await res.json()) as {
    results?: { urls?: { regular?: string }; links?: { html?: string } }[];
  };
  const hit = data.results?.[0];
  if (!hit?.urls?.regular) return null;
  return {
    url: hit.urls.regular,
    source: 'unsplash',
    link: hit.links?.html || '',
  };
}

async function fromPexels(query: string): Promise<ImageRef | null> {
  const key = process.env.PEXELS_KEY;
  if (!key) return null;
  const url = `https://api.pexels.com/v1/search?per_page=1&query=${encodeURIComponent(
    query
  )}`;
  const res = await fetch(url, { headers: { Authorization: key } });
  if (!res.ok) return null;
  const data = (await res.json()) as {
    photos?: { src?: { large?: string }; url?: string }[];
  };
  const hit = data.photos?.[0];
  if (!hit?.src?.large) return null;
  return { url: hit.src.large, source: 'pexels', link: hit.url || '' };
}
