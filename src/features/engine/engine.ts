import {
  CLOTHING_BY_SLOT,
} from '@/data/clothing';
import { PERSON_MAP, PLACE_MAP, PURPOSE_MAP } from '@/data/context';
import type {
  CandidatePool,
  ClothingItem,
  Conditions,
  Formality,
  Look,
  ResolvedItem,
  SituationInput,
  Slot,
} from '@/lib/types';
import { SLOTS } from '@/lib/types';

// ── Deterministic core (spec §6) ──────────────────────────────────────────
// Rules narrow the dataset to a per-slot candidate pool by feels-like temp,
// condition overlays, and a blended formality requirement. Cheap + reliable;
// Claude curates on top of this, and `composeRuleLooks` is the offline fallback.

/** Final formality = conservative blend (lean to the stricter side). */
export function blendFormality(input: SituationInput): Formality {
  const fs: number[] = [
    PURPOSE_MAP[input.purpose].formality,
    PERSON_MAP[input.person].formality,
    PLACE_MAP[input.place].formality,
  ];
  const max = Math.max(...fs);
  const avg = fs.reduce((a, b) => a + b, 0) / fs.length;
  // bias 70% toward the strictest requirement
  return Math.round(max * 0.7 + avg * 0.3) as Formality;
}

export function bannedTags(input: SituationInput): Set<string> {
  return new Set([
    ...PURPOSE_MAP[input.purpose].ban,
    ...PERSON_MAP[input.person].ban,
    ...PLACE_MAP[input.place].ban,
  ]);
}

export function boostedTags(input: SituationInput): Set<string> {
  return new Set([
    ...PURPOSE_MAP[input.purpose].boost,
    ...PERSON_MAP[input.person].boost,
    ...PLACE_MAP[input.place].boost,
  ]);
}

/** Condition overlay → extra banned tags + forced-include accent tags. */
function conditionRules(c: Conditions): { ban: Set<string>; require: Set<string> } {
  const ban = new Set<string>();
  const require = new Set<string>();
  if (c.rain) {
    ban.add('open'); // no open-toe / wet-feet shoes
    require.add('rainproof'); // surface an umbrella / rain shoes
  }
  if (c.snow) {
    ban.add('open');
  }
  return { ban, require };
}

function tempFit(item: ClothingItem, feelsLike: number): boolean {
  return feelsLike >= item.minTemp && feelsLike <= item.maxTemp;
}

/** How well an item matches the situation (higher = better). */
export function scoreItem(item: ClothingItem, input: SituationInput): number {
  const formality = blendFormality(input);
  const boost = boostedTags(input);
  let score = 0;

  // temperature centering — prefer items comfortable at this exact temp
  const center = (item.minTemp + item.maxTemp) / 2;
  score -= Math.abs(center - input.feelsLike) * 0.04;

  // formality proximity (penalize being too casual or too dressy)
  score -= Math.abs(item.formality - formality) * 1.2;

  // boosted tags
  for (const t of item.tags) if (boost.has(t)) score += 1.5;

  // condition fit
  if (input.conditions.uvHigh && item.tags.includes('uv')) score += 1.0;
  if (input.conditions.windy && item.tags.includes('windbreak')) score += 0.8;
  if (input.conditions.humid && item.tags.includes('breathable')) score += 0.8;
  if ((input.conditions.rain || input.conditions.snow) && item.tags.includes('warm'))
    score += 0.3;

  return score;
}

/** Build the per-slot candidate pool handed to Claude (and the fallback). */
export function buildCandidatePool(input: SituationInput): CandidatePool {
  const ban = bannedTags(input);
  const cond = conditionRules(input.conditions);
  const pool = {} as CandidatePool;

  for (const slot of SLOTS) {
    const all = CLOTHING_BY_SLOT[slot] ?? [];
    let candidates = all.filter((item) => {
      if (!tempFit(item, input.feelsLike)) return false;
      if (item.tags.some((t) => ban.has(t) || cond.ban.has(t))) return false;
      return true;
    });

    // Hot weather: outer is optional → allow an empty pool.
    // Rank by score, keep the strongest handful per slot.
    candidates = candidates
      .sort((a, b) => scoreItem(b, input) - scoreItem(a, input))
      .slice(0, 6);

    // Force-include condition essentials (umbrella / rain boots) if available.
    if (cond.require.size > 0) {
      const essentials = all.filter(
        (i) =>
          i.tags.some((t) => cond.require.has(t)) &&
          !candidates.find((c) => c.id === i.id)
      );
      candidates = [...candidates, ...essentials].slice(0, 7);
    }

    pool[slot] = candidates;
  }

  return pool;
}

// ── Rule-based fallback curator ───────────────────────────────────────────
// Composes 2–3 distinct looks from the pool when Claude is unavailable. Picks
// the top item per slot for look 1, then rotates alternates for variety.

const MOODS = ['미니멀 시크', '캐주얼 데일리', '클래식 정제'];

function toResolved(item: ClothingItem | undefined): ResolvedItem | undefined {
  if (!item) return undefined;
  return {
    name: item.name,
    slot: item.slot,
    imageQuery: `${item.name} 코디`,
  };
}

function paletteForFormality(f: Formality) {
  // muted, low-saturation palettes; dressier = darker/neutral
  if (f >= 4) return { base: '#2B2A28', sub: '#9B958B', accent: '#1F3A5F' };
  if (f >= 2) return { base: '#5A6B5D', sub: '#D8D2C6', accent: '#B5704D' };
  return { base: '#6E7A8A', sub: '#E7E3DA', accent: '#C98A5E' };
}

export function composeRuleLooks(
  input: SituationInput,
  pool: CandidatePool,
  count = 2
): Look[] {
  const looks: Look[] = [];
  const formality = blendFormality(input);
  const wantOuter = input.feelsLike < 23;

  for (let i = 0; i < count; i++) {
    const items: Partial<Record<Slot, ResolvedItem>> = {};
    for (const slot of SLOTS) {
      const opts = pool[slot];
      if (!opts || opts.length === 0) continue;
      if (slot === 'outer' && !wantOuter) continue;
      // accent only ~when meaningful; rotate index per look for variety
      const idx = Math.min(i, opts.length - 1);
      const chosen = opts[idx] ?? opts[0];
      const resolved = toResolved(chosen);
      if (resolved) items[slot] = resolved;
    }

    // Skip a near-duplicate of an existing look.
    const sig = SLOTS.map((s) => items[s]?.name ?? '').join('|');
    if (looks.some((l) => SLOTS.map((s) => l.items[s]?.name ?? '').join('|') === sig)) {
      continue;
    }

    looks.push({
      id: `rule-${Date.now()}-${i}`,
      mood: MOODS[i % MOODS.length],
      items,
      palette: paletteForFormality(formality),
      reason: buildReason(input),
      tip: buildTip(input),
      source: 'rule',
    });
  }

  // ensure at least one look
  if (looks.length === 0) {
    looks.push({
      id: `rule-${Date.now()}-fallback`,
      mood: '베이직',
      items: {},
      palette: paletteForFormality(formality),
      reason: '오늘 날씨와 상황에 맞춰 기본 코디를 제안했어요.',
      tip: '레이어드로 일교차에 대비해 보세요.',
      source: 'rule',
    });
  }

  return looks;
}

function buildReason(input: SituationInput): string {
  const place = PLACE_MAP[input.place].label;
  const purpose = PURPOSE_MAP[input.purpose].label;
  const cond: string[] = [];
  if (input.conditions.rain) cond.push('비 소식');
  if (input.conditions.windy) cond.push('바람');
  if (input.conditions.humid) cond.push('높은 습도');
  if (input.conditions.uvHigh) cond.push('강한 햇빛');
  const condText = cond.length ? `${cond.join('·')}을 고려해 ` : '';
  return `체감 ${Math.round(input.feelsLike)}°C의 ${place}, ${purpose} 상황에 맞춰 ${condText}편안하면서도 격식을 맞춘 조합이에요.`;
}

function buildTip(input: SituationInput): string {
  if (input.conditions.rain) return '발이 젖지 않는 신발과 우산을 챙기면 안심이에요.';
  if (input.feelsLike < 8) return '이너 한 겹을 더하면 보온과 실루엣을 동시에 잡아요.';
  if (input.feelsLike >= 27) return '밝은 톤과 통기성 좋은 소재로 더위를 덜어보세요.';
  if (input.conditions.uvHigh) return '캡이나 선글라스로 햇빛을 가리면 한층 완성도가 높아져요.';
  return '상의를 살짝 인하면 한결 단정해 보여요.';
}
