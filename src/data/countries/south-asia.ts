import type { Country } from '@/types';

// South Asia. Tier 1: IN. (PK, BD, LK, NP, AF added in Stage 5.)
export const SOUTH_ASIA = [
  {
    id: 'IN', name: 'India', nameKo: '인도', region: 'south-asia', flagEmoji: '🇮🇳', dataTier: 1,
    population: 1430000000, defenseBudget_usd: 83000000000, activePersonnel: 1450000, reservePersonnel: 1155000,
    paramilitary: 1600000, nuclearWarheads: 172, hasMilitary: true, dataConfidence: 'medium',
    sources: ['IISS Military Balance', 'GlobalFirepower'],
    army: [
      { platformId: 't90m', quantity: 1300, status: 'active', variant: 'T-90S Bhishma' },
      { platformId: 'bmp3', quantity: 2500, status: 'active', variant: 'BMP-2 Sarath' },
      { platformId: 'k9-thunder', quantity: 100, status: 'active', variant: 'K9 Vajra-T' },
      { platformId: 'smerch', quantity: 60, status: 'active', variant: 'Pinaka/Smerch' },
    ],
    navy: [
      { platformId: 'vikrant-cv', quantity: 2, status: 'active', notes: 'Vikramaditya + Vikrant' },
      { platformId: 'kilo-877', quantity: 8, status: 'active', variant: 'Sindhughosh급' },
      { platformId: 'gorshkov-frigate', quantity: 6, status: 'active', variant: 'Talwar급' },
    ],
    airForce: [
      { platformId: 'su30mki', quantity: 260, status: 'active' },
      { platformId: 'rafale', quantity: 36, status: 'active' },
      { platformId: 'mig29', quantity: 60, status: 'active', variant: 'MiG-29UPG' },
    ],
    strategic: [
      { platformId: 'su30mki', quantity: 0, status: 'active', notes: 'Agni 계열 IRBM/ICBM (전략군사령부)' },
    ],
  },
  {
    id: 'PK', name: 'Pakistan', nameKo: '파키스탄', region: 'south-asia', flagEmoji: '🇵🇰', dataTier: 2,
    population: 241000000, defenseBudget_usd: 10300000000, activePersonnel: 654000, reservePersonnel: 550000,
    paramilitary: 291000, nuclearWarheads: 170, hasMilitary: true, dataConfidence: 'medium', sources: ['IISS Military Balance'],
    army: [{ platformId: 'type99a', quantity: 600, status: 'active', variant: 'Al-Khalid/VT-4' }, { platformId: 'smerch', quantity: 0, status: 'active', notes: 'A-100/Fatah 다연장' }],
    navy: [{ platformId: 'kilo-877', quantity: 5, status: 'active', variant: 'Agosta 90B/Hangor' }, { platformId: 'opv-generic', quantity: 4, status: 'active', variant: 'Tughril급' }],
    airForce: [{ platformId: 'j20', quantity: 0, status: 'active', notes: 'JF-17 Thunder 150+' }, { platformId: 'f16c', quantity: 75, status: 'active' }],
    strategic: [{ platformId: 'type99a', quantity: 0, status: 'active', notes: 'Shaheen/Ghauri 탄도미사일' }],
  },
  {
    id: 'BD', name: 'Bangladesh', nameKo: '방글라데시', region: 'south-asia', flagEmoji: '🇧🇩', dataTier: 3,
    population: 173000000, defenseBudget_usd: 4500000000, activePersonnel: 165000, paramilitary: 64000,
    hasMilitary: true, dataConfidence: 'low', sources: ['IISS Military Balance'],
    army: [{ platformId: 'type99a', quantity: 0, status: 'active', notes: 'MBT-2000/Type 59' }],
    navy: [{ platformId: 'opv-generic', quantity: 6, status: 'active' }, { platformId: 'kilo-877', quantity: 2, status: 'active', variant: 'Type 035 Ming' }],
    airForce: [{ platformId: 'mig29', quantity: 8, status: 'active' }],
  },
  {
    id: 'LK', name: 'Sri Lanka', nameKo: '스리랑카', region: 'south-asia', flagEmoji: '🇱🇰', dataTier: 3,
    population: 22000000, defenseBudget_usd: 1500000000, activePersonnel: 255000, paramilitary: 62000,
    hasMilitary: true, dataConfidence: 'low',
    army: [{ platformId: 't90m', quantity: 0, status: 'active', notes: 'T-55AM2' }], navy: [{ platformId: 'opv-generic', quantity: 7, status: 'active' }], airForce: [{ platformId: 'mig29', quantity: 5, status: 'active', variant: 'Kfir/MiG-27' }],
  },
  {
    id: 'NP', name: 'Nepal', nameKo: '네팔', region: 'south-asia', flagEmoji: '🇳🇵', dataTier: 4,
    population: 30000000, defenseBudget_usd: 430000000, activePersonnel: 96000, paramilitary: 15000,
    hasMilitary: true, dataConfidence: 'low',
    army: [{ platformId: 'technical', quantity: 0, status: 'active', notes: '경보병 위주' }], navy: [], airForce: [{ platformId: 'uh60', quantity: 0, status: 'active', notes: '수송 헬기 소수' }],
  },
  {
    id: 'AF', name: 'Afghanistan', nameKo: '아프가니스탄', region: 'south-asia', flagEmoji: '🇦🇫', dataTier: 4,
    population: 42000000, defenseBudget_usd: 0, activePersonnel: 150000, paramilitary: 0,
    hasMilitary: true, dataConfidence: 'low', sources: ['2021 정권교체 후 불확실'],
    army: [{ platformId: 'technical', quantity: 0, status: 'active', notes: '노획 장비 위주, 실태 불명' }], navy: [], airForce: [],
  },
  {
    id: 'BT', name: 'Bhutan', nameKo: '부탄', region: 'south-asia', flagEmoji: '🇧🇹', dataTier: 4,
    population: 790000, defenseBudget_usd: 0, activePersonnel: 8000, paramilitary: 0,
    hasMilitary: true, dataConfidence: 'low', sources: ['소규모 왕립부탄군 — 해·공군 없음(내륙국)'],
    army: [{ platformId: 'technical', quantity: 0, status: 'active', notes: '경보병' }], navy: [], airForce: [],
  },
] satisfies readonly Country[];
