import type { Country } from '@/types';

// Europe. Tier 1: RU, GB, FR, DE. (IT, ES, PL, UA, NL, ... added in Stage 5.)
export const EUROPE = [
  {
    id: 'RU', name: 'Russia', nameKo: '러시아', region: 'europe', flagEmoji: '🇷🇺', dataTier: 1,
    population: 144000000, defenseBudget_usd: 109000000000, activePersonnel: 1150000, reservePersonnel: 2000000,
    paramilitary: 250000, nuclearWarheads: 5580, hasMilitary: true, dataConfidence: 'medium',
    sources: ['IISS Military Balance', 'GlobalFirepower'],
    army: [
      { platformId: 't90m', quantity: 600, status: 'active' },
      { platformId: 't72b3', quantity: 1800, status: 'active' },
      { platformId: 't80', quantity: 450, status: 'active' },
      { platformId: 't14', quantity: 20, status: 'active', notes: '제한 배치' },
      { platformId: 'bmp3', quantity: 600, status: 'active' },
      { platformId: 'btr82', quantity: 1500, status: 'active' },
      { platformId: 'himars', quantity: 200, status: 'active', notes: 'BM-30 Smerch 등' },
      { platformId: 's400-system', quantity: 57, status: 'active', notes: 'S-400 대대' },
      { platformId: 's300', quantity: 100, status: 'active' },
    ],
    navy: [
      { platformId: 'gorshkov-frigate', quantity: 7, status: 'active' },
      { platformId: 'sovremenny', quantity: 3, status: 'active' },
      { platformId: 'kilo-877', quantity: 24, status: 'active' },
      { platformId: 'liaoning-cv', quantity: 1, status: 'reserve', variant: 'Admiral Kuznetsov(수리 중)' },
    ],
    airForce: [
      { platformId: 'su57', quantity: 22, status: 'active' },
      { platformId: 'su35', quantity: 110, status: 'active' },
      { platformId: 'su34', quantity: 130, status: 'active' },
      { platformId: 'mig31', quantity: 130, status: 'active' },
      { platformId: 'mig29', quantity: 100, status: 'active' },
      { platformId: 'ka52', quantity: 110, status: 'active' },
    ],
    strategic: [
      { platformId: 's400-system', quantity: 0, status: 'active', notes: 'RVSN: 토폴-M/야르스 ICBM (추상화)' },
    ],
  },
  {
    id: 'GB', name: 'United Kingdom', nameKo: '영국', region: 'europe', flagEmoji: '🇬🇧', dataTier: 1,
    population: 67000000, defenseBudget_usd: 68000000000, activePersonnel: 138000, reservePersonnel: 32000,
    paramilitary: 0, nuclearWarheads: 225, hasMilitary: true, dataConfidence: 'high',
    sources: ['IISS Military Balance', 'UK MoD'],
    army: [
      { platformId: 'challenger2', quantity: 213, status: 'active', notes: 'Challenger 3 업그레이드 진행' },
      { platformId: 'pzh2000', quantity: 0, status: 'active', notes: 'AS-90 자주포' },
    ],
    navy: [
      { platformId: 'qe-carrier', quantity: 2, status: 'active' },
      { platformId: 'type45', quantity: 6, status: 'active' },
      { platformId: 'type26', quantity: 8, status: 'ordered', variant: 'City-class' },
      { platformId: 'virginia-ssn', quantity: 0, status: 'active', notes: 'Astute급 SSN (근사)' },
      { platformId: 'ohio-ssbn', quantity: 4, status: 'active', notes: 'Vanguard급 SSBN' },
    ],
    airForce: [
      { platformId: 'f35a', quantity: 34, status: 'active', variant: 'F-35B' },
      { platformId: 'typhoon', quantity: 137, status: 'active' },
    ],
    strategic: [
      { platformId: 'ohio-ssbn', quantity: 4, status: 'active', notes: 'Vanguard SSBN, 트라이던트 II' },
    ],
  },
  {
    id: 'FR', name: 'France', nameKo: '프랑스', region: 'europe', flagEmoji: '🇫🇷', dataTier: 1,
    population: 68000000, defenseBudget_usd: 61000000000, activePersonnel: 203000, reservePersonnel: 41000,
    paramilitary: 100000, nuclearWarheads: 290, hasMilitary: true, dataConfidence: 'high',
    sources: ['IISS Military Balance', 'French MoD'],
    army: [
      { platformId: 'leclerc', quantity: 222, status: 'active' },
      { platformId: 'pzh2000', quantity: 0, status: 'active', notes: 'CAESAR 자주포 109문' },
    ],
    navy: [
      { platformId: 'charles-de-gaulle', quantity: 1, status: 'active' },
      { platformId: 'fremm-fr', quantity: 8, status: 'active' },
      { platformId: 'ohio-ssbn', quantity: 4, status: 'active', notes: 'Triomphant급 SSBN' },
    ],
    airForce: [
      { platformId: 'rafale', quantity: 100, status: 'active' },
    ],
    strategic: [
      { platformId: 'ohio-ssbn', quantity: 4, status: 'active', notes: 'M51 SLBM + ASMP-A 공중핵' },
      { platformId: 'rafale', quantity: 40, status: 'active', notes: 'ASMP-A 핵순항 운반' },
    ],
  },
  {
    id: 'DE', name: 'Germany', nameKo: '독일', region: 'europe', flagEmoji: '🇩🇪', dataTier: 1,
    population: 84000000, defenseBudget_usd: 67000000000, activePersonnel: 181000, reservePersonnel: 34000,
    paramilitary: 0, nuclearWarheads: 0, hasMilitary: true, dataConfidence: 'high',
    sources: ['IISS Military Balance', 'Bundeswehr'],
    army: [
      { platformId: 'leopard2a7', quantity: 320, status: 'active' },
      { platformId: 'pzh2000', quantity: 120, status: 'active' },
    ],
    navy: [
      { platformId: 'fremm-fr', quantity: 0, status: 'active', notes: 'F125/F124 프리깃 (근사)' },
      { platformId: 'type212', quantity: 6, status: 'active' },
    ],
    airForce: [
      { platformId: 'typhoon', quantity: 138, status: 'active' },
      { platformId: 'f35a', quantity: 0, status: 'ordered', notes: 'F-35A 35대 도입 예정' },
    ],
  },
  {
    id: 'IT', name: 'Italy', nameKo: '이탈리아', region: 'europe', flagEmoji: '🇮🇹', dataTier: 2,
    population: 59000000, defenseBudget_usd: 33000000000, activePersonnel: 165000, reservePersonnel: 18000,
    paramilitary: 175000, hasMilitary: true, dataConfidence: 'high', sources: ['IISS Military Balance'],
    army: [{ platformId: 'leopard2a7', quantity: 200, status: 'active', variant: 'Ariete' }, { platformId: 'pzh2000', quantity: 70, status: 'active' }],
    navy: [{ platformId: 'charles-de-gaulle', quantity: 2, status: 'active', variant: 'Cavour/Trieste' }, { platformId: 'fremm-fr', quantity: 10, status: 'active', variant: 'FREMM-IT' }],
    airForce: [{ platformId: 'f35a', quantity: 20, status: 'active', variant: 'F-35A/B' }, { platformId: 'typhoon', quantity: 94, status: 'active' }],
  },
  {
    id: 'ES', name: 'Spain', nameKo: '스페인', region: 'europe', flagEmoji: '🇪🇸', dataTier: 2,
    population: 48000000, defenseBudget_usd: 20000000000, activePersonnel: 117000, reservePersonnel: 15000,
    paramilitary: 75000, hasMilitary: true, dataConfidence: 'high', sources: ['IISS Military Balance'],
    army: [{ platformId: 'leopard2a7', quantity: 327, status: 'active', variant: 'Leopard 2E' }],
    navy: [{ platformId: 'izumo-ddh', quantity: 1, status: 'active', variant: 'Juan Carlos I' }, { platformId: 'arleigh-burke-iia', quantity: 5, status: 'active', variant: 'Álvaro de Bazán급' }],
    airForce: [{ platformId: 'typhoon', quantity: 68, status: 'active' }, { platformId: 'fa18ef', quantity: 70, status: 'active', variant: 'EF-18' }],
  },
  {
    id: 'PL', name: 'Poland', nameKo: '폴란드', region: 'europe', flagEmoji: '🇵🇱', dataTier: 2,
    population: 38000000, defenseBudget_usd: 35000000000, activePersonnel: 202000, reservePersonnel: 50000,
    paramilitary: 73400, hasMilitary: true, dataConfidence: 'high', sources: ['IISS Military Balance'],
    army: [{ platformId: 'm1a2', quantity: 250, status: 'active', variant: 'M1A2 SEPv3' }, { platformId: 'k2', quantity: 180, status: 'active', variant: 'K2PL' }, { platformId: 'k9-thunder', quantity: 212, status: 'active' }, { platformId: 'chunmoo', quantity: 72, status: 'active' }],
    navy: [{ platformId: 'opv-generic', quantity: 2, status: 'active' }, { platformId: 'kilo-877', quantity: 1, status: 'active' }],
    airForce: [{ platformId: 'f35a', quantity: 6, status: 'ordered' }, { platformId: 'f16c', quantity: 48, status: 'active' }, { platformId: 'fa50', quantity: 48, status: 'active', variant: 'FA-50PL' }],
  },
  {
    id: 'UA', name: 'Ukraine', nameKo: '우크라이나', region: 'europe', flagEmoji: '🇺🇦', dataTier: 2,
    population: 38000000, defenseBudget_usd: 64000000000, activePersonnel: 800000, reservePersonnel: 1000000,
    paramilitary: 50000, hasMilitary: true, dataConfidence: 'low', sources: ['전시 변동 큼'],
    army: [{ platformId: 't90m', quantity: 0, status: 'active', notes: 'T-64/T-72 + 서방 전차(Leopard/Abrams/Challenger)' }, { platformId: 'leopard2a7', quantity: 100, status: 'active', notes: '공여분' }, { platformId: 'himars', quantity: 40, status: 'active' }],
    navy: [{ platformId: 'fast-patrol-boat', quantity: 10, status: 'active', notes: '대형함 대부분 상실, 무인정 활용' }],
    airForce: [{ platformId: 'mig29', quantity: 40, status: 'active' }, { platformId: 'f16c', quantity: 20, status: 'active', notes: '공여 F-16' }],
  },
  {
    id: 'NL', name: 'Netherlands', nameKo: '네덜란드', region: 'europe', flagEmoji: '🇳🇱', dataTier: 3,
    population: 18000000, defenseBudget_usd: 21000000000, activePersonnel: 49000, paramilitary: 5900,
    hasMilitary: true, dataConfidence: 'high',
    army: [{ platformId: 'pzh2000', quantity: 24, status: 'active' }], navy: [{ platformId: 'type45', quantity: 4, status: 'active', variant: 'De Zeven Provinciën급' }], airForce: [{ platformId: 'f35a', quantity: 52, status: 'active' }],
  },
  {
    id: 'SE', name: 'Sweden', nameKo: '스웨덴', region: 'europe', flagEmoji: '🇸🇪', dataTier: 3,
    population: 10500000, defenseBudget_usd: 12000000000, activePersonnel: 24000, reservePersonnel: 11000,
    paramilitary: 800, hasMilitary: true, dataConfidence: 'high',
    army: [{ platformId: 'leopard2a7', quantity: 110, status: 'active', variant: 'Strv 122' }, { platformId: 'k9-thunder', quantity: 48, status: 'active', variant: 'Archer' }],
    navy: [{ platformId: 'kilo-877', quantity: 5, status: 'active', variant: 'Gotland/Södermanland' }], airForce: [{ platformId: 'gripen-e', quantity: 90, status: 'active', variant: 'JAS-39C/E' }],
  },
  {
    id: 'FI', name: 'Finland', nameKo: '핀란드', region: 'europe', flagEmoji: '🇫🇮', dataTier: 3,
    population: 5600000, defenseBudget_usd: 7000000000, activePersonnel: 23000, reservePersonnel: 238000,
    paramilitary: 2700, hasMilitary: true, dataConfidence: 'high',
    army: [{ platformId: 'leopard2a7', quantity: 200, status: 'active', variant: 'Leopard 2A6' }, { platformId: 'k9-thunder', quantity: 96, status: 'active' }],
    navy: [{ platformId: 'opv-generic', quantity: 4, status: 'active' }], airForce: [{ platformId: 'f35a', quantity: 64, status: 'ordered' }, { platformId: 'fa18ef', quantity: 62, status: 'active', variant: 'F/A-18C' }],
  },
  {
    id: 'NO', name: 'Norway', nameKo: '노르웨이', region: 'europe', flagEmoji: '🇳🇴', dataTier: 3,
    population: 5500000, defenseBudget_usd: 9000000000, activePersonnel: 23000, reservePersonnel: 40000,
    paramilitary: 0, hasMilitary: true, dataConfidence: 'high',
    army: [{ platformId: 'leopard2a7', quantity: 54, status: 'active' }], navy: [{ platformId: 'fremm-fr', quantity: 4, status: 'active', variant: 'Fridtjof Nansen급' }, { platformId: 'kilo-877', quantity: 6, status: 'active', variant: 'Ula급' }], airForce: [{ platformId: 'f35a', quantity: 52, status: 'active' }],
  },
  {
    id: 'GR', name: 'Greece', nameKo: '그리스', region: 'europe', flagEmoji: '🇬🇷', dataTier: 3,
    population: 10400000, defenseBudget_usd: 8000000000, activePersonnel: 142000, reservePersonnel: 220000,
    paramilitary: 4000, hasMilitary: true, dataConfidence: 'medium',
    army: [{ platformId: 'leopard2a7', quantity: 170, status: 'active', variant: 'Leopard 2A6 HEL' }], navy: [{ platformId: 'fremm-fr', quantity: 3, status: 'active', variant: 'Belharra' }, { platformId: 'kilo-877', quantity: 11, status: 'active', variant: 'Type 214' }], airForce: [{ platformId: 'rafale', quantity: 24, status: 'active' }, { platformId: 'f16c', quantity: 150, status: 'active', variant: 'F-16V' }],
  },
  {
    id: 'CH', name: 'Switzerland', nameKo: '스위스', region: 'europe', flagEmoji: '🇨🇭', dataTier: 3,
    population: 8800000, defenseBudget_usd: 6000000000, activePersonnel: 21000, reservePersonnel: 130000,
    paramilitary: 0, hasMilitary: true, dataConfidence: 'high', sources: ['민병제 — 내륙국, 해군 없음'],
    army: [{ platformId: 'leopard2a7', quantity: 134, status: 'active', variant: 'Pz 87' }], navy: [], airForce: [{ platformId: 'f35a', quantity: 36, status: 'ordered' }, { platformId: 'fa18ef', quantity: 25, status: 'active', variant: 'F/A-18C' }],
  },
  {
    id: 'IS', name: 'Iceland', nameKo: '아이슬란드', region: 'europe', flagEmoji: '🇮🇸', dataTier: 4,
    population: 380000, activePersonnel: 0, hasMilitary: false, dataConfidence: 'high',
    sources: ['정규군 미보유 — NATO 회원, 해안경비대만 운용'],
    army: [], navy: [{ platformId: 'opv-generic', quantity: 3, status: 'active', notes: '해안경비대 순찰선' }], airForce: [],
  },
] satisfies readonly Country[];
