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
] satisfies readonly Country[];
