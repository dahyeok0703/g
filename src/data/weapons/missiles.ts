import type { WeaponSystem } from '@/types';

// Missiles across all roles. Public general specs only; figures are approximate
// and user-editable (spec §3). origin = ISO 3166 alpha-2 of producer.
export const MISSILES = [
  // ── Air-to-air (AAM) ────────────────────────────────────────────────
  { id: 'aim-120d', name: 'AIM-120D AMRAAM', nameKo: '암람', category: 'missile', role: 'anti-air-aam', origin: 'US', introduced: 2015, range_km: 160, speed_mach: 4, warhead_kg: 18, guidance: ['active-radar', 'inertial', 'datalink'] },
  { id: 'aim-9x', name: 'AIM-9X Sidewinder', nameKo: '사이드와인더', category: 'missile', role: 'anti-air-aam', origin: 'US', introduced: 2003, range_km: 35, speed_mach: 2.5, warhead_kg: 9, guidance: ['infrared'] },
  { id: 'meteor', name: 'MBDA Meteor', nameKo: '미티어', category: 'missile', role: 'anti-air-aam', origin: 'EU', introduced: 2016, range_km: 200, speed_mach: 4, warhead_kg: 14, guidance: ['active-radar', 'datalink', 'ramjet'] },
  { id: 'r-77', name: 'R-77 (RVV-AE)', nameKo: 'R-77', category: 'missile', role: 'anti-air-aam', origin: 'RU', introduced: 1994, range_km: 110, speed_mach: 4, warhead_kg: 22, guidance: ['active-radar', 'inertial'] },
  { id: 'r-73', name: 'R-73 (Archer)', nameKo: 'R-73', category: 'missile', role: 'anti-air-aam', origin: 'RU', introduced: 1984, range_km: 30, speed_mach: 2.5, warhead_kg: 7.4, guidance: ['infrared'] },
  { id: 'pl-15', name: 'PL-15', nameKo: 'PL-15', category: 'missile', role: 'anti-air-aam', origin: 'CN', introduced: 2018, range_km: 200, speed_mach: 4, warhead_kg: 20, guidance: ['active-radar', 'datalink'], dataConfidence: 'medium' },

  // ── Surface-to-air (SAM) ────────────────────────────────────────────
  { id: 'sm-2', name: 'RIM-66 SM-2MR', nameKo: 'SM-2', category: 'missile', role: 'anti-air-sam', origin: 'US', introduced: 1981, range_km: 170, speed_mach: 3.5, warhead_kg: 115, guidance: ['semi-active-radar', 'inertial'] },
  { id: 'sm-6', name: 'RIM-174 SM-6', nameKo: 'SM-6', category: 'missile', role: 'anti-air-sam', origin: 'US', introduced: 2013, range_km: 240, speed_mach: 3.5, warhead_kg: 64, guidance: ['active-radar', 'semi-active-radar'] },
  { id: 'essm', name: 'RIM-162 ESSM', nameKo: 'ESSM', category: 'missile', role: 'anti-air-sam', origin: 'US', introduced: 2004, range_km: 50, speed_mach: 4, warhead_kg: 39, guidance: ['semi-active-radar', 'active-radar'], notes: 'VLS 쿼드팩 가능' },
  { id: 'sm-3', name: 'RIM-161 SM-3', nameKo: 'SM-3', category: 'missile', role: 'anti-air-sam', origin: 'US', introduced: 2004, range_km: 700, speed_mach: 10, warhead_kg: 0, guidance: ['inertial', 'kinetic-kill'], notes: '탄도탄 요격(외기권)' },
  { id: 's400-48n6', name: 'S-400 48N6E3', nameKo: 'S-400', category: 'missile', role: 'anti-air-sam', origin: 'RU', introduced: 2007, range_km: 250, speed_mach: 14, warhead_kg: 180, guidance: ['active-radar', 'track-via-missile'] },
  { id: 'hq-9', name: 'HQ-9', nameKo: 'HQ-9', category: 'missile', role: 'anti-air-sam', origin: 'CN', introduced: 2003, range_km: 200, speed_mach: 4.2, warhead_kg: 180, guidance: ['active-radar', 'track-via-missile'], dataConfidence: 'medium' },
  { id: 'aster-30', name: 'Aster 30', nameKo: '아스테르 30', category: 'missile', role: 'anti-air-sam', origin: 'EU', introduced: 2011, range_km: 120, speed_mach: 4.5, warhead_kg: 15, guidance: ['active-radar'] },
  { id: 'cheongung-2', name: 'Cheongung-II (M-SAM)', nameKo: '천궁-II', category: 'missile', role: 'anti-air-sam', origin: 'KR', introduced: 2018, range_km: 40, speed_mach: 5, warhead_kg: 40, guidance: ['active-radar'] },

  // ── Anti-ship ───────────────────────────────────────────────────────
  { id: 'harpoon', name: 'RGM-84 Harpoon', nameKo: '하푼', category: 'missile', role: 'anti-ship', origin: 'US', introduced: 1977, range_km: 140, speed_mach: 0.85, warhead_kg: 221, guidance: ['active-radar', 'inertial'] },
  { id: 'nsm', name: 'Naval Strike Missile', nameKo: 'NSM', category: 'missile', role: 'anti-ship', origin: 'NO', introduced: 2012, range_km: 185, speed_mach: 0.9, warhead_kg: 125, guidance: ['imaging-infrared', 'gps', 'inertial'] },
  { id: 'lrasm', name: 'AGM-158C LRASM', nameKo: 'LRASM', category: 'missile', role: 'anti-ship', origin: 'US', introduced: 2018, range_km: 560, speed_mach: 0.85, warhead_kg: 450, guidance: ['imaging-infrared', 'datalink', 'inertial'] },
  { id: 'p800-oniks', name: 'P-800 Oniks', nameKo: '오닉스', category: 'missile', role: 'anti-ship', origin: 'RU', introduced: 2002, range_km: 600, speed_mach: 2.5, warhead_kg: 250, guidance: ['active-radar', 'inertial'] },
  { id: 'yj-18', name: 'YJ-18', nameKo: 'YJ-18', category: 'missile', role: 'anti-ship', origin: 'CN', introduced: 2015, range_km: 540, speed_mach: 3, warhead_kg: 300, guidance: ['active-radar', 'inertial'], dataConfidence: 'medium' },
  { id: 'exocet-mm40', name: 'Exocet MM40 Block 3', nameKo: '엑조세', category: 'missile', role: 'anti-ship', origin: 'FR', introduced: 2008, range_km: 200, speed_mach: 0.93, warhead_kg: 165, guidance: ['active-radar', 'gps'] },
  { id: 'brahmos', name: 'BrahMos', nameKo: '브라모스', category: 'missile', role: 'anti-ship', origin: 'IN', introduced: 2006, range_km: 450, speed_mach: 3, warhead_kg: 300, guidance: ['active-radar', 'inertial'] },

  // ── Cruise / land-attack ────────────────────────────────────────────
  { id: 'tomahawk', name: 'BGM-109 Tomahawk Block V', nameKo: '토마호크', category: 'missile', role: 'cruise-land-attack', origin: 'US', introduced: 2021, range_km: 1600, speed_mach: 0.74, warhead_kg: 450, guidance: ['gps', 'tercom', 'dsmac'] },
  { id: 'kalibr', name: '3M-14 Kalibr', nameKo: '칼리브르', category: 'missile', role: 'cruise-land-attack', origin: 'RU', introduced: 2015, range_km: 2000, speed_mach: 0.8, warhead_kg: 450, guidance: ['gps', 'inertial', 'terrain'] },
  { id: 'storm-shadow', name: 'Storm Shadow / SCALP', nameKo: '스톰섀도', category: 'missile', role: 'cruise-land-attack', origin: 'EU', introduced: 2003, range_km: 560, speed_mach: 0.8, warhead_kg: 450, guidance: ['gps', 'inertial', 'imaging-infrared'] },
  { id: 'hyunmoo-3', name: 'Hyunmoo-3C', nameKo: '현무-3C', category: 'missile', role: 'cruise-land-attack', origin: 'KR', introduced: 2012, range_km: 1500, speed_mach: 0.8, warhead_kg: 500, guidance: ['gps', 'inertial', 'terrain'], dataConfidence: 'medium' },

  // ── Ballistic ───────────────────────────────────────────────────────
  { id: 'df-21d', name: 'DF-21D (ASBM)', nameKo: 'DF-21D', category: 'missile', role: 'ballistic', origin: 'CN', introduced: 2010, range_km: 1500, speed_mach: 10, warhead_kg: 600, guidance: ['inertial', 'terminal-radar'], dataConfidence: 'low' },
  { id: 'iskander', name: '9K720 Iskander-M', nameKo: '이스칸데르', category: 'missile', role: 'ballistic', origin: 'RU', introduced: 2006, range_km: 500, speed_mach: 6, warhead_kg: 700, guidance: ['inertial', 'optical'] },
  { id: 'atacms', name: 'MGM-140 ATACMS', nameKo: 'ATACMS', category: 'missile', role: 'ballistic', origin: 'US', introduced: 1991, range_km: 300, speed_mach: 3, warhead_kg: 560, guidance: ['gps', 'inertial'] },
  { id: 'hyunmoo-2b', name: 'Hyunmoo-2B', nameKo: '현무-2B', category: 'missile', role: 'ballistic', origin: 'KR', introduced: 2009, range_km: 500, speed_mach: 6, warhead_kg: 1000, guidance: ['gps', 'inertial'], dataConfidence: 'medium' },
  { id: 'hwasong-15', name: 'Hwasong-15 (ICBM)', nameKo: '화성-15', category: 'missile', role: 'ballistic', origin: 'KP', introduced: 2017, range_km: 13000, speed_mach: 20, warhead_kg: 1000, guidance: ['inertial'], dataConfidence: 'low' },
  { id: 'minuteman-3', name: 'LGM-30G Minuteman III', nameKo: '미니트맨 III', category: 'missile', role: 'ballistic', origin: 'US', introduced: 1970, range_km: 13000, speed_mach: 23, warhead_kg: 1100, guidance: ['inertial'], notes: '핵탄두 ICBM' },
  { id: 'trident-2', name: 'UGM-133 Trident II D5', nameKo: '트라이던트 II', category: 'missile', role: 'ballistic', origin: 'US', introduced: 1990, range_km: 12000, speed_mach: 24, warhead_kg: 2800, guidance: ['inertial', 'astro'], notes: 'SLBM, 다탄두' },

  // ── Anti-tank (ATGM) ────────────────────────────────────────────────
  { id: 'javelin', name: 'FGM-148 Javelin', nameKo: '재블린', category: 'missile', role: 'anti-tank', origin: 'US', introduced: 1996, range_km: 4, warhead_kg: 8.4, penetration_mm: 750, guidance: ['imaging-infrared', 'fire-and-forget'] },
  { id: 'tow-2b', name: 'BGM-71 TOW-2B', nameKo: 'TOW-2B', category: 'missile', role: 'anti-tank', origin: 'US', introduced: 1992, range_km: 4.5, warhead_kg: 6.1, penetration_mm: 900, guidance: ['wire-guided', 'top-attack'] },
  { id: 'kornet', name: '9M133 Kornet', nameKo: '코넷', category: 'missile', role: 'anti-tank', origin: 'RU', introduced: 1998, range_km: 5.5, warhead_kg: 4.6, penetration_mm: 1200, guidance: ['laser-beam-riding'] },
  { id: 'spike-lr', name: 'Spike LR', nameKo: '스파이크 LR', category: 'missile', role: 'anti-tank', origin: 'IL', introduced: 1997, range_km: 4, warhead_kg: 5, penetration_mm: 700, guidance: ['imaging-infrared', 'fiber-optic'] },

  // ── Anti-radiation / air-to-ground ──────────────────────────────────
  { id: 'agm-88', name: 'AGM-88 HARM', nameKo: 'HARM', category: 'missile', role: 'anti-radiation', origin: 'US', introduced: 1985, range_km: 150, speed_mach: 2, warhead_kg: 66, guidance: ['anti-radiation'] },
  { id: 'agm-114', name: 'AGM-114 Hellfire', nameKo: '헬파이어', category: 'missile', role: 'air-to-ground', origin: 'US', introduced: 1984, range_km: 11, warhead_kg: 9, penetration_mm: 500, guidance: ['semi-active-laser'] },
] satisfies readonly WeaponSystem[];
