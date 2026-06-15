import { curateWithAi, refineWithAi } from '@/features/ai/client';
import { buildCandidatePool, composeRuleLooks } from '@/features/engine/engine';
import { getImage } from '@/features/images/provider';
import type { CandidatePool, Look, SituationInput, Slot } from '@/lib/types';
import { SLOTS } from '@/lib/types';

// Top-level curation orchestration (spec §6):
//   rule pool → Claude curation (fallback: rule compose) → image resolution.

const looksCache = new Map<string, Look[]>();

function hashSituation(input: SituationInput): string {
  const c = input.conditions;
  const cond = [c.rain, c.snow, c.windy, c.humid, c.uvHigh]
    .map((b) => (b ? 1 : 0))
    .join('');
  return `${input.feelsLike}|${cond}|${input.place}|${input.person}|${input.purpose}`;
}

export interface CurationResult {
  looks: Look[];
  pool: CandidatePool;
  source: 'ai' | 'rule';
}

/**
 * Produce looks for a situation. Tries Claude; on any failure composes from the
 * rule engine so the UI never dead-ends. `shuffle` bypasses the cache.
 */
export async function curate(
  input: SituationInput,
  opts: { shuffle?: boolean } = {}
): Promise<CurationResult> {
  const pool = buildCandidatePool(input);
  const key = hashSituation(input);

  if (!opts.shuffle && looksCache.has(key)) {
    const cached = looksCache.get(key)!;
    return { looks: cached, pool, source: cached[0]?.source ?? 'rule' };
  }

  let looks: Look[];
  let source: 'ai' | 'rule';
  try {
    looks = await curateWithAi(input, pool);
    source = 'ai';
  } catch {
    looks = composeRuleLooks(input, pool, opts.shuffle ? 3 : 2);
    source = 'rule';
  }

  if (!opts.shuffle) looksCache.set(key, looks);
  return { looks, pool, source };
}

/** Conversational refinement (spec §6.4). */
export async function refine(
  input: SituationInput,
  pool: CandidatePool,
  prevLooks: Look[],
  userRequest: string
): Promise<CurationResult> {
  try {
    const looks = await refineWithAi(input, pool, prevLooks, userRequest);
    return { looks, pool, source: 'ai' };
  } catch {
    // Offline fallback: re-roll a different rule composition.
    const looks = composeRuleLooks(input, pool, 3);
    return { looks, pool, source: 'rule' };
  }
}

/**
 * Resolve real photos for each item via the ImageProvider, mutating a copy of
 * the looks. Calls `onUpdate` after each image so the UI can blur-up
 * progressively rather than waiting for the whole batch.
 */
export async function resolveImages(
  looks: Look[],
  onUpdate: (looks: Look[]) => void
): Promise<Look[]> {
  // deep-ish clone so we can attach images immutably per update
  let current: Look[] = looks.map((l) => ({
    ...l,
    items: { ...l.items },
  }));

  const tasks: Promise<void>[] = [];
  current.forEach((look, li) => {
    SLOTS.forEach((slot: Slot) => {
      const item = look.items[slot];
      if (!item?.imageQuery || item.image) return;
      tasks.push(
        getImage(item.imageQuery).then((ref) => {
          current = current.map((l, idx) =>
            idx === li
              ? { ...l, items: { ...l.items, [slot]: { ...l.items[slot]!, image: ref } } }
              : l
          );
          onUpdate(current);
        })
      );
    });
  });

  await Promise.all(tasks);
  return current;
}
