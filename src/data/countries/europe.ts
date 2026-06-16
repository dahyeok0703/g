import type { Country } from '@/types';

// Europe. Tier 1: RU, GB, FR, DE. (IT, ES, PL, UA, NL, ... added in Stage 5.)
export const EUROPE = [
  {
    id: 'RU', name: 'Russia', nameKo: '러시아', region: 'europe', flagEmoji: '🇷🇺', dataTier: 1,
    population: 144000000, defenseBudget_usd: 109000000000, activePersonnel: 1150000, reservePersonnel: 2000000,
    paramilitary: 250000, nuclearWarheads: 5580, hasMilitary: true, dataConfidence: 'medium',
    sources: ['IISS Military Balance', 'GlobalFirepower'],
    army: [
      { platformId: 't90m', quantity: 600, status: 'active', notes: 'T-72B3/T-80 다수 별도' },
      { platformId: 'bmp3', quantity: 600, status: 'active' },
      { platformId: 'smerch', quantity: 200, status: 'active' },
      { platformId: 's400-system', quantity: 57, status: 'active', notes: 'S-400 대대' },
    ],
    navy: [
      { platformId: 'gorshkov-frigate', quantity: 7, status: 'active' },
      { platformId: 'kilo-877', quantity: 24, status: 'active' },
      { platformId: 'liaoning-cv', quantity: 1, status: 'reserve', variant: 'Admiral Kuznetsov(수리 중)' },
    ],
    airForce: [
      { platformId: 'su57', quantity: 22, status: 'active' },
      { platformId: 'su35', quantity: 110, status: 'active' },
      { platformId: 'mig29', quantity: 100, status: 'active' },
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
      { platformId: 'm777-155', quantity: 0, status: 'active', notes: 'AS-90 자주포' },
    ],
    navy: [
      { platformId: 'qe-carrier', quantity: 2, status: 'active' },
      { platformId: 'type45', quantity: 6, status: 'active' },
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
      { platformId: 'leopard2a7', quantity: 0, status: 'active', notes: 'Leclerc 전차 200여 대' },
      { platformId: 'pzh2000', quantity: 0, status: 'active', notes: 'CAESAR 자주포' },
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
      { platformId: 'kilo-877', quantity: 6, status: 'active', variant: 'Type 212A' },
    ],
    airForce: [
      { platformId: 'typhoon', quantity: 138, status: 'active' },
      { platformId: 'f35a', quantity: 0, status: 'ordered', notes: 'F-35A 35대 도입 예정' },
    ],
  },
] satisfies readonly Country[];
