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
