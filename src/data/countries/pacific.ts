import type { Country } from '@/types';

// Pacific (Stage 5). AU/NZ are real forces; most island states have no standing
// army (hasMilitary:false) — only police/coast guard. Small nations are *easy*
// data: a few patrol boats or nothing (spec §2.5).
export const PACIFIC = [
  {
    id: 'AU', name: 'Australia', nameKo: '호주', region: 'pacific', flagEmoji: '🇦🇺', dataTier: 2,
    population: 26000000, defenseBudget_usd: 32000000000, activePersonnel: 58000, reservePersonnel: 30000,
    paramilitary: 0, hasMilitary: true, dataConfidence: 'high', sources: ['IISS Military Balance'],
    army: [{ platformId: 'm1a2', quantity: 59, status: 'active', variant: 'M1A1 AIM' }, { platformId: 'k9-thunder', quantity: 30, status: 'ordered', variant: 'AS9 Huntsman' }],
    navy: [{ platformId: 'arleigh-burke-iia', quantity: 3, status: 'active', variant: 'Hobart급 DDG' }, { platformId: 'fremm-fr', quantity: 8, status: 'active', variant: 'Anzac/Hunter' }, { platformId: 'kilo-877', quantity: 6, status: 'active', variant: 'Collins급' }],
    airForce: [{ platformId: 'f35a', quantity: 63, status: 'active' }, { platformId: 'fa18ef', quantity: 24, status: 'active' }],
  },
  {
    id: 'NZ', name: 'New Zealand', nameKo: '뉴질랜드', region: 'pacific', flagEmoji: '🇳🇿', dataTier: 3,
    population: 5200000, defenseBudget_usd: 3000000000, activePersonnel: 9000, reservePersonnel: 2500,
    paramilitary: 0, hasMilitary: true, dataConfidence: 'high', sources: ['IISS Military Balance'],
    army: [{ platformId: 'k21', quantity: 0, status: 'active', notes: 'NZLAV 경장갑차' }],
    navy: [{ platformId: 'fremm-fr', quantity: 2, status: 'active', variant: 'Anzac급' }, { platformId: 'opv-generic', quantity: 2, status: 'active' }],
    airForce: [{ platformId: 'c130', quantity: 5, status: 'active', notes: '전투기 없음(2001 폐지)' }],
  },
  {
    id: 'FJ', name: 'Fiji', nameKo: '피지', region: 'pacific', flagEmoji: '🇫🇯', dataTier: 4,
    population: 930000, defenseBudget_usd: 60000000, activePersonnel: 3500, paramilitary: 0,
    hasMilitary: true, dataConfidence: 'low',
    army: [{ platformId: 'technical', quantity: 0, status: 'active', notes: '보병 위주' }], navy: [{ platformId: 'fast-patrol-boat', quantity: 9, status: 'active' }], airForce: [],
  },
  {
    id: 'PG', name: 'Papua New Guinea', nameKo: '파푸아뉴기니', region: 'pacific', flagEmoji: '🇵🇬', dataTier: 4,
    population: 10300000, defenseBudget_usd: 90000000, activePersonnel: 3600, paramilitary: 0,
    hasMilitary: true, dataConfidence: 'low',
    army: [], navy: [{ platformId: 'fast-patrol-boat', quantity: 4, status: 'active', variant: 'Guardian급' }], airForce: [],
  },
  {
    id: 'TO', name: 'Tonga', nameKo: '통가', region: 'pacific', flagEmoji: '🇹🇴', dataTier: 4,
    population: 105000, defenseBudget_usd: 12000000, activePersonnel: 500, paramilitary: 0,
    hasMilitary: true, dataConfidence: 'low',
    army: [], navy: [{ platformId: 'fast-patrol-boat', quantity: 3, status: 'active' }], airForce: [],
  },
  // ── 군 미보유 도서국 (hasMilitary:false) ─────────────────────────────
  {
    id: 'TV', name: 'Tuvalu', nameKo: '투발루', region: 'pacific', flagEmoji: '🇹🇻', dataTier: 4,
    population: 11000, activePersonnel: 0, hasMilitary: false, dataConfidence: 'high',
    sources: ['정규군 미보유 — 경찰 해상감시대만 운용'],
    army: [], navy: [{ platformId: 'fast-patrol-boat', quantity: 1, status: 'active', notes: '경찰 소속 Guardian급 1척' }], airForce: [],
  },
  {
    id: 'NR', name: 'Nauru', nameKo: '나우루', region: 'pacific', flagEmoji: '🇳🇷', dataTier: 4,
    population: 12500, activePersonnel: 0, hasMilitary: false, dataConfidence: 'high',
    sources: ['정규군 미보유 — 호주가 안보 담당'],
    army: [], navy: [], airForce: [],
  },
  {
    id: 'PW', name: 'Palau', nameKo: '팔라우', region: 'pacific', flagEmoji: '🇵🇼', dataTier: 4,
    population: 18000, activePersonnel: 0, hasMilitary: false, dataConfidence: 'high',
    sources: ['정규군 미보유 — 미국과 자유연합협정(COFA), 해상경비정만'],
    army: [], navy: [{ platformId: 'fast-patrol-boat', quantity: 1, status: 'active' }], airForce: [],
  },
  {
    id: 'WS', name: 'Samoa', nameKo: '사모아', region: 'pacific', flagEmoji: '🇼🇸', dataTier: 4,
    population: 220000, activePersonnel: 0, hasMilitary: false, dataConfidence: 'high',
    sources: ['정규군 미보유'],
    army: [], navy: [{ platformId: 'fast-patrol-boat', quantity: 1, status: 'active' }], airForce: [],
  },
  {
    id: 'KI', name: 'Kiribati', nameKo: '키리바시', region: 'pacific', flagEmoji: '🇰🇮', dataTier: 4,
    population: 130000, activePersonnel: 0, hasMilitary: false, dataConfidence: 'high',
    sources: ['정규군 미보유 — 경찰 해상부대'],
    army: [], navy: [{ platformId: 'fast-patrol-boat', quantity: 1, status: 'active' }], airForce: [],
  },
  {
    id: 'MH', name: 'Marshall Islands', nameKo: '마셜 제도', region: 'pacific', flagEmoji: '🇲🇭', dataTier: 4,
    population: 42000, activePersonnel: 0, hasMilitary: false, dataConfidence: 'high',
    sources: ['정규군 미보유 — 미국 COFA'],
    army: [], navy: [{ platformId: 'fast-patrol-boat', quantity: 1, status: 'active' }], airForce: [],
  },
  {
    id: 'FM', name: 'Micronesia', nameKo: '미크로네시아 연방', region: 'pacific', flagEmoji: '🇫🇲', dataTier: 4,
    population: 113000, activePersonnel: 0, hasMilitary: false, dataConfidence: 'high',
    sources: ['정규군 미보유 — 미국 COFA'],
    army: [], navy: [{ platformId: 'fast-patrol-boat', quantity: 1, status: 'active' }], airForce: [],
  },
  {
    id: 'SB', name: 'Solomon Islands', nameKo: '솔로몬 제도', region: 'pacific', flagEmoji: '🇸🇧', dataTier: 4,
    population: 740000, activePersonnel: 0, hasMilitary: false, dataConfidence: 'high',
    sources: ['정규군 미보유 — 경찰 해상부대'],
    army: [], navy: [{ platformId: 'fast-patrol-boat', quantity: 2, status: 'active' }], airForce: [],
  },
  {
    id: 'VU', name: 'Vanuatu', nameKo: '바누아투', region: 'pacific', flagEmoji: '🇻🇺', dataTier: 4,
    population: 320000, activePersonnel: 0, hasMilitary: false, dataConfidence: 'high',
    sources: ['정규군 미보유 — 경찰 기동대'],
    army: [], navy: [{ platformId: 'fast-patrol-boat', quantity: 1, status: 'active' }], airForce: [],
  },
] satisfies readonly Country[];
