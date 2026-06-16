import { useEffect, useState } from 'react';
import { DIRECTORY_BY_ID } from '@/data/countries/directory';
import { loadCountry } from '@/data/countries';
import { useCustomStore } from '@/store/useCustomStore';
import type { RegionId } from '@/data/regions';
import type { Country } from '@/types';

/** Load several countries by id (seed via lazy region chunks, plus custom). */
export function useCountries(ids: string[]): { countries: Country[]; loading: boolean } {
  const custom = useCustomStore((s) => s.countries);
  const [map, setMap] = useState<Map<string, Country>>(new Map());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let alive = true;
    const missing = ids.filter(
      (id) => !map.has(id) && !custom.some((c) => c.id === id)
    );
    if (missing.length === 0) return;
    setLoading(true);
    Promise.all(
      missing.map((id) => {
        const meta = DIRECTORY_BY_ID.get(id);
        return meta ? loadCountry(id, meta.region as RegionId) : Promise.resolve(undefined);
      })
    ).then((loaded) => {
      if (!alive) return;
      setMap((prev) => {
        const next = new Map(prev);
        for (const c of loaded) if (c) next.set(c.id, c);
        return next;
      });
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, [ids, map, custom]);

  const countries = ids
    .map((id) => map.get(id) ?? custom.find((c) => c.id === id))
    .filter((c): c is Country => Boolean(c));

  return { countries, loading };
}
