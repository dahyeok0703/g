import type { Country } from '@/types';

// Africa (Stage 5). Tier 2: EG is filed under Middle East; here NG, ZA, DZ.
export const AFRICA = [
  {
    id: 'DZ', name: 'Algeria', nameKo: '알제리', region: 'africa', flagEmoji: '🇩🇿', dataTier: 2,
    population: 45000000, defenseBudget_usd: 18000000000, activePersonnel: 130000, reservePersonnel: 150000,
    paramilitary: 187000, hasMilitary: true, dataConfidence: 'medium', sources: ['IISS Military Balance'],
    army: [{ platformId: 't90m', quantity: 600, status: 'active', variant: 'T-90SA' }, { platformId: 'himars', quantity: 0, status: 'active', notes: 'BM-30 다연장' }],
    navy: [{ platformId: 'kilo-877', quantity: 6, status: 'active' }, { platformId: 'fremm-fr', quantity: 2, status: 'active', variant: 'MEKO A-200' }],
    airForce: [{ platformId: 'su35', quantity: 0, status: 'ordered' }, { platformId: 'su30mki', quantity: 44, status: 'active', variant: 'Su-30MKA' }, { platformId: 'mig29', quantity: 24, status: 'active' }],
  },
  {
    id: 'NG', name: 'Nigeria', nameKo: '나이지리아', region: 'africa', flagEmoji: '🇳🇬', dataTier: 3,
    population: 223000000, defenseBudget_usd: 3000000000, activePersonnel: 223000, paramilitary: 80000,
    hasMilitary: true, dataConfidence: 'low', sources: ['IISS Military Balance'],
    army: [{ platformId: 't90m', quantity: 0, status: 'active', notes: 'T-72/VT-4 소수' }], navy: [{ platformId: 'opv-generic', quantity: 4, status: 'active' }], airForce: [{ platformId: 'fa50', quantity: 0, status: 'active', notes: 'JF-17/A-29 경공격기' }],
  },
  {
    id: 'ZA', name: 'South Africa', nameKo: '남아프리카공화국', region: 'africa', flagEmoji: '🇿🇦', dataTier: 3,
    population: 60000000, defenseBudget_usd: 3000000000, activePersonnel: 73000, reservePersonnel: 15000,
    paramilitary: 0, hasMilitary: true, dataConfidence: 'medium',
    army: [{ platformId: 'leopard2a7', quantity: 0, status: 'active', notes: 'Olifant Mk2' }], navy: [{ platformId: 'fremm-fr', quantity: 4, status: 'active', variant: 'Valour급' }, { platformId: 'kilo-877', quantity: 3, status: 'active', variant: 'Heroine급 (Type 209)' }], airForce: [{ platformId: 'typhoon', quantity: 0, status: 'active', notes: 'Gripen 26' }],
  },
  {
    id: 'MA', name: 'Morocco', nameKo: '모로코', region: 'africa', flagEmoji: '🇲🇦', dataTier: 3,
    population: 37000000, defenseBudget_usd: 5500000000, activePersonnel: 195000, reservePersonnel: 150000,
    paramilitary: 50000, hasMilitary: true, dataConfidence: 'medium',
    army: [{ platformId: 'm1a2', quantity: 162, status: 'active', variant: 'M1A1 SA' }], navy: [{ platformId: 'fremm-fr', quantity: 1, status: 'active' }, { platformId: 'opv-generic', quantity: 4, status: 'active' }], airForce: [{ platformId: 'f16c', quantity: 23, status: 'active', variant: 'F-16V Block 72' }],
  },
  {
    id: 'ET', name: 'Ethiopia', nameKo: '에티오피아', region: 'africa', flagEmoji: '🇪🇹', dataTier: 4,
    population: 126000000, defenseBudget_usd: 1000000000, activePersonnel: 162000, paramilitary: 0,
    hasMilitary: true, dataConfidence: 'low', sources: ['내륙국 — 해군 사실상 없음'],
    army: [{ platformId: 't90m', quantity: 0, status: 'active', notes: 'T-72 소수' }], navy: [], airForce: [{ platformId: 'su30mki', quantity: 6, status: 'active', variant: 'Su-27' }],
  },
  {
    id: 'KE', name: 'Kenya', nameKo: '케냐', region: 'africa', flagEmoji: '🇰🇪', dataTier: 4,
    population: 55000000, defenseBudget_usd: 1200000000, activePersonnel: 24000, paramilitary: 5000,
    hasMilitary: true, dataConfidence: 'low',
    army: [{ platformId: 'technical', quantity: 0, status: 'active' }], navy: [{ platformId: 'opv-generic', quantity: 3, status: 'active' }], airForce: [{ platformId: 'fa50', quantity: 0, status: 'active', notes: 'F-5/경공격기' }],
  },
] satisfies readonly Country[];
