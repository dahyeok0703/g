import { useEffect, useState } from 'react';
import { DIRECTORY_BY_ID } from '@/data/countries/directory';
import { loadCountry } from '@/data/countries';
import type { RegionId } from '@/data/regions';
import type { Country, CountryMeta } from '@/types';

interface CountryState {
  meta?: CountryMeta;
  country?: Country;
  loading: boolean;
  notFound: boolean;
}

/** Resolve a country's full order-of-battle, lazy-loading its region chunk. */
export function useCountry(id: string | undefined): CountryState {
  const [state, setState] = useState<CountryState>({ loading: true, notFound: false });

  useEffect(() => {
    let alive = true;
    if (!id) {
      setState({ loading: false, notFound: true });
      return;
    }
    const meta = DIRECTORY_BY_ID.get(id);
    if (!meta) {
      setState({ loading: false, notFound: true });
      return;
    }
    setState({ loading: true, notFound: false, meta });
    loadCountry(id, meta.region as RegionId).then((country) => {
      if (!alive) return;
      setState({ loading: false, notFound: !country, meta, country });
    });
    return () => {
      alive = false;
    };
  }, [id]);

  return state;
}
