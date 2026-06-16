import type { Country } from '@/types';
import type { RegionId } from '@/data/regions';

// Per-region lazy loaders (code-splitting, spec §1/§5). Each region's full
// order-of-battle is a separate chunk fetched on demand and memoized.
const REGION_LOADERS: Record<RegionId, () => Promise<{ default?: unknown } & Record<string, unknown>>> = {
  'east-asia': () => import('./east-asia'),
  'southeast-asia': () => import('./southeast-asia'),
  'south-asia': () => import('./south-asia'),
  pacific: () => import('./pacific'),
  'middle-east': () => import('./middle-east'),
  europe: () => import('./europe'),
  africa: () => import('./africa'),
  americas: () => import('./americas'),
};

const regionCache = new Map<RegionId, Country[]>();
const countryCache = new Map<string, Country>();

/** Load (and memoize) every country in a region. */
export async function loadRegion(region: RegionId): Promise<Country[]> {
  const cached = regionCache.get(region);
  if (cached) return cached;

  const mod = await REGION_LOADERS[region]();
  // each module exports a single Country[] under an UPPER_SNAKE name
  const arr = (Object.values(mod).find((v) => Array.isArray(v)) ??
    []) as Country[];

  regionCache.set(region, arr);
  for (const c of arr) countryCache.set(c.id, c);
  return arr;
}

/** Load a single country by id, resolving its region from the directory. */
export async function loadCountry(
  id: string,
  region: RegionId
): Promise<Country | undefined> {
  if (countryCache.has(id)) return countryCache.get(id);
  await loadRegion(region);
  return countryCache.get(id);
}
