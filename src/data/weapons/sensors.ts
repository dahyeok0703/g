import type { WeaponSystem } from '@/types';

// Radars, sonars, EW suites — force multipliers referenced by platform sensors
// and (optionally) as armament mounts.
export const SENSORS = [
  // ── Radar ───────────────────────────────────────────────────────────
  { id: 'spy-1d', name: 'AN/SPY-1D (Aegis)', nameKo: 'SPY-1D 이지스', category: 'radar', origin: 'US', introduced: 1983, range_km: 400, guidance: ['phased-array'] },
  { id: 'spy-6', name: 'AN/SPY-6 (AMDR)', nameKo: 'SPY-6', category: 'radar', origin: 'US', introduced: 2023, range_km: 600, guidance: ['active-phased-array'] },
  { id: 'apg-81', name: 'AN/APG-81 AESA', nameKo: 'APG-81', category: 'radar', origin: 'US', introduced: 2015, range_km: 150, guidance: ['aesa'] },
  { id: 'sampson', name: 'SAMPSON', nameKo: '샘슨', category: 'radar', origin: 'GB', introduced: 2009, range_km: 400, guidance: ['active-phased-array'] },
  { id: 'irbis-e', name: 'Irbis-E', nameKo: '이르비스-E', category: 'radar', origin: 'RU', introduced: 2010, range_km: 400, guidance: ['pesa'] },
  { id: 'type346', name: 'Type 346 (Dragon Eye)', nameKo: 'Type 346', category: 'radar', origin: 'CN', introduced: 2005, range_km: 450, guidance: ['active-phased-array'], dataConfidence: 'medium' },

  // ── Sonar ───────────────────────────────────────────────────────────
  { id: 'sqq-89', name: 'AN/SQQ-89', nameKo: 'SQQ-89 소나', category: 'sonar', origin: 'US', introduced: 1988, range_km: 60, guidance: ['hull-mounted', 'towed-array'] },
  { id: 'bqq-10', name: 'AN/BQQ-10', nameKo: 'BQQ-10', category: 'sonar', origin: 'US', introduced: 2002, range_km: 80, guidance: ['bow-array', 'towed-array'] },

  // ── EW ──────────────────────────────────────────────────────────────
  { id: 'slq-32', name: 'AN/SLQ-32(V)6', nameKo: 'SLQ-32 EW', category: 'ew', origin: 'US', introduced: 2014, guidance: ['esm', 'ecm'] },
  { id: 'krasukha', name: 'Krasukha-4', nameKo: '크라수하-4', category: 'ew', origin: 'RU', introduced: 2014, range_km: 300, guidance: ['ground-ecm'] },
] satisfies readonly WeaponSystem[];
