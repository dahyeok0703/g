import type { GroundPlatform } from '@/types';

// Ground platforms — MBTs, IFVs, artillery, air defense.
export const GROUND = [
  // ── MBT ──────────────────────────────────────────────────────────────
  {
    id: 'm1a2', name: 'M1A2 SEPv3 Abrams', nameKo: 'M1A2 SEPv3 에이브럼스', domain: 'ground', type: 'mbt', origin: 'US',
    introduced: 2017, weight_t: 66.8, armor: 'composite + Chobham + DU', engine_hp: 1500, speed_kmh: 67, range_km: 426, crew: 4,
    armament: [
      { mountType: 'gun', weaponSystemId: 'm256-120', quantity: 1 },
      { mountType: 'gun', weaponSystemId: 'bushmaster-25', quantity: 0, notes: '.50 M2 + 7.62 보조기관총' },
    ],
  },
  {
    id: 'k2', name: 'K2 Black Panther', nameKo: 'K2 흑표', domain: 'ground', type: 'mbt', origin: 'KR',
    introduced: 2014, weight_t: 55, armor: 'composite + ERA + APS', engine_hp: 1500, speed_kmh: 70, range_km: 450, crew: 3,
    armament: [
      { mountType: 'gun', weaponSystemId: 'rh-120-l55', quantity: 1, notes: '자동장전 120mm L/55' },
    ],
  },
  {
    id: 'leopard2a7', name: 'Leopard 2A7+', nameKo: '레오파르트 2A7+', domain: 'ground', type: 'mbt', origin: 'DE',
    introduced: 2014, weight_t: 67, armor: 'composite + ERA', engine_hp: 1500, speed_kmh: 68, range_km: 450, crew: 4,
    armament: [
      { mountType: 'gun', weaponSystemId: 'rh-120-l55', quantity: 1 },
    ],
  },
  {
    id: 't90m', name: 'T-90M Proryv', nameKo: 'T-90M', domain: 'ground', type: 'mbt', origin: 'RU',
    introduced: 2020, weight_t: 48, armor: 'composite + Relikt ERA', engine_hp: 1130, speed_kmh: 60, range_km: 550, crew: 3,
    armament: [
      { mountType: 'gun', weaponSystemId: '2a46-125', quantity: 1, notes: '125mm + 9M119 ATGM 발사 가능' },
    ],
  },
  {
    id: 'type99a', name: 'Type 99A', nameKo: 'Type 99A', domain: 'ground', type: 'mbt', origin: 'CN',
    introduced: 2011, weight_t: 54, armor: 'composite + ERA', engine_hp: 1500, speed_kmh: 67, range_km: 600, crew: 3,
    dataConfidence: 'medium',
    armament: [
      { mountType: 'gun', weaponSystemId: '2a46-125', quantity: 1 },
    ],
  },
  {
    id: 'merkava4', name: 'Merkava Mk.4', nameKo: '메르카바 Mk.4', domain: 'ground', type: 'mbt', origin: 'IL',
    introduced: 2004, weight_t: 65, armor: 'modular composite + Trophy APS', engine_hp: 1500, speed_kmh: 64, range_km: 500, crew: 4,
    armament: [
      { mountType: 'gun', weaponSystemId: 'm256-120', quantity: 1, notes: 'MG253 120mm, LAHAT ATGM' },
    ],
  },
  {
    id: 'challenger2', name: 'Challenger 2', nameKo: '챌린저 2', domain: 'ground', type: 'mbt', origin: 'GB',
    introduced: 1998, weight_t: 64, armor: 'Chobham/Dorchester', engine_hp: 1200, speed_kmh: 59, range_km: 550, crew: 4,
    armament: [
      { mountType: 'gun', weaponSystemId: 'm256-120', quantity: 1, notes: 'L30A1 120mm 강선포' },
    ],
  },

  // ── IFV / APC ────────────────────────────────────────────────────────
  {
    id: 'm2a3', name: 'M2A3 Bradley', nameKo: 'M2A3 브래들리', domain: 'ground', type: 'ifv', origin: 'US',
    introduced: 2000, weight_t: 30, armor: 'aluminum + steel + ERA', engine_hp: 600, speed_kmh: 66, range_km: 400, crew: 3,
    armament: [
      { mountType: 'gun', weaponSystemId: 'bushmaster-25', quantity: 1 },
      { mountType: 'hardpoint', weaponSystemId: 'tow-2b', quantity: 2 },
    ],
  },
  {
    id: 'k21', name: 'K21 IFV', nameKo: 'K21 보병전투차', domain: 'ground', type: 'ifv', origin: 'KR',
    introduced: 2009, weight_t: 26, armor: 'composite', engine_hp: 750, speed_kmh: 70, range_km: 450, crew: 3,
    armament: [
      { mountType: 'gun', weaponSystemId: 'mk44-30', quantity: 1 },
      { mountType: 'hardpoint', weaponSystemId: 'spike-lr', quantity: 2 },
    ],
  },
  {
    id: 'bmp3', name: 'BMP-3', nameKo: 'BMP-3', domain: 'ground', type: 'ifv', origin: 'RU',
    introduced: 1987, weight_t: 18.7, armor: 'aluminum alloy', engine_hp: 500, speed_kmh: 70, range_km: 600, crew: 3,
    armament: [
      { mountType: 'gun', weaponSystemId: '2a42-30', quantity: 1 },
      { mountType: 'hardpoint', weaponSystemId: 'kornet', quantity: 2 },
    ],
  },

  // ── 포병 / MLRS ──────────────────────────────────────────────────────
  {
    id: 'k9-thunder', name: 'K9 Thunder', nameKo: 'K9 자주포', domain: 'ground', type: 'spg', origin: 'KR',
    introduced: 1999, weight_t: 47, armor: 'steel', engine_hp: 1000, speed_kmh: 67, range_km: 480, crew: 5,
    armament: [
      { mountType: 'gun', weaponSystemId: 'k9-155', quantity: 1 },
    ],
  },
  {
    id: 'pzh2000', name: 'PzH 2000', nameKo: 'PzH 2000 자주포', domain: 'ground', type: 'spg', origin: 'DE',
    introduced: 1998, weight_t: 55, armor: 'steel', engine_hp: 1000, speed_kmh: 60, range_km: 420, crew: 5,
    armament: [
      { mountType: 'gun', weaponSystemId: 'pzh2000-155', quantity: 1 },
    ],
  },
  {
    id: 'himars', name: 'M142 HIMARS', nameKo: 'HIMARS', domain: 'ground', type: 'mlrs', origin: 'US',
    introduced: 2010, weight_t: 16, armor: 'light', engine_hp: 290, speed_kmh: 85, range_km: 480, crew: 3,
    armament: [
      { mountType: 'hardpoint', weaponSystemId: 'gmlrs', quantity: 6, notes: '6연장 또는 ATACMS 1발' },
      { mountType: 'hardpoint', weaponSystemId: 'atacms', quantity: 1 },
    ],
  },
  {
    id: 'chunmoo', name: 'K239 Chunmoo', nameKo: '천무 다연장', domain: 'ground', type: 'mlrs', origin: 'KR',
    introduced: 2015, weight_t: 25, armor: 'light', engine_hp: 450, speed_kmh: 80, range_km: 800, crew: 3,
    armament: [
      { mountType: 'hardpoint', weaponSystemId: 'k239-rocket', quantity: 12 },
    ],
  },

  // ── 방공 ─────────────────────────────────────────────────────────────
  {
    id: 'patriot', name: 'MIM-104 Patriot (PAC-3)', nameKo: '패트리어트 PAC-3', domain: 'ground', type: 'sam-system', origin: 'US',
    introduced: 1981, weight_t: 30, speed_kmh: 60, crew: 6,
    armament: [
      { mountType: 'VLS', weaponSystemId: 'cheongung-2', quantity: 16, notes: '발사대당 PAC-3 MSE 16발' },
    ],
  },
  {
    id: 's400-system', name: 'S-400 Triumf', nameKo: 'S-400 시스템', domain: 'ground', type: 'sam-system', origin: 'RU',
    introduced: 2007, weight_t: 30, speed_kmh: 60, crew: 6,
    sensors: { radar: ['irbis-e'] },
    armament: [
      { mountType: 'VLS', weaponSystemId: 's400-48n6', quantity: 4, notes: 'TEL당 발사관 4 (48N6/9M96 혼재)' },
    ],
  },

  // ── 범용 ─────────────────────────────────────────────────────────────
  {
    id: 'technical', name: 'Technical (armed pickup)', nameKo: '무장 픽업 (테크니컬)', domain: 'ground', type: 'recon-vehicle', origin: 'XX',
    weight_t: 3, armor: 'none', speed_kmh: 120, range_km: 600, crew: 3, dataConfidence: 'low',
    armament: [
      { mountType: 'gun', weaponSystemId: '2a42-30', quantity: 1, notes: '중기관총/무반동총 거치' },
    ],
  },
] satisfies readonly GroundPlatform[];
