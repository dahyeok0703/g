import { describe, expect, it } from 'vitest';
import { WEAPONS_BY_ID } from './weapons';
import { PLATFORMS, PLATFORMS_BY_ID } from './platforms';
import { COUNTRY_DIRECTORY } from './countries/directory';
import { EAST_ASIA } from './countries/east-asia';
import { SOUTHEAST_ASIA } from './countries/southeast-asia';
import { SOUTH_ASIA } from './countries/south-asia';
import { PACIFIC } from './countries/pacific';
import { MIDDLE_EAST } from './countries/middle-east';
import { EUROPE } from './countries/europe';
import { AFRICA } from './countries/africa';
import { AMERICAS } from './countries/americas';
import type { Country } from '@/types';

const ALL_COUNTRIES: Country[] = [
  ...EAST_ASIA,
  ...SOUTHEAST_ASIA,
  ...SOUTH_ASIA,
  ...PACIFIC,
  ...MIDDLE_EAST,
  ...EUROPE,
  ...AFRICA,
  ...AMERICAS,
];

describe('weapon ↔ platform references', () => {
  it('every armament mount + loadout resolves to a weapon', () => {
    const dangling: string[] = [];
    for (const p of PLATFORMS) {
      for (const m of p.armament) {
        if (!WEAPONS_BY_ID.has(m.weaponSystemId)) dangling.push(`${p.id}:${m.weaponSystemId}`);
        for (const l of m.loadout ?? []) {
          if (!WEAPONS_BY_ID.has(l.weaponSystemId)) dangling.push(`${p.id}:loadout:${l.weaponSystemId}`);
        }
      }
    }
    expect(dangling).toEqual([]);
  });
});

describe('country ↔ platform references', () => {
  it('every inventory entry resolves to a platform', () => {
    const dangling: string[] = [];
    for (const c of ALL_COUNTRIES) {
      for (const branch of [c.army, c.navy, c.airForce, c.strategic ?? []]) {
        for (const e of branch) {
          if (!PLATFORMS_BY_ID.has(e.platformId)) dangling.push(`${c.id}:${e.platformId}`);
        }
      }
    }
    expect(dangling).toEqual([]);
  });
});

describe('directory ↔ region data consistency', () => {
  it('every directory entry has matching region data and vice versa', () => {
    const dataIds = new Set(ALL_COUNTRIES.map((c) => c.id));
    const dirIds = new Set(COUNTRY_DIRECTORY.map((c) => c.id));
    const missingData = [...dirIds].filter((id) => !dataIds.has(id));
    const missingDir = [...dataIds].filter((id) => !dirIds.has(id));
    expect({ missingData, missingDir }).toEqual({ missingData: [], missingDir: [] });
  });

  it('directory region/tier matches the country record', () => {
    const byId = new Map(ALL_COUNTRIES.map((c) => [c.id, c]));
    const mismatched: string[] = [];
    for (const meta of COUNTRY_DIRECTORY) {
      const c = byId.get(meta.id);
      if (c && (c.region !== meta.region || c.dataTier !== meta.dataTier || c.hasMilitary !== meta.hasMilitary)) {
        mismatched.push(meta.id);
      }
    }
    expect(mismatched).toEqual([]);
  });
});
