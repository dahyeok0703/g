import type {
  CandidatePool,
  Look,
  ResolvedItem,
  SituationInput,
  Slot,
} from '@/lib/types';
import { SLOTS } from '@/lib/types';
import { aiResponseSchema, type AiResponse } from './schema';
import {
  SYSTEM_PROMPT,
  buildCurationPrompt,
  buildRefinePrompt,
} from './prompt';

// Talks to the `/api/ai` proxy (which holds ANTHROPIC_API_KEY). Returns a
// validated AiResponse, or throws — callers fall back to the rule engine.

async function callAi(system: string, user: string): Promise<AiResponse> {
  const res = await fetch('/api/ai', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ system, user }),
  });
  if (!res.ok) {
    throw new Error(`ai proxy ${res.status}`);
  }
  const data = await res.json();
  // The proxy returns { text } — the raw model output. Parse + validate.
  const parsed = extractJson(data.text ?? '');
  return aiResponseSchema.parse(parsed);
}

/** Tolerant JSON extraction in case the model wraps output in prose/fences. */
function extractJson(text: string): unknown {
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const start = trimmed.indexOf('{');
    const end = trimmed.lastIndexOf('}');
    if (start !== -1 && end !== -1 && end > start) {
      return JSON.parse(trimmed.slice(start, end + 1));
    }
    throw new Error('no json in model output');
  }
}

/** Map a validated AiResponse onto Look[], snapping item names to the pool. */
function mapToLooks(ai: AiResponse, pool: CandidatePool): Look[] {
  const poolNames: Record<Slot, Set<string>> = SLOTS.reduce((acc, s) => {
    acc[s] = new Set((pool[s] ?? []).map((i) => i.name));
    return acc;
  }, {} as Record<Slot, Set<string>>);

  return ai.looks.map((look, i) => {
    const items: Partial<Record<Slot, ResolvedItem>> = {};
    for (const slot of SLOTS) {
      const name = look.items[slot];
      if (!name) continue;
      // keep AI's choice even if not an exact pool match (model may rephrase)
      const inPool = poolNames[slot].has(name);
      items[slot] = {
        name,
        slot,
        imageQuery: look.imageQueries?.[slot] ?? `${name} ${look.mood} 코디`,
        image: undefined,
      };
      void inPool;
    }
    return {
      id: `ai-${Date.now()}-${i}`,
      mood: look.mood,
      items,
      palette: look.palette,
      reason: look.reason,
      tip: look.tip,
      source: 'ai' as const,
    };
  });
}

export async function curateWithAi(
  input: SituationInput,
  pool: CandidatePool
): Promise<Look[]> {
  const ai = await callAi(SYSTEM_PROMPT, buildCurationPrompt(input, pool));
  return mapToLooks(ai, pool);
}

export async function refineWithAi(
  input: SituationInput,
  pool: CandidatePool,
  prevLooks: Look[],
  userRequest: string
): Promise<Look[]> {
  const ai = await callAi(
    SYSTEM_PROMPT,
    buildRefinePrompt(input, pool, prevLooks, userRequest)
  );
  return mapToLooks(ai, pool);
}
