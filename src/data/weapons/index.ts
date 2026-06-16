import type { WeaponSystem } from '@/types';
import { MISSILES } from './missiles';
import { GUNS } from './guns';
import { DEFENSE } from './defense';
import { SENSORS } from './sensors';
import { LAUNCHERS } from './launchers';

// Aggregated seed weapon catalog. Each sub-module is `satisfies WeaponSystem[]`
// so the data stays type-strict (spec §7).
export const WEAPONS: WeaponSystem[] = [
  ...MISSILES,
  ...GUNS,
  ...DEFENSE,
  ...SENSORS,
  ...LAUNCHERS,
];

export const WEAPONS_BY_ID: Map<string, WeaponSystem> = new Map(
  WEAPONS.map((w) => [w.id, w])
);
