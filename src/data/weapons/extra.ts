import type { WeaponSystem } from '@/types';

// Supplementary real-world weapon systems (public general specs). Expands the
// seed catalog breadth across origins and roles.
export const EXTRA_WEAPONS = [
  // ── AAM ─────────────────────────────────────────────────────────────
  { id: 'mica', name: 'MBDA MICA', nameKo: 'MICA', category: 'missile', role: 'anti-air-aam', origin: 'FR', introduced: 1996, range_km: 80, speed_mach: 4, warhead_kg: 12, guidance: ['active-radar', 'infrared'] },
  { id: 'python-5', name: 'Python-5', nameKo: '파이썬-5', category: 'missile', role: 'anti-air-aam', origin: 'IL', introduced: 2003, range_km: 20, speed_mach: 4, warhead_kg: 11, guidance: ['imaging-infrared'] },
  { id: 'iris-t', name: 'IRIS-T', nameKo: 'IRIS-T', category: 'missile', role: 'anti-air-aam', origin: 'DE', introduced: 2005, range_km: 25, speed_mach: 3, warhead_kg: 11, guidance: ['imaging-infrared'] },
  { id: 'pl-10', name: 'PL-10', nameKo: 'PL-10', category: 'missile', role: 'anti-air-aam', origin: 'CN', introduced: 2015, range_km: 20, speed_mach: 3, warhead_kg: 10, guidance: ['imaging-infrared'], dataConfidence: 'medium' },
  { id: 'r-37m', name: 'R-37M', nameKo: 'R-37M', category: 'missile', role: 'anti-air-aam', origin: 'RU', introduced: 2019, range_km: 300, speed_mach: 6, warhead_kg: 60, guidance: ['active-radar', 'inertial'] },
  { id: 'asraam', name: 'ASRAAM', nameKo: 'ASRAAM', category: 'missile', role: 'anti-air-aam', origin: 'GB', introduced: 1998, range_km: 50, speed_mach: 3, warhead_kg: 10, guidance: ['imaging-infrared'] },

  // ── SAM ─────────────────────────────────────────────────────────────
  { id: 'barak-8', name: 'Barak 8', nameKo: '바라크 8', category: 'missile', role: 'anti-air-sam', origin: 'IL', introduced: 2017, range_km: 100, speed_mach: 2, warhead_kg: 60, guidance: ['active-radar'] },
  { id: 'iris-t-slm', name: 'IRIS-T SLM', nameKo: 'IRIS-T SLM', category: 'missile', role: 'anti-air-sam', origin: 'DE', introduced: 2022, range_km: 40, speed_mach: 3, warhead_kg: 11, guidance: ['active-radar', 'infrared'] },
  { id: 'pantsir-missile', name: '57E6 (Pantsir)', nameKo: '판치르 미사일', category: 'missile', role: 'anti-air-sam', origin: 'RU', introduced: 2012, range_km: 20, speed_mach: 2.3, warhead_kg: 20, guidance: ['command'] },
  { id: 'thaad-int', name: 'THAAD Interceptor', nameKo: 'THAAD 요격탄', category: 'missile', role: 'anti-air-sam', origin: 'US', introduced: 2008, range_km: 200, speed_mach: 8, warhead_kg: 0, guidance: ['kinetic-kill', 'infrared'], notes: '고고도 탄도탄 요격' },
  { id: 'tamir', name: 'Tamir (Iron Dome)', nameKo: '타미르(아이언돔)', category: 'missile', role: 'anti-air-sam', origin: 'IL', introduced: 2011, range_km: 70, speed_mach: 2.2, warhead_kg: 11, guidance: ['active-radar'] },

  // ── 대함 ────────────────────────────────────────────────────────────
  { id: 'kh-35', name: 'Kh-35 Uran', nameKo: 'Kh-35', category: 'missile', role: 'anti-ship', origin: 'RU', introduced: 2003, range_km: 260, speed_mach: 0.8, warhead_kg: 145, guidance: ['active-radar', 'inertial'] },
  { id: 'c-802', name: 'YJ-83 / C-802', nameKo: 'C-802', category: 'missile', role: 'anti-ship', origin: 'CN', introduced: 1998, range_km: 180, speed_mach: 0.9, warhead_kg: 165, guidance: ['active-radar'], dataConfidence: 'medium' },
  { id: 'atmaca', name: 'Atmaca', nameKo: '아트마자', category: 'missile', role: 'anti-ship', origin: 'TR', introduced: 2021, range_km: 220, speed_mach: 0.85, warhead_kg: 220, guidance: ['active-radar', 'gps'] },
  { id: 'rbs-15', name: 'RBS-15 Mk3', nameKo: 'RBS-15', category: 'missile', role: 'anti-ship', origin: 'SE', introduced: 2009, range_km: 250, speed_mach: 0.9, warhead_kg: 200, guidance: ['active-radar', 'gps'] },

  // ── 순항 / 탄도 ─────────────────────────────────────────────────────
  { id: 'jassm-er', name: 'AGM-158B JASSM-ER', nameKo: 'JASSM-ER', category: 'missile', role: 'cruise-land-attack', origin: 'US', introduced: 2014, range_km: 1000, speed_mach: 0.8, warhead_kg: 450, guidance: ['gps', 'imaging-infrared'] },
  { id: 'taurus', name: 'Taurus KEPD 350', nameKo: '타우러스', category: 'missile', role: 'cruise-land-attack', origin: 'DE', introduced: 2005, range_km: 500, speed_mach: 0.95, warhead_kg: 480, guidance: ['gps', 'terrain', 'imaging-infrared'] },
  { id: 'kh-101', name: 'Kh-101', nameKo: 'Kh-101', category: 'missile', role: 'cruise-land-attack', origin: 'RU', introduced: 2012, range_km: 2500, speed_mach: 0.78, warhead_kg: 450, guidance: ['gps', 'terrain'] },
  { id: 'df-26', name: 'DF-26', nameKo: 'DF-26', category: 'missile', role: 'ballistic', origin: 'CN', introduced: 2016, range_km: 4000, speed_mach: 18, warhead_kg: 1200, guidance: ['inertial', 'terminal-radar'], dataConfidence: 'low' },
  { id: 'agni-5', name: 'Agni-V', nameKo: '아그니-V', category: 'missile', role: 'ballistic', origin: 'IN', introduced: 2018, range_km: 7000, speed_mach: 24, warhead_kg: 1500, guidance: ['inertial', 'astro'], notes: 'ICBM' },

  // ── ATGM ────────────────────────────────────────────────────────────
  { id: 'nlaw', name: 'NLAW', nameKo: 'NLAW', category: 'missile', role: 'anti-tank', origin: 'GB', introduced: 2009, range_km: 1, warhead_kg: 1.8, penetration_mm: 500, guidance: ['predicted-line-of-sight'] },
  { id: 'hj-10', name: 'HJ-10', nameKo: 'HJ-10', category: 'missile', role: 'anti-tank', origin: 'CN', introduced: 2014, range_km: 10, warhead_kg: 10, penetration_mm: 1400, guidance: ['imaging-infrared', 'datalink'], dataConfidence: 'medium' },
  { id: 'brimstone', name: 'Brimstone', nameKo: '브림스톤', category: 'missile', role: 'anti-tank', origin: 'GB', introduced: 2005, range_km: 20, warhead_kg: 6.3, penetration_mm: 1000, guidance: ['millimetric-radar', 'laser'] },

  // ── 항공기 기총/AGM ─────────────────────────────────────────────────
  { id: 'gau-8', name: 'GAU-8/A Avenger 30mm', nameKo: 'GAU-8 30mm', category: 'gun', origin: 'US', introduced: 1977, caliber_mm: 30, rof_rpm: 3900, range_km: 3.6 },
  { id: 'm230', name: 'M230 Chain Gun 30mm', nameKo: 'M230 30mm', category: 'gun', origin: 'US', introduced: 1982, caliber_mm: 30, rof_rpm: 625, range_km: 4 },
  { id: 'spike-er', name: 'Spike ER', nameKo: '스파이크 ER', category: 'missile', role: 'air-to-ground', origin: 'IL', introduced: 2004, range_km: 16, warhead_kg: 10, penetration_mm: 1000, guidance: ['imaging-infrared', 'fiber-optic'] },
  { id: 'vikhr', name: '9K121 Vikhr', nameKo: '비흐르', category: 'missile', role: 'air-to-ground', origin: 'RU', introduced: 1992, range_km: 10, warhead_kg: 8, penetration_mm: 1000, guidance: ['laser-beam-riding'] },

  // ── 함포 / 자주포 ────────────────────────────────────────────────────
  { id: 'caesar-155', name: 'CAESAR 155mm/52', nameKo: 'CAESAR 155mm', category: 'gun', origin: 'FR', introduced: 2008, caliber_mm: 155, rof_rpm: 6, range_km: 42 },
  { id: '2s19-152', name: '2S19 Msta 152mm', nameKo: '2S19 152mm', category: 'gun', origin: 'RU', introduced: 1989, caliber_mm: 152, rof_rpm: 8, range_km: 29 },
  { id: 'plz-155', name: 'PLZ-05 155mm', nameKo: 'PLZ-05 155mm', category: 'gun', origin: 'CN', introduced: 2008, caliber_mm: 155, rof_rpm: 8, range_km: 40, dataConfidence: 'medium' },
] satisfies readonly WeaponSystem[];
