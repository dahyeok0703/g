import type { Platform, WeaponSystem } from '@/types';
import { WEAPONS, WEAPONS_BY_ID } from './weapons';
import { PLATFORMS, PLATFORMS_BY_ID } from './platforms';
import {
  weaponCombatValue,
  platformCombatValue,
} from '@/lib/combatValue';

// Unified data access. Weapons + platforms are small and eagerly loaded;
// country order-of-battle loads lazily per region (see countries/index.ts).
// Custom user items are layered on top by the store (Stage 9) — these helpers
// accept an optional `extra` lookup so custom data participates in resolution.

export { WEAPONS, PLATFORMS };
export { COUNTRY_DIRECTORY, DIRECTORY_BY_ID, DIRECTORY_BY_REGION } from './countries/directory';
export { loadRegion, loadCountry } from './countries';
export { REGIONS, REGION_BY_ID } from './regions';

export function getWeapon(
  id: string,
  extra?: Map<string, WeaponSystem>
): WeaponSystem | undefined {
  return extra?.get(id) ?? WEAPONS_BY_ID.get(id);
}

export function getPlatform(
  id: string,
  extra?: Map<string, Platform>
): Platform | undefined {
  return extra?.get(id) ?? PLATFORMS_BY_ID.get(id);
}

/** Combat value for a weapon, with custom items considered. */
export function valueOfWeapon(
  id: string,
  extra?: Map<string, WeaponSystem>
): number {
  const w = getWeapon(id, extra);
  return w ? weaponCombatValue(w) : 0;
}

/** Combat value for a platform, resolving its mounted weapons. */
export function valueOfPlatform(
  id: string,
  extraPlatforms?: Map<string, Platform>,
  extraWeapons?: Map<string, WeaponSystem>
): number {
  const p = getPlatform(id, extraPlatforms);
  if (!p) return 0;
  return platformCombatValue(p, (wid) => getWeapon(wid, extraWeapons));
}

/** Reverse lookup: which seed platforms mount a given weapon. */
export function platformsUsingWeapon(weaponId: string): Platform[] {
  return PLATFORMS.filter((p) =>
    p.armament.some(
      (m) =>
        m.weaponSystemId === weaponId ||
        m.loadout?.some((l) => l.weaponSystemId === weaponId)
    )
  );
}
