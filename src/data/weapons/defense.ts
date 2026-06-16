import type { WeaponSystem } from '@/types';

// Point-defense CIWS, torpedoes, rockets/MLRS munitions, countermeasures.
export const DEFENSE = [
  // ── CIWS ────────────────────────────────────────────────────────────
  { id: 'phalanx', name: 'Mk 15 Phalanx CIWS', nameKo: '팰렁스 CIWS', category: 'ciws', origin: 'US', introduced: 1980, caliber_mm: 20, rof_rpm: 4500, range_km: 4 },
  { id: 'goalkeeper', name: 'Goalkeeper CIWS', nameKo: '골키퍼', category: 'ciws', origin: 'NL', introduced: 1979, caliber_mm: 30, rof_rpm: 4200, range_km: 5 },
  { id: 'ak-630', name: 'AK-630 CIWS', nameKo: 'AK-630', category: 'ciws', origin: 'RU', introduced: 1976, caliber_mm: 30, rof_rpm: 5000, range_km: 4 },
  { id: 'ram', name: 'RIM-116 RAM', nameKo: 'RAM', category: 'ciws', origin: 'US', introduced: 1992, range_km: 9, speed_mach: 2, warhead_kg: 11, guidance: ['infrared', 'anti-radiation'] },
  { id: 'type1130', name: 'Type 1130 CIWS', nameKo: 'Type 1130', category: 'ciws', origin: 'CN', introduced: 2011, caliber_mm: 30, rof_rpm: 11000, range_km: 4, dataConfidence: 'medium' },

  // ── Torpedoes ───────────────────────────────────────────────────────
  { id: 'mk48-torpedo', name: 'Mk 48 ADCAP', nameKo: 'Mk48 어뢰', category: 'torpedo', origin: 'US', introduced: 1988, range_km: 38, speed_mach: 0.05, warhead_kg: 295, guidance: ['active-passive-sonar', 'wire-guided'] },
  { id: 'mk46-torpedo', name: 'Mk 46', nameKo: 'Mk46 경어뢰', category: 'torpedo', origin: 'US', introduced: 1967, range_km: 11, warhead_kg: 44, guidance: ['active-passive-sonar'] },
  { id: 'mk54-torpedo', name: 'Mk 54 MAKO', nameKo: 'Mk54 경어뢰', category: 'torpedo', origin: 'US', introduced: 2004, range_km: 9, warhead_kg: 44, guidance: ['active-passive-sonar'] },
  { id: 'type53', name: '53-65 Torpedo', nameKo: '53형 어뢰', category: 'torpedo', origin: 'RU', introduced: 1965, range_km: 18, warhead_kg: 300, guidance: ['wake-homing'] },
  { id: 'blackshark', name: 'Black Shark', nameKo: '블랙샤크', category: 'torpedo', origin: 'IT', introduced: 2004, range_km: 50, warhead_kg: 250, guidance: ['active-passive-sonar', 'wire-guided'] },

  // ── Rockets / MLRS ──────────────────────────────────────────────────
  { id: 'gmlrs', name: 'GMLRS (M31)', nameKo: 'GMLRS 유도로켓', category: 'rocket', origin: 'US', introduced: 2005, range_km: 70, warhead_kg: 90, guidance: ['gps', 'inertial'] },
  { id: 'k239-rocket', name: 'K239 Chunmoo 239mm', nameKo: '천무 239mm', category: 'rocket', origin: 'KR', introduced: 2015, range_km: 80, warhead_kg: 90, guidance: ['gps', 'inertial'] },
  { id: 'smerch', name: '9M55 Smerch 300mm', nameKo: '스메르치 300mm', category: 'rocket', origin: 'RU', introduced: 1989, range_km: 90, warhead_kg: 243, guidance: ['inertial'] },

  // ── Countermeasures ─────────────────────────────────────────────────
  { id: 'nulka', name: 'Nulka Decoy', nameKo: '눌카 디코이', category: 'countermeasure', origin: 'AU', introduced: 1999, range_km: 5, guidance: ['active-rf-decoy'] },
  { id: 'mk53-nixie', name: 'AN/SLQ-25 Nixie', nameKo: '닉시 예인 디코이', category: 'countermeasure', origin: 'US', introduced: 1987, guidance: ['acoustic-decoy'] },
] satisfies readonly WeaponSystem[];
