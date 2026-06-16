import type { Country } from '@/types';

// Middle East. Tier 1: IL, TR. (SA, IR, EG, AE, ... added in Stage 5.)
export const MIDDLE_EAST = [
  {
    id: 'IL', name: 'Israel', nameKo: '이스라엘', region: 'middle-east', flagEmoji: '🇮🇱', dataTier: 1,
    population: 9800000, defenseBudget_usd: 27500000000, activePersonnel: 170000, reservePersonnel: 465000,
    paramilitary: 8000, nuclearWarheads: 90, hasMilitary: true, dataConfidence: 'medium',
    sources: ['IISS Military Balance', 'GlobalFirepower'],
    army: [
      { platformId: 'merkava4', quantity: 400, status: 'active' },
      { platformId: 'm2a3', quantity: 0, status: 'active', notes: 'Namer 중APC' },
      { platformId: 'chunmoo', quantity: 0, status: 'active', notes: 'PULS 다연장' },
    ],
    navy: [
      { platformId: 'kilo-877', quantity: 5, status: 'active', variant: 'Dolphin급 SSK' },
      { platformId: 'opv-generic', quantity: 4, status: 'active', variant: 'Sa\'ar 6 코르벳' },
    ],
    airForce: [
      { platformId: 'f35a', quantity: 39, status: 'active', variant: 'F-35I Adir' },
      { platformId: 'f15k', quantity: 83, status: 'active', variant: 'F-15I Ra\'am' },
      { platformId: 'f16c', quantity: 175, status: 'active', variant: 'F-16I Sufa' },
    ],
    strategic: [
      { platformId: 'kilo-877', quantity: 0, status: 'active', notes: 'Jericho 탄도미사일 (비공식)' },
    ],
  },
  {
    id: 'TR', name: 'Türkiye', nameKo: '튀르키예', region: 'middle-east', flagEmoji: '🇹🇷', dataTier: 1,
    population: 85000000, defenseBudget_usd: 40000000000, activePersonnel: 355000, reservePersonnel: 380000,
    paramilitary: 156000, nuclearWarheads: 0, hasMilitary: true, dataConfidence: 'medium',
    sources: ['IISS Military Balance', 'GlobalFirepower'],
    army: [
      { platformId: 'leopard2a7', quantity: 316, status: 'active', variant: 'Leopard 2A4 + Altay 도입' },
      { platformId: 'm777-155', quantity: 0, status: 'active', notes: 'T-155 Fırtına 자주포' },
      { platformId: 'chunmoo', quantity: 0, status: 'active', notes: 'TRLG/Kasırga 다연장' },
    ],
    navy: [
      { platformId: 'izumo-ddh', quantity: 1, status: 'active', variant: 'TCG Anadolu (LHD)' },
      { platformId: 'fremm-fr', quantity: 4, status: 'active', variant: 'Istif/Barbaros (근사)' },
      { platformId: 'kilo-877', quantity: 12, status: 'active', variant: 'Type 209/214' },
    ],
    airForce: [
      { platformId: 'f16c', quantity: 245, status: 'active' },
      { platformId: 'mq9', quantity: 0, status: 'active', notes: 'Bayraktar TB2/Akıncı 드론 다수' },
    ],
  },
  {
    id: 'SA', name: 'Saudi Arabia', nameKo: '사우디아라비아', region: 'middle-east', flagEmoji: '🇸🇦', dataTier: 2,
    population: 37000000, defenseBudget_usd: 75000000000, activePersonnel: 257000, paramilitary: 24500,
    hasMilitary: true, dataConfidence: 'medium', sources: ['IISS Military Balance'],
    army: [{ platformId: 'm1a2', quantity: 370, status: 'active', variant: 'M1A2S' }, { platformId: 'm2a3', quantity: 400, status: 'active' }],
    navy: [{ platformId: 'fremm-fr', quantity: 4, status: 'active', variant: 'Al-Riyadh급' }, { platformId: 'opv-generic', quantity: 5, status: 'active' }],
    airForce: [{ platformId: 'f15k', quantity: 84, status: 'active', variant: 'F-15SA' }, { platformId: 'typhoon', quantity: 71, status: 'active' }],
  },
  {
    id: 'IR', name: 'Iran', nameKo: '이란', region: 'middle-east', flagEmoji: '🇮🇷', dataTier: 2,
    population: 89000000, defenseBudget_usd: 10000000000, activePersonnel: 610000, reservePersonnel: 350000,
    paramilitary: 220000, hasMilitary: true, dataConfidence: 'low', sources: ['IISS Military Balance(추정)'],
    army: [{ platformId: 't90m', quantity: 0, status: 'active', notes: 'Karrar/T-72S' }, { platformId: 'smerch', quantity: 0, status: 'active', notes: 'Fajr/Zelzal 로켓' }],
    navy: [{ platformId: 'kilo-877', quantity: 3, status: 'active' }, { platformId: 'fast-patrol-boat', quantity: 100, status: 'active', notes: 'IRGC 고속정 다수' }],
    airForce: [{ platformId: 'mig29', quantity: 35, status: 'active' }, { platformId: 'f16c', quantity: 0, status: 'active', notes: 'F-14A 노후 + Su-35 도입' }],
    strategic: [{ platformId: 'smerch', quantity: 0, status: 'active', notes: 'Shahab/Khorramshahr 탄도미사일' }],
  },
  {
    id: 'EG', name: 'Egypt', nameKo: '이집트', region: 'middle-east', flagEmoji: '🇪🇬', dataTier: 2,
    population: 112000000, defenseBudget_usd: 4600000000, activePersonnel: 440000, reservePersonnel: 480000,
    paramilitary: 300000, hasMilitary: true, dataConfidence: 'medium', sources: ['IISS Military Balance'],
    army: [{ platformId: 'm1a2', quantity: 1130, status: 'active', variant: 'M1A1' }],
    navy: [{ platformId: 'izumo-ddh', quantity: 2, status: 'active', variant: 'Mistral급 LHD' }, { platformId: 'fremm-fr', quantity: 1, status: 'active' }],
    airForce: [{ platformId: 'rafale', quantity: 24, status: 'active' }, { platformId: 'f16c', quantity: 220, status: 'active' }, { platformId: 'mig29', quantity: 46, status: 'active', variant: 'MiG-29M' }],
  },
  {
    id: 'AE', name: 'United Arab Emirates', nameKo: '아랍에미리트', region: 'middle-east', flagEmoji: '🇦🇪', dataTier: 2,
    population: 9500000, defenseBudget_usd: 22000000000, activePersonnel: 63000, paramilitary: 0,
    hasMilitary: true, dataConfidence: 'medium', sources: ['IISS Military Balance'],
    army: [{ platformId: 'leopard2a7', quantity: 0, status: 'active', notes: 'Leclerc 388대' }],
    navy: [{ platformId: 'opv-generic', quantity: 6, status: 'active', variant: 'Baynunah 코르벳' }],
    airForce: [{ platformId: 'f16c', quantity: 79, status: 'active', variant: 'F-16E/F Block 60' }, { platformId: 'rafale', quantity: 80, status: 'ordered' }],
  },
  {
    id: 'IQ', name: 'Iraq', nameKo: '이라크', region: 'middle-east', flagEmoji: '🇮🇶', dataTier: 3,
    population: 44000000, defenseBudget_usd: 4400000000, activePersonnel: 193000, paramilitary: 230000,
    hasMilitary: true, dataConfidence: 'low',
    army: [{ platformId: 'm1a2', quantity: 140, status: 'active', variant: 'M1A1M' }], navy: [{ platformId: 'opv-generic', quantity: 4, status: 'active' }], airForce: [{ platformId: 'fa50', quantity: 24, status: 'active', variant: 'T-50IQ' }],
  },
  {
    id: 'SY', name: 'Syria', nameKo: '시리아', region: 'middle-east', flagEmoji: '🇸🇾', dataTier: 3,
    population: 23000000, defenseBudget_usd: 1800000000, activePersonnel: 150000, paramilitary: 100000,
    hasMilitary: true, dataConfidence: 'low', sources: ['내전 후 실태 불확실'],
    army: [{ platformId: 't90m', quantity: 0, status: 'active', notes: 'T-72/T-90 혼재' }], navy: [{ platformId: 'fast-patrol-boat', quantity: 8, status: 'active' }], airForce: [{ platformId: 'mig29', quantity: 20, status: 'active' }],
  },
  {
    id: 'JO', name: 'Jordan', nameKo: '요르단', region: 'middle-east', flagEmoji: '🇯🇴', dataTier: 3,
    population: 11000000, defenseBudget_usd: 2000000000, activePersonnel: 100500, paramilitary: 15000,
    hasMilitary: true, dataConfidence: 'medium',
    army: [{ platformId: 'challenger2', quantity: 90, status: 'active', variant: 'Al-Hussein' }], navy: [{ platformId: 'fast-patrol-boat', quantity: 6, status: 'active' }], airForce: [{ platformId: 'f16c', quantity: 43, status: 'active' }],
  },
  {
    id: 'KW', name: 'Kuwait', nameKo: '쿠웨이트', region: 'middle-east', flagEmoji: '🇰🇼', dataTier: 3,
    population: 4300000, defenseBudget_usd: 8200000000, activePersonnel: 17500, paramilitary: 7100,
    hasMilitary: true, dataConfidence: 'medium',
    army: [{ platformId: 'm1a2', quantity: 218, status: 'active' }], navy: [{ platformId: 'fast-patrol-boat', quantity: 10, status: 'active' }], airForce: [{ platformId: 'typhoon', quantity: 28, status: 'active' }, { platformId: 'fa18ef', quantity: 28, status: 'active', variant: 'F/A-18C' }],
  },
  {
    id: 'OM', name: 'Oman', nameKo: '오만', region: 'middle-east', flagEmoji: '🇴🇲', dataTier: 4,
    population: 4600000, defenseBudget_usd: 5900000000, activePersonnel: 42000, paramilitary: 4400,
    hasMilitary: true, dataConfidence: 'low',
    army: [{ platformId: 'challenger2', quantity: 38, status: 'active' }], navy: [{ platformId: 'opv-generic', quantity: 4, status: 'active' }], airForce: [{ platformId: 'f16c', quantity: 23, status: 'active' }],
  },
  {
    id: 'BH', name: 'Bahrain', nameKo: '바레인', region: 'middle-east', flagEmoji: '🇧🇭', dataTier: 4,
    population: 1500000, defenseBudget_usd: 1500000000, activePersonnel: 8200, paramilitary: 11260,
    hasMilitary: true, dataConfidence: 'low',
    army: [{ platformId: 'm1a2', quantity: 180, status: 'active', variant: 'M60A3' }], navy: [{ platformId: 'opv-generic', quantity: 2, status: 'active' }], airForce: [{ platformId: 'f16c', quantity: 35, status: 'active', variant: 'F-16V Block 70' }],
  },
  {
    id: 'LB', name: 'Lebanon', nameKo: '레바논', region: 'middle-east', flagEmoji: '🇱🇧', dataTier: 4,
    population: 5400000, defenseBudget_usd: 600000000, activePersonnel: 60000, paramilitary: 20000,
    hasMilitary: true, dataConfidence: 'low',
    army: [{ platformId: 'm1a2', quantity: 0, status: 'active', notes: 'M48/M60 노후' }], navy: [{ platformId: 'fast-patrol-boat', quantity: 7, status: 'active' }], airForce: [],
  },
] satisfies readonly Country[];
