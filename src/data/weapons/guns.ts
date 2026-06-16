import type { WeaponSystem } from '@/types';

// Naval guns, autocannons, tank guns, artillery tubes.
export const GUNS = [
  // ── Naval guns ──────────────────────────────────────────────────────
  { id: 'mk45-5in', name: 'Mk 45 5"/62', nameKo: 'Mk45 5인치 함포', category: 'gun', origin: 'US', introduced: 2000, caliber_mm: 127, rof_rpm: 20, range_km: 37 },
  { id: 'oto-76', name: 'OTO Melara 76mm Super Rapid', nameKo: 'OTO 76mm', category: 'gun', origin: 'IT', introduced: 1988, caliber_mm: 76, rof_rpm: 120, range_km: 16 },
  { id: 'a190-100', name: 'A-190 100mm', nameKo: 'A-190 100mm', category: 'gun', origin: 'RU', introduced: 1996, caliber_mm: 100, rof_rpm: 80, range_km: 21 },
  { id: 'pj26-76', name: 'H/PJ-26 76mm', nameKo: 'H/PJ-26 76mm', category: 'gun', origin: 'CN', introduced: 2008, caliber_mm: 76, rof_rpm: 120, range_km: 17, dataConfidence: 'medium' },

  // ── Autocannons ─────────────────────────────────────────────────────
  { id: 'bushmaster-25', name: 'M242 Bushmaster 25mm', nameKo: '부시매스터 25mm', category: 'gun', origin: 'US', introduced: 1981, caliber_mm: 25, rof_rpm: 200, range_km: 3 },
  { id: 'mk44-30', name: 'Mk 44 Bushmaster II 30mm', nameKo: 'Mk44 30mm', category: 'gun', origin: 'US', introduced: 2003, caliber_mm: 30, rof_rpm: 200, range_km: 4 },
  { id: '2a42-30', name: '2A42 30mm', nameKo: '2A42 30mm', category: 'gun', origin: 'RU', introduced: 1980, caliber_mm: 30, rof_rpm: 550, range_km: 4 },

  // ── Tank main guns ──────────────────────────────────────────────────
  { id: 'rh-120-l55', name: 'Rheinmetall 120mm L/55', nameKo: '120mm L/55 활강포', category: 'gun', origin: 'DE', introduced: 2000, caliber_mm: 120, penetration_mm: 700, range_km: 4 },
  { id: 'm256-120', name: 'M256 120mm', nameKo: 'M256 120mm', category: 'gun', origin: 'US', introduced: 1985, caliber_mm: 120, penetration_mm: 650, range_km: 4 },
  { id: '2a46-125', name: '2A46 125mm', nameKo: '2A46 125mm', category: 'gun', origin: 'RU', introduced: 1970, caliber_mm: 125, penetration_mm: 600, range_km: 4 },

  // ── Artillery ───────────────────────────────────────────────────────
  { id: 'm777-155', name: 'M777 155mm Howitzer', nameKo: 'M777 155mm', category: 'gun', origin: 'US', introduced: 2005, caliber_mm: 155, rof_rpm: 5, range_km: 30 },
  { id: 'k9-155', name: 'K9 155mm/52', nameKo: 'K9 155mm', category: 'gun', origin: 'KR', introduced: 1999, caliber_mm: 155, rof_rpm: 6, range_km: 40 },
  { id: 'pzh2000-155', name: 'PzH 2000 155mm', nameKo: 'PzH2000 155mm', category: 'gun', origin: 'DE', introduced: 1998, caliber_mm: 155, rof_rpm: 10, range_km: 40 },
] satisfies readonly WeaponSystem[];
