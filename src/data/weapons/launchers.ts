import type { WeaponSystem } from '@/types';

// Launch systems referenced as a mount's primary weaponSystemId (the actual
// munitions live in the mount's `loadout`). See spec §2.2 (Arleigh Burke / Mk41).
export const LAUNCHERS = [
  { id: 'mk41-vls', name: 'Mk 41 Vertical Launching System', nameKo: 'Mk41 수직발사기', category: 'launcher', origin: 'US', introduced: 1986, notes: 'SM-2/SM-6/ESSM/Tomahawk 등 혼재 적재' },
] satisfies readonly WeaponSystem[];
