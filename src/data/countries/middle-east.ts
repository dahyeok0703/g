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
] satisfies readonly Country[];
