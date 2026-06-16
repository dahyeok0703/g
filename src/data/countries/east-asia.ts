import type { Country } from '@/types';

// East Asia. Tier 1: CN, JP, KR, KP. (TW, MN added in Stage 5.)
// Quantities are approximate public-source figures (GFP/IISS-style), editable.
export const EAST_ASIA = [
  {
    id: 'CN', name: 'China', nameKo: '중국', region: 'east-asia', flagEmoji: '🇨🇳', dataTier: 1,
    population: 1410000000, defenseBudget_usd: 296000000000, activePersonnel: 2035000, reservePersonnel: 510000,
    paramilitary: 625000, nuclearWarheads: 500, hasMilitary: true, dataConfidence: 'medium',
    sources: ['IISS Military Balance', 'GlobalFirepower', 'Wikipedia: PLA'],
    army: [
      { platformId: 'type99a', quantity: 1200, status: 'active' },
      { platformId: 'bmp3', quantity: 750, status: 'active', notes: 'ZBD 계열 포함 근사치' },
      { platformId: 'chunmoo', quantity: 300, status: 'active', variant: 'PHL-03/16' },
    ],
    navy: [
      { platformId: 'liaoning-cv', quantity: 2, status: 'active', notes: 'Liaoning + Shandong' },
      { platformId: 'type055', quantity: 8, status: 'active' },
      { platformId: 'type052d', quantity: 25, status: 'active' },
      { platformId: 'kilo-877', quantity: 12, status: 'active', variant: 'Kilo + Yuan급 근사' },
    ],
    airForce: [
      { platformId: 'j20', quantity: 200, status: 'active' },
      { platformId: 'su35', quantity: 24, status: 'active' },
      { platformId: 'mig29', quantity: 0, status: 'retired' },
    ],
    strategic: [
      { platformId: 'himars', quantity: 0, status: 'active', notes: 'DF 계열 전략로켓군 (플랫폼 추상화)' },
    ],
  },
  {
    id: 'JP', name: 'Japan', nameKo: '일본', region: 'east-asia', flagEmoji: '🇯🇵', dataTier: 1,
    population: 124000000, defenseBudget_usd: 50000000000, activePersonnel: 247000, reservePersonnel: 56000,
    paramilitary: 14000, nuclearWarheads: 0, hasMilitary: true, dataConfidence: 'high',
    sources: ['IISS Military Balance', 'JMSDF/JASDF 공개자료'],
    army: [
      { platformId: 'leopard2a7', quantity: 0, status: 'active', notes: 'Type 10/90 전차 (근사 표현)' },
      { platformId: 'pzh2000', quantity: 0, status: 'active', notes: 'Type 99 자주포' },
    ],
    navy: [
      { platformId: 'izumo-ddh', quantity: 2, status: 'active' },
      { platformId: 'maya-ddg', quantity: 2, status: 'active' },
      { platformId: 'sejong-kdx3', quantity: 0, status: 'active', notes: '아타고/공고급 이지스 (근사)' },
    ],
    airForce: [
      { platformId: 'f35a', quantity: 40, status: 'active' },
      { platformId: 'f15k', quantity: 200, status: 'active', variant: 'F-15J' },
    ],
  },
  {
    id: 'KR', name: 'South Korea', nameKo: '대한민국', region: 'east-asia', flagEmoji: '🇰🇷', dataTier: 1,
    population: 51700000, defenseBudget_usd: 46000000000, activePersonnel: 500000, reservePersonnel: 3100000,
    paramilitary: 3000, nuclearWarheads: 0, hasMilitary: true, dataConfidence: 'high',
    sources: ['IISS Military Balance', '국방백서', 'GlobalFirepower'],
    army: [
      { platformId: 'k2', quantity: 260, status: 'active' },
      { platformId: 'k21', quantity: 460, status: 'active' },
      { platformId: 'k9-thunder', quantity: 1200, status: 'active' },
      { platformId: 'chunmoo', quantity: 80, status: 'active' },
    ],
    navy: [
      { platformId: 'sejong-kdx3', quantity: 3, status: 'active' },
      { platformId: 'dokdo-lph', quantity: 2, status: 'active' },
    ],
    airForce: [
      { platformId: 'f35a', quantity: 40, status: 'active' },
      { platformId: 'f15k', quantity: 59, status: 'active' },
      { platformId: 'kf21', quantity: 6, status: 'ordered' },
      { platformId: 'fa50', quantity: 60, status: 'active' },
    ],
    strategic: [
      { platformId: 'chunmoo', quantity: 0, status: 'active', notes: '현무 탄도/순항 (전략표적사령부)' },
    ],
  },
  {
    id: 'KP', name: 'North Korea', nameKo: '북한', region: 'east-asia', flagEmoji: '🇰🇵', dataTier: 1,
    population: 26000000, defenseBudget_usd: 4000000000, activePersonnel: 1280000, reservePersonnel: 600000,
    paramilitary: 5700000, nuclearWarheads: 50, hasMilitary: true, dataConfidence: 'low',
    sources: ['IISS Military Balance(추정)', 'Wikipedia: KPA'],
    army: [
      { platformId: 't90m', quantity: 0, status: 'active', notes: '천마호/선군호 (T-62/T-72 파생, 근사)' },
      { platformId: 'smerch', quantity: 0, status: 'active', notes: '240mm/300mm 방사포 다수' },
    ],
    navy: [
      { platformId: 'kilo-877', quantity: 20, status: 'active', notes: '로미오급 등 노후 잠수함 다수' },
      { platformId: 'fast-patrol-boat', quantity: 380, status: 'active' },
    ],
    airForce: [
      { platformId: 'mig29', quantity: 35, status: 'active' },
    ],
    strategic: [
      { platformId: 'himars', quantity: 0, status: 'active', notes: '화성 계열 ICBM/SRBM (전략군)' },
    ],
  },
  {
    id: 'TW', name: 'Taiwan', nameKo: '대만', region: 'east-asia', flagEmoji: '🇹🇼', dataTier: 2,
    population: 23400000, defenseBudget_usd: 19000000000, activePersonnel: 169000, reservePersonnel: 1660000,
    paramilitary: 12000, hasMilitary: true, dataConfidence: 'medium', sources: ['IISS Military Balance'],
    army: [{ platformId: 'm1a2', quantity: 108, status: 'active', variant: 'M1A2T' }, { platformId: 'k9-thunder', quantity: 0, status: 'active', notes: 'M109 + Thunderbolt-2000' }, { platformId: 'himars', quantity: 29, status: 'ordered' }],
    navy: [{ platformId: 'ticonderoga', quantity: 4, status: 'active', variant: 'Kee Lung급 (전 Kidd급)' }, { platformId: 'kilo-877', quantity: 2, status: 'active', variant: 'Hai Lung + Hai Kun(국산)' }],
    airForce: [{ platformId: 'f16c', quantity: 140, status: 'active', variant: 'F-16V Block 70' }, { platformId: 'fa50', quantity: 0, status: 'active', notes: 'IDF 경국 + F-CK-1' }],
    strategic: [{ platformId: 'himars', quantity: 0, status: 'active', notes: '雄風/天弓 미사일' }],
  },
  {
    id: 'MN', name: 'Mongolia', nameKo: '몽골', region: 'east-asia', flagEmoji: '🇲🇳', dataTier: 4,
    population: 3400000, defenseBudget_usd: 130000000, activePersonnel: 9000, reservePersonnel: 137000,
    paramilitary: 7200, hasMilitary: true, dataConfidence: 'low', sources: ['내륙국 — 해군 없음'],
    army: [{ platformId: 't90m', quantity: 0, status: 'active', notes: 'T-72A 노후 소수' }], navy: [], airForce: [{ platformId: 'mig29', quantity: 0, status: 'active', notes: 'MiG-29 소수/수송헬기' }],
  },
] satisfies readonly Country[];
