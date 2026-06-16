import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Country, Platform, WeaponSystem } from '@/types';

// User-created weapons / platforms / countries (spec §4.3). Persisted to
// localStorage. The creator UI (Stage 9) writes here; the catalog, compare and
// simulator read custom items alongside the seed catalog.

export interface CustomState {
  weapons: WeaponSystem[];
  platforms: Platform[];
  countries: Country[];

  addWeapon: (w: WeaponSystem) => void;
  updateWeapon: (w: WeaponSystem) => void;
  removeWeapon: (id: string) => void;

  addPlatform: (p: Platform) => void;
  updatePlatform: (p: Platform) => void;
  removePlatform: (id: string) => void;

  addCountry: (c: Country) => void;
  removeCountry: (id: string) => void;

  /** Replace the entire custom dataset (JSON import, spec §4.3). */
  importAll: (data: Partial<Pick<CustomState, 'weapons' | 'platforms' | 'countries'>>) => void;
  clearAll: () => void;
}

const upsert = <T extends { id: string }>(list: T[], item: T): T[] => {
  const i = list.findIndex((x) => x.id === item.id);
  if (i === -1) return [...list, item];
  const copy = list.slice();
  copy[i] = item;
  return copy;
};

export const useCustomStore = create<CustomState>()(
  persist(
    (set) => ({
      weapons: [],
      platforms: [],
      countries: [],

      addWeapon: (w) => set((s) => ({ weapons: upsert(s.weapons, { ...w, isCustom: true }) })),
      updateWeapon: (w) => set((s) => ({ weapons: upsert(s.weapons, w) })),
      removeWeapon: (id) => set((s) => ({ weapons: s.weapons.filter((w) => w.id !== id) })),

      addPlatform: (p) => set((s) => ({ platforms: upsert(s.platforms, { ...p, isCustom: true }) })),
      updatePlatform: (p) => set((s) => ({ platforms: upsert(s.platforms, p) })),
      removePlatform: (id) => set((s) => ({ platforms: s.platforms.filter((p) => p.id !== id) })),

      addCountry: (c) => set((s) => ({ countries: upsert(s.countries, c) })),
      removeCountry: (id) => set((s) => ({ countries: s.countries.filter((c) => c.id !== id) })),

      importAll: (data) =>
        set((s) => ({
          weapons: data.weapons ?? s.weapons,
          platforms: data.platforms ?? s.platforms,
          countries: data.countries ?? s.countries,
        })),
      clearAll: () => set({ weapons: [], platforms: [], countries: [] }),
    }),
    { name: 'gmdb:custom:v1' }
  )
);
