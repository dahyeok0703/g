import type { Country } from '@/types';

// Americas. Tier 1: US. (CA, BR, MX, AR, etc. added in Stage 5.)
export const AMERICAS = [
  {
    id: 'US', name: 'United States', nameKo: '미국', region: 'americas', flagEmoji: '🇺🇸', dataTier: 1,
    population: 335000000, defenseBudget_usd: 842000000000, activePersonnel: 1330000, reservePersonnel: 800000,
    paramilitary: 0, nuclearWarheads: 5044, hasMilitary: true, dataConfidence: 'high',
    sources: ['IISS Military Balance', 'DoD 공개자료', 'GlobalFirepower'],
    army: [
      { platformId: 'm1a2', quantity: 2500, status: 'active' },
      { platformId: 'm2a3', quantity: 3000, status: 'active' },
      { platformId: 'himars', quantity: 410, status: 'active' },
      { platformId: 'patriot', quantity: 60, status: 'active', notes: '패트리어트 포대' },
    ],
    navy: [
      { platformId: 'gerald-ford', quantity: 1, status: 'active' },
      { platformId: 'nimitz', quantity: 10, status: 'active' },
      { platformId: 'ticonderoga', quantity: 13, status: 'active' },
      { platformId: 'arleigh-burke-iia', quantity: 73, status: 'active' },
      { platformId: 'virginia-ssn', quantity: 23, status: 'active' },
      { platformId: 'ohio-ssbn', quantity: 14, status: 'active' },
    ],
    airForce: [
      { platformId: 'f22', quantity: 180, status: 'active' },
      { platformId: 'f35a', quantity: 450, status: 'active' },
      { platformId: 'f16c', quantity: 780, status: 'active' },
      { platformId: 'fa18ef', quantity: 530, status: 'active', notes: '해군/해병 항공' },
      { platformId: 'b2', quantity: 20, status: 'active' },
      { platformId: 'b52h', quantity: 76, status: 'active' },
      { platformId: 'ah64e', quantity: 700, status: 'active' },
      { platformId: 'mq9', quantity: 300, status: 'active' },
      { platformId: 'e3-awacs', quantity: 31, status: 'active' },
    ],
    strategic: [
      { platformId: 'ohio-ssbn', quantity: 14, status: 'active', notes: 'SSBN 기반 SLBM (트라이던트)' },
      { platformId: 'b2', quantity: 20, status: 'active', notes: '공중 핵 투발' },
    ],
  },
] satisfies readonly Country[];
