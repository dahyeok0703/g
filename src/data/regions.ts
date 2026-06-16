import type { Region } from '@/types';

// Region registry. Country data files are split per region for code-splitting
// / lazy loading (spec §1, §5). Region id ⇢ dynamic import lives in
// countries/index.ts.
export const REGIONS = [
  { id: 'east-asia', name: 'East Asia', nameKo: '동아시아' },
  { id: 'southeast-asia', name: 'Southeast Asia', nameKo: '동남아시아' },
  { id: 'south-asia', name: 'South Asia', nameKo: '남아시아' },
  { id: 'pacific', name: 'Pacific Islands', nameKo: '태평양 도서국' },
  { id: 'middle-east', name: 'Middle East', nameKo: '중동' },
  { id: 'europe', name: 'Europe', nameKo: '유럽' },
  { id: 'africa', name: 'Africa', nameKo: '아프리카' },
  { id: 'americas', name: 'Americas', nameKo: '아메리카' },
] satisfies readonly Region[];

export type RegionId = (typeof REGIONS)[number]['id'];

export const REGION_BY_ID: Record<string, Region> = Object.fromEntries(
  REGIONS.map((r) => [r.id, r])
);
