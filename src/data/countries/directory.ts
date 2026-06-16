import type { CountryMeta } from '@/types';
import type { RegionId } from '@/data/regions';

// Lightweight, always-loaded directory of every country for the browser grid
// and global search (spec §4.1). Full order-of-battle loads lazily per region
// (see index.ts). Keep this in sync with the region data files; Stage 5 expands
// it region by region.
//
// Tuple form keeps the source compact: [id, name, nameKo, region, flag, tier, hasMil]
type Row = [string, string, string, RegionId, string, 1 | 2 | 3 | 4, boolean];

const ROWS: Row[] = [
  // ── Tier 1 (Stage 4) ──────────────────────────────────────────────
  ['US', 'United States', '미국', 'americas', '🇺🇸', 1, true],
  ['CN', 'China', '중국', 'east-asia', '🇨🇳', 1, true],
  ['RU', 'Russia', '러시아', 'europe', '🇷🇺', 1, true],
  ['IN', 'India', '인도', 'south-asia', '🇮🇳', 1, true],
  ['KR', 'South Korea', '대한민국', 'east-asia', '🇰🇷', 1, true],
  ['JP', 'Japan', '일본', 'east-asia', '🇯🇵', 1, true],
  ['KP', 'North Korea', '북한', 'east-asia', '🇰🇵', 1, true],
  ['GB', 'United Kingdom', '영국', 'europe', '🇬🇧', 1, true],
  ['FR', 'France', '프랑스', 'europe', '🇫🇷', 1, true],
  ['DE', 'Germany', '독일', 'europe', '🇩🇪', 1, true],
  ['IL', 'Israel', '이스라엘', 'middle-east', '🇮🇱', 1, true],
  ['TR', 'Türkiye', '튀르키예', 'middle-east', '🇹🇷', 1, true],

  // ── East Asia (Stage 5) ───────────────────────────────────────────
  ['TW', 'Taiwan', '대만', 'east-asia', '🇹🇼', 2, true],
  ['MN', 'Mongolia', '몽골', 'east-asia', '🇲🇳', 4, true],

  // ── Southeast Asia ────────────────────────────────────────────────
  ['ID', 'Indonesia', '인도네시아', 'southeast-asia', '🇮🇩', 2, true],
  ['VN', 'Vietnam', '베트남', 'southeast-asia', '🇻🇳', 2, true],
  ['SG', 'Singapore', '싱가포르', 'southeast-asia', '🇸🇬', 2, true],
  ['TH', 'Thailand', '태국', 'southeast-asia', '🇹🇭', 3, true],
  ['MY', 'Malaysia', '말레이시아', 'southeast-asia', '🇲🇾', 3, true],
  ['PH', 'Philippines', '필리핀', 'southeast-asia', '🇵🇭', 3, true],
  ['MM', 'Myanmar', '미얀마', 'southeast-asia', '🇲🇲', 3, true],
  ['KH', 'Cambodia', '캄보디아', 'southeast-asia', '🇰🇭', 4, true],
  ['LA', 'Laos', '라오스', 'southeast-asia', '🇱🇦', 4, true],
  ['BN', 'Brunei', '브루나이', 'southeast-asia', '🇧🇳', 4, true],

  // ── South Asia ────────────────────────────────────────────────────
  ['PK', 'Pakistan', '파키스탄', 'south-asia', '🇵🇰', 2, true],
  ['BD', 'Bangladesh', '방글라데시', 'south-asia', '🇧🇩', 3, true],
  ['LK', 'Sri Lanka', '스리랑카', 'south-asia', '🇱🇰', 3, true],
  ['NP', 'Nepal', '네팔', 'south-asia', '🇳🇵', 4, true],
  ['AF', 'Afghanistan', '아프가니스탄', 'south-asia', '🇦🇫', 4, true],
  ['BT', 'Bhutan', '부탄', 'south-asia', '🇧🇹', 4, true],

  // ── Pacific ───────────────────────────────────────────────────────
  ['AU', 'Australia', '호주', 'pacific', '🇦🇺', 2, true],
  ['NZ', 'New Zealand', '뉴질랜드', 'pacific', '🇳🇿', 3, true],
  ['FJ', 'Fiji', '피지', 'pacific', '🇫🇯', 4, true],
  ['PG', 'Papua New Guinea', '파푸아뉴기니', 'pacific', '🇵🇬', 4, true],
  ['TO', 'Tonga', '통가', 'pacific', '🇹🇴', 4, true],
  ['TV', 'Tuvalu', '투발루', 'pacific', '🇹🇻', 4, false],
  ['NR', 'Nauru', '나우루', 'pacific', '🇳🇷', 4, false],
  ['PW', 'Palau', '팔라우', 'pacific', '🇵🇼', 4, false],
  ['WS', 'Samoa', '사모아', 'pacific', '🇼🇸', 4, false],
  ['KI', 'Kiribati', '키리바시', 'pacific', '🇰🇮', 4, false],
  ['MH', 'Marshall Islands', '마셜 제도', 'pacific', '🇲🇭', 4, false],
  ['FM', 'Micronesia', '미크로네시아 연방', 'pacific', '🇫🇲', 4, false],
  ['SB', 'Solomon Islands', '솔로몬 제도', 'pacific', '🇸🇧', 4, false],
  ['VU', 'Vanuatu', '바누아투', 'pacific', '🇻🇺', 4, false],

  // ── Middle East ───────────────────────────────────────────────────
  ['SA', 'Saudi Arabia', '사우디아라비아', 'middle-east', '🇸🇦', 2, true],
  ['IR', 'Iran', '이란', 'middle-east', '🇮🇷', 2, true],
  ['EG', 'Egypt', '이집트', 'middle-east', '🇪🇬', 2, true],
  ['AE', 'United Arab Emirates', '아랍에미리트', 'middle-east', '🇦🇪', 2, true],
  ['IQ', 'Iraq', '이라크', 'middle-east', '🇮🇶', 3, true],
  ['SY', 'Syria', '시리아', 'middle-east', '🇸🇾', 3, true],
  ['JO', 'Jordan', '요르단', 'middle-east', '🇯🇴', 3, true],
  ['KW', 'Kuwait', '쿠웨이트', 'middle-east', '🇰🇼', 3, true],
  ['OM', 'Oman', '오만', 'middle-east', '🇴🇲', 4, true],
  ['BH', 'Bahrain', '바레인', 'middle-east', '🇧🇭', 4, true],
  ['LB', 'Lebanon', '레바논', 'middle-east', '🇱🇧', 4, true],

  // ── Europe ────────────────────────────────────────────────────────
  ['IT', 'Italy', '이탈리아', 'europe', '🇮🇹', 2, true],
  ['ES', 'Spain', '스페인', 'europe', '🇪🇸', 2, true],
  ['PL', 'Poland', '폴란드', 'europe', '🇵🇱', 2, true],
  ['UA', 'Ukraine', '우크라이나', 'europe', '🇺🇦', 2, true],
  ['NL', 'Netherlands', '네덜란드', 'europe', '🇳🇱', 3, true],
  ['SE', 'Sweden', '스웨덴', 'europe', '🇸🇪', 3, true],
  ['FI', 'Finland', '핀란드', 'europe', '🇫🇮', 3, true],
  ['NO', 'Norway', '노르웨이', 'europe', '🇳🇴', 3, true],
  ['GR', 'Greece', '그리스', 'europe', '🇬🇷', 3, true],
  ['CH', 'Switzerland', '스위스', 'europe', '🇨🇭', 3, true],
  ['IS', 'Iceland', '아이슬란드', 'europe', '🇮🇸', 4, false],

  // ── Africa ────────────────────────────────────────────────────────
  ['DZ', 'Algeria', '알제리', 'africa', '🇩🇿', 2, true],
  ['NG', 'Nigeria', '나이지리아', 'africa', '🇳🇬', 3, true],
  ['ZA', 'South Africa', '남아프리카공화국', 'africa', '🇿🇦', 3, true],
  ['MA', 'Morocco', '모로코', 'africa', '🇲🇦', 3, true],
  ['ET', 'Ethiopia', '에티오피아', 'africa', '🇪🇹', 4, true],
  ['KE', 'Kenya', '케냐', 'africa', '🇰🇪', 4, true],

  // ── Americas ──────────────────────────────────────────────────────
  ['CA', 'Canada', '캐나다', 'americas', '🇨🇦', 2, true],
  ['BR', 'Brazil', '브라질', 'americas', '🇧🇷', 2, true],
  ['MX', 'Mexico', '멕시코', 'americas', '🇲🇽', 3, true],
  ['AR', 'Argentina', '아르헨티나', 'americas', '🇦🇷', 3, true],
  ['CL', 'Chile', '칠레', 'americas', '🇨🇱', 3, true],
  ['CO', 'Colombia', '콜롬비아', 'americas', '🇨🇴', 4, true],
  ['VE', 'Venezuela', '베네수엘라', 'americas', '🇻🇪', 4, true],
  ['CR', 'Costa Rica', '코스타리카', 'americas', '🇨🇷', 4, false],
  ['PA', 'Panama', '파나마', 'americas', '🇵🇦', 4, false],
];

export const COUNTRY_DIRECTORY: CountryMeta[] = ROWS.map(
  ([id, name, nameKo, region, flagEmoji, dataTier, hasMilitary]) => ({
    id,
    name,
    nameKo,
    region,
    flagEmoji,
    dataTier,
    hasMilitary,
  })
);

export const DIRECTORY_BY_ID: Map<string, CountryMeta> = new Map(
  COUNTRY_DIRECTORY.map((c) => [c.id, c])
);

export const DIRECTORY_BY_REGION: Map<string, CountryMeta[]> =
  COUNTRY_DIRECTORY.reduce((acc, c) => {
    const list = acc.get(c.region) ?? [];
    list.push(c);
    acc.set(c.region, list);
    return acc;
  }, new Map<string, CountryMeta[]>());
