import type { Country } from '@/types';

// Southeast Asia (Stage 5). Tier 2: ID, VN, SG. Tier 3: TH, MY, PH, MM. Tier 4: KH, LA, BN.
export const SOUTHEAST_ASIA = [
  {
    id: 'ID', name: 'Indonesia', nameKo: '인도네시아', region: 'southeast-asia', flagEmoji: '🇮🇩', dataTier: 2,
    population: 277000000, defenseBudget_usd: 25000000000, activePersonnel: 400000, reservePersonnel: 400000,
    paramilitary: 280000, hasMilitary: true, dataConfidence: 'medium', sources: ['IISS Military Balance'],
    army: [{ platformId: 'leopard2a7', quantity: 103, status: 'active', variant: 'Leopard 2RI' }, { platformId: 'k9-thunder', quantity: 0, status: 'active', notes: 'Caesar 자주포' }],
    navy: [{ platformId: 'opv-generic', quantity: 8, status: 'active' }, { platformId: 'kilo-877', quantity: 4, status: 'active', variant: 'Type 209 Nagapasa' }],
    airForce: [{ platformId: 'f16c', quantity: 33, status: 'active' }, { platformId: 'rafale', quantity: 6, status: 'ordered' }],
  },
  {
    id: 'VN', name: 'Vietnam', nameKo: '베트남', region: 'southeast-asia', flagEmoji: '🇻🇳', dataTier: 2,
    population: 99000000, defenseBudget_usd: 6500000000, activePersonnel: 470000, reservePersonnel: 5000000,
    paramilitary: 40000, hasMilitary: true, dataConfidence: 'medium', sources: ['IISS Military Balance'],
    army: [{ platformId: 't90m', quantity: 64, status: 'active', variant: 'T-90S' }, { platformId: 'smerch', quantity: 0, status: 'active', notes: 'BM-21/EXTRA' }],
    navy: [{ platformId: 'kilo-877', quantity: 6, status: 'active' }, { platformId: 'gorshkov-frigate', quantity: 4, status: 'active', variant: 'Gepard 3.9' }],
    airForce: [{ platformId: 'su30mki', quantity: 35, status: 'active', variant: 'Su-30MK2' }],
  },
  {
    id: 'SG', name: 'Singapore', nameKo: '싱가포르', region: 'southeast-asia', flagEmoji: '🇸🇬', dataTier: 2,
    population: 5900000, defenseBudget_usd: 13400000000, activePersonnel: 51000, reservePersonnel: 252500,
    paramilitary: 75000, hasMilitary: true, dataConfidence: 'high', sources: ['IISS Military Balance'],
    army: [{ platformId: 'leopard2a7', quantity: 96, status: 'active', variant: 'Leopard 2SG' }],
    navy: [{ platformId: 'opv-generic', quantity: 6, status: 'active', variant: 'Formidable 프리깃' }, { platformId: 'kilo-877', quantity: 4, status: 'active', variant: 'Invincible/Archer' }],
    airForce: [{ platformId: 'f35a', quantity: 4, status: 'ordered', variant: 'F-35B' }, { platformId: 'f16c', quantity: 60, status: 'active' }],
  },
  {
    id: 'TH', name: 'Thailand', nameKo: '태국', region: 'southeast-asia', flagEmoji: '🇹🇭', dataTier: 3,
    population: 72000000, defenseBudget_usd: 5700000000, activePersonnel: 360000, paramilitary: 113000,
    hasMilitary: true, dataConfidence: 'medium', sources: ['IISS Military Balance'],
    army: [{ platformId: 't90m', quantity: 49, status: 'active', variant: 'VT-4' }],
    navy: [{ platformId: 'liaoning-cv', quantity: 1, status: 'active', variant: 'HTMS Chakri Naruebet(경항모)' }, { platformId: 'opv-generic', quantity: 6, status: 'active' }],
    airForce: [{ platformId: 'f16c', quantity: 50, status: 'active' }],
  },
  {
    id: 'MY', name: 'Malaysia', nameKo: '말레이시아', region: 'southeast-asia', flagEmoji: '🇲🇾', dataTier: 3,
    population: 34000000, defenseBudget_usd: 4100000000, activePersonnel: 113000, paramilitary: 24600,
    hasMilitary: true, dataConfidence: 'medium', sources: ['IISS Military Balance'],
    army: [{ platformId: 't90m', quantity: 48, status: 'active', variant: 'PT-91M' }],
    navy: [{ platformId: 'opv-generic', quantity: 6, status: 'active' }, { platformId: 'kilo-877', quantity: 2, status: 'active', variant: 'Scorpène' }],
    airForce: [{ platformId: 'su30mki', quantity: 18, status: 'active', variant: 'Su-30MKM' }],
  },
  {
    id: 'PH', name: 'Philippines', nameKo: '필리핀', region: 'southeast-asia', flagEmoji: '🇵🇭', dataTier: 3,
    population: 117000000, defenseBudget_usd: 4500000000, activePersonnel: 145000, paramilitary: 65000,
    hasMilitary: true, dataConfidence: 'medium', sources: ['IISS Military Balance'],
    army: [{ platformId: 'k21', quantity: 0, status: 'active', notes: '경장갑차 위주' }],
    navy: [{ platformId: 'opv-generic', quantity: 6, status: 'active', variant: 'Jose Rizal급' }],
    airForce: [{ platformId: 'fa50', quantity: 12, status: 'active' }],
  },
  {
    id: 'MM', name: 'Myanmar', nameKo: '미얀마', region: 'southeast-asia', flagEmoji: '🇲🇲', dataTier: 3,
    population: 54000000, defenseBudget_usd: 2000000000, activePersonnel: 350000, paramilitary: 107000,
    hasMilitary: true, dataConfidence: 'low', sources: ['IISS Military Balance(추정)'],
    army: [{ platformId: 't90m', quantity: 0, status: 'active', notes: 'T-72/MBT-2000' }],
    navy: [{ platformId: 'opv-generic', quantity: 5, status: 'active' }],
    airForce: [{ platformId: 'mig29', quantity: 31, status: 'active' }, { platformId: 'su30mki', quantity: 6, status: 'active', variant: 'Su-30SME' }],
  },
  {
    id: 'KH', name: 'Cambodia', nameKo: '캄보디아', region: 'southeast-asia', flagEmoji: '🇰🇭', dataTier: 4,
    population: 17000000, defenseBudget_usd: 600000000, activePersonnel: 124000, paramilitary: 67000,
    hasMilitary: true, dataConfidence: 'low',
    army: [{ platformId: 't90m', quantity: 0, status: 'active', notes: 'T-54/T-55 노후' }], navy: [{ platformId: 'fast-patrol-boat', quantity: 13, status: 'active' }], airForce: [],
  },
  {
    id: 'LA', name: 'Laos', nameKo: '라오스', region: 'southeast-asia', flagEmoji: '🇱🇦', dataTier: 4,
    population: 7600000, defenseBudget_usd: 30000000, activePersonnel: 29000, paramilitary: 100000,
    hasMilitary: true, dataConfidence: 'low',
    army: [{ platformId: 't90m', quantity: 0, status: 'active', notes: 'T-72B 소수' }], navy: [{ platformId: 'fast-patrol-boat', quantity: 16, status: 'active', notes: '메콩강 경비정' }], airForce: [],
  },
  {
    id: 'BN', name: 'Brunei', nameKo: '브루나이', region: 'southeast-asia', flagEmoji: '🇧🇳', dataTier: 4,
    population: 450000, defenseBudget_usd: 430000000, activePersonnel: 7000, paramilitary: 4000,
    hasMilitary: true, dataConfidence: 'low',
    army: [], navy: [{ platformId: 'opv-generic', quantity: 4, status: 'active', variant: 'Darussalam급' }], airForce: [],
  },
] satisfies readonly Country[];
