import type { AirPlatform } from '@/types';

// Air platforms. `armament` shows a representative loadout; `compatibleWeapons`
// lists what the creator/loadout UI can mount.
export const AIR = [
  // ── 미국 ─────────────────────────────────────────────────────────────
  {
    id: 'f22', name: 'F-22 Raptor', nameKo: 'F-22 랩터', domain: 'air', type: 'fighter', origin: 'US',
    introduced: 2005, generation: '5세대', maxSpeed_mach: 2.25, combatRadius_km: 850, serviceCeiling_m: 19800,
    hardpoints: 8, payload_kg: 8200, sensors: { radar: ['apg-81'] },
    compatibleWeapons: ['aim-120d', 'aim-9x', 'gmlrs'],
    armament: [
      { mountType: 'hardpoint', weaponSystemId: 'aim-120d', quantity: 6, notes: '내부 무장창' },
      { mountType: 'hardpoint', weaponSystemId: 'aim-9x', quantity: 2 },
    ],
  },
  {
    id: 'f35a', name: 'F-35A Lightning II', nameKo: 'F-35A', domain: 'air', type: 'multirole', origin: 'US',
    introduced: 2016, generation: '5세대', maxSpeed_mach: 1.6, combatRadius_km: 1100, serviceCeiling_m: 15000,
    hardpoints: 10, payload_kg: 8160, sensors: { radar: ['apg-81'] },
    compatibleWeapons: ['aim-120d', 'aim-9x', 'agm-88', 'lrasm'],
    armament: [
      { mountType: 'hardpoint', weaponSystemId: 'aim-120d', quantity: 4, notes: '스텔스 형상 시 내부 4발' },
      { mountType: 'hardpoint', weaponSystemId: 'aim-9x', quantity: 2 },
    ],
  },
  {
    id: 'f16c', name: 'F-16C Fighting Falcon', nameKo: 'F-16C', domain: 'air', type: 'multirole', origin: 'US',
    introduced: 1984, generation: '4세대', maxSpeed_mach: 2, combatRadius_km: 550, serviceCeiling_m: 15000,
    hardpoints: 11, payload_kg: 7700,
    compatibleWeapons: ['aim-120d', 'aim-9x', 'agm-88', 'harpoon'],
    armament: [
      { mountType: 'hardpoint', weaponSystemId: 'aim-120d', quantity: 4 },
      { mountType: 'hardpoint', weaponSystemId: 'aim-9x', quantity: 2 },
    ],
  },
  {
    id: 'fa18ef', name: 'F/A-18E/F Super Hornet', nameKo: 'F/A-18E/F', domain: 'air', type: 'multirole', origin: 'US',
    introduced: 2001, generation: '4.5세대', maxSpeed_mach: 1.8, combatRadius_km: 720, serviceCeiling_m: 15000,
    hardpoints: 11, payload_kg: 8050,
    compatibleWeapons: ['aim-120d', 'aim-9x', 'harpoon', 'lrasm', 'agm-88'],
    armament: [
      { mountType: 'hardpoint', weaponSystemId: 'aim-120d', quantity: 4 },
      { mountType: 'hardpoint', weaponSystemId: 'harpoon', quantity: 2 },
    ],
  },
  {
    id: 'b2', name: 'B-2 Spirit', nameKo: 'B-2 스피릿', domain: 'air', type: 'bomber', origin: 'US',
    introduced: 1997, generation: '스텔스', maxSpeed_mach: 0.95, combatRadius_km: 5300, serviceCeiling_m: 15200,
    payload_kg: 18000,
    armament: [
      { mountType: 'hardpoint', weaponSystemId: 'minuteman-3', quantity: 16, notes: 'B61/B83 핵폭탄 또는 JDAM 80발' },
    ],
  },
  {
    id: 'b52h', name: 'B-52H Stratofortress', nameKo: 'B-52H', domain: 'air', type: 'bomber', origin: 'US',
    introduced: 1961, maxSpeed_mach: 0.99, combatRadius_km: 7200, serviceCeiling_m: 15000, payload_kg: 31500,
    compatibleWeapons: ['tomahawk', 'lrasm'],
    armament: [
      { mountType: 'hardpoint', weaponSystemId: 'lrasm', quantity: 20, notes: 'AGM-86 ALCM/JASSM 등 20발급' },
    ],
  },
  {
    id: 'ah64e', name: 'AH-64E Apache', nameKo: 'AH-64E 아파치', domain: 'air', type: 'helicopter-attack', origin: 'US',
    introduced: 2011, maxSpeed_mach: 0.27, combatRadius_km: 480, hardpoints: 4, payload_kg: 770,
    compatibleWeapons: ['agm-114'],
    armament: [
      { mountType: 'hardpoint', weaponSystemId: 'agm-114', quantity: 16, notes: '헬파이어 16 + 70mm 로켓 + 30mm' },
      { mountType: 'gun', weaponSystemId: '2a42-30', quantity: 1 },
    ],
  },
  {
    id: 'mq9', name: 'MQ-9 Reaper', nameKo: 'MQ-9 리퍼', domain: 'air', type: 'uav-combat', origin: 'US',
    introduced: 2007, maxSpeed_mach: 0.34, combatRadius_km: 1850, serviceCeiling_m: 15000, hardpoints: 7,
    compatibleWeapons: ['agm-114'],
    armament: [
      { mountType: 'hardpoint', weaponSystemId: 'agm-114', quantity: 4 },
    ],
  },
  {
    id: 'e3-awacs', name: 'E-3 Sentry (AWACS)', nameKo: 'E-3 조기경보기', domain: 'air', type: 'awacs', origin: 'US',
    introduced: 1977, maxSpeed_mach: 0.78, combatRadius_km: 3700, armament: [],
  },

  // ── 한국 ─────────────────────────────────────────────────────────────
  {
    id: 'kf21', name: 'KF-21 Boramae', nameKo: 'KF-21 보라매', domain: 'air', type: 'multirole', origin: 'KR',
    introduced: 2026, generation: '4.5세대', maxSpeed_mach: 1.8, combatRadius_km: 1000, hardpoints: 10, payload_kg: 7700,
    dataConfidence: 'medium', compatibleWeapons: ['meteor'],
    armament: [
      { mountType: 'hardpoint', weaponSystemId: 'meteor', quantity: 4 },
    ],
  },
  {
    id: 'f15k', name: 'F-15K Slam Eagle', nameKo: 'F-15K', domain: 'air', type: 'multirole', origin: 'US',
    introduced: 2005, generation: '4세대', maxSpeed_mach: 2.5, combatRadius_km: 1800, hardpoints: 11, payload_kg: 10400,
    compatibleWeapons: ['aim-120d', 'aim-9x', 'harpoon', 'hyunmoo-3'],
    armament: [
      { mountType: 'hardpoint', weaponSystemId: 'aim-120d', quantity: 4 },
      { mountType: 'hardpoint', weaponSystemId: 'harpoon', quantity: 4 },
    ],
  },
  {
    id: 'fa50', name: 'FA-50 Fighting Eagle', nameKo: 'FA-50', domain: 'air', type: 'attack', origin: 'KR',
    introduced: 2013, generation: '경공격기', maxSpeed_mach: 1.5, combatRadius_km: 450, hardpoints: 7, payload_kg: 4500,
    compatibleWeapons: ['aim-9x'],
    armament: [
      { mountType: 'hardpoint', weaponSystemId: 'aim-9x', quantity: 2 },
    ],
  },

  // ── 중국 / 러시아 ────────────────────────────────────────────────────
  {
    id: 'j20', name: 'Chengdu J-20', nameKo: 'J-20', domain: 'air', type: 'fighter', origin: 'CN',
    introduced: 2017, generation: '5세대', maxSpeed_mach: 2, combatRadius_km: 1100, hardpoints: 6, payload_kg: 11000,
    dataConfidence: 'low', sensors: { radar: ['type346'] }, compatibleWeapons: ['pl-15'],
    armament: [
      { mountType: 'hardpoint', weaponSystemId: 'pl-15', quantity: 4, notes: '내부 무장창' },
    ],
  },
  {
    id: 'su57', name: 'Su-57 Felon', nameKo: 'Su-57', domain: 'air', type: 'fighter', origin: 'RU',
    introduced: 2020, generation: '5세대', maxSpeed_mach: 2, combatRadius_km: 1500, hardpoints: 12, payload_kg: 10000,
    dataConfidence: 'low', sensors: { radar: ['irbis-e'] }, compatibleWeapons: ['r-77', 'r-73'],
    armament: [
      { mountType: 'hardpoint', weaponSystemId: 'r-77', quantity: 4 },
      { mountType: 'hardpoint', weaponSystemId: 'r-73', quantity: 2 },
    ],
  },
  {
    id: 'su35', name: 'Su-35S Flanker-E', nameKo: 'Su-35S', domain: 'air', type: 'multirole', origin: 'RU',
    introduced: 2014, generation: '4.5세대', maxSpeed_mach: 2.25, combatRadius_km: 1600, hardpoints: 12, payload_kg: 8000,
    sensors: { radar: ['irbis-e'] }, compatibleWeapons: ['r-77', 'r-73'],
    armament: [
      { mountType: 'hardpoint', weaponSystemId: 'r-77', quantity: 8 },
      { mountType: 'hardpoint', weaponSystemId: 'r-73', quantity: 4 },
    ],
  },
  {
    id: 'mig29', name: 'MiG-29 Fulcrum', nameKo: 'MiG-29', domain: 'air', type: 'fighter', origin: 'RU',
    introduced: 1983, generation: '4세대', maxSpeed_mach: 2.25, combatRadius_km: 700, hardpoints: 7, payload_kg: 3500,
    compatibleWeapons: ['r-77', 'r-73'],
    armament: [
      { mountType: 'hardpoint', weaponSystemId: 'r-77', quantity: 4 },
      { mountType: 'hardpoint', weaponSystemId: 'r-73', quantity: 2 },
    ],
  },

  // ── 유럽 / 인도 ──────────────────────────────────────────────────────
  {
    id: 'rafale', name: 'Dassault Rafale', nameKo: '라팔', domain: 'air', type: 'multirole', origin: 'FR',
    introduced: 2001, generation: '4.5세대', maxSpeed_mach: 1.8, combatRadius_km: 1850, hardpoints: 14, payload_kg: 9500,
    compatibleWeapons: ['meteor', 'exocet-mm40', 'storm-shadow'],
    armament: [
      { mountType: 'hardpoint', weaponSystemId: 'meteor', quantity: 4 },
      { mountType: 'hardpoint', weaponSystemId: 'storm-shadow', quantity: 2 },
    ],
  },
  {
    id: 'typhoon', name: 'Eurofighter Typhoon', nameKo: '유로파이터 타이푼', domain: 'air', type: 'multirole', origin: 'EU',
    introduced: 2003, generation: '4.5세대', maxSpeed_mach: 2, combatRadius_km: 1390, hardpoints: 13, payload_kg: 9000,
    compatibleWeapons: ['meteor', 'storm-shadow'],
    armament: [
      { mountType: 'hardpoint', weaponSystemId: 'meteor', quantity: 6 },
    ],
  },
  {
    id: 'su30mki', name: 'Su-30MKI', nameKo: 'Su-30MKI', domain: 'air', type: 'multirole', origin: 'IN',
    introduced: 2002, generation: '4.5세대', maxSpeed_mach: 2, combatRadius_km: 1500, hardpoints: 12, payload_kg: 8000,
    compatibleWeapons: ['r-77', 'brahmos'],
    armament: [
      { mountType: 'hardpoint', weaponSystemId: 'r-77', quantity: 6 },
      { mountType: 'hardpoint', weaponSystemId: 'brahmos', quantity: 1, notes: 'BrahMos-A 공중발사형' },
    ],
  },

  // ── 범용 ─────────────────────────────────────────────────────────────
  {
    id: 'c130', name: 'C-130 Hercules', nameKo: 'C-130 수송기', domain: 'air', type: 'transport', origin: 'US',
    introduced: 1956, maxSpeed_mach: 0.58, combatRadius_km: 3800, payload_kg: 19000, armament: [],
  },
  {
    id: 'uh60', name: 'UH-60 Black Hawk', nameKo: 'UH-60 블랙호크', domain: 'air', type: 'helicopter-utility', origin: 'US',
    introduced: 1979, maxSpeed_mach: 0.23, combatRadius_km: 590, armament: [],
  },
] satisfies readonly AirPlatform[];
