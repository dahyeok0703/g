import { describe, expect, it } from 'vitest';
import {
  blendFormality,
  buildCandidatePool,
  composeRuleLooks,
} from './engine';
import type { Conditions, SituationInput } from '@/lib/types';

const clear: Conditions = {
  rain: false,
  snow: false,
  windy: false,
  humid: false,
  uvHigh: false,
};

function sit(partial: Partial<SituationInput>): SituationInput {
  return {
    feelsLike: 18,
    conditions: clear,
    place: 'cafe',
    person: 'friend',
    purpose: 'gathering',
    ...partial,
  };
}

describe('blendFormality', () => {
  it('leans to the strictest input (interview = high)', () => {
    const f = blendFormality(sit({ purpose: 'interview', person: 'boss' }));
    expect(f).toBeGreaterThanOrEqual(4);
  });

  it('stays casual for friends + gathering', () => {
    const f = blendFormality(sit({ purpose: 'gathering', person: 'friend', place: 'cafe' }));
    expect(f).toBeLessThanOrEqual(2);
  });
});

describe('buildCandidatePool — temperature bands', () => {
  it('hot weather (30°) allows an empty outer pool', () => {
    const pool = buildCandidatePool(sit({ feelsLike: 30 }));
    expect(pool.outer.length).toBe(0);
    expect(pool.top.length).toBeGreaterThan(0);
  });

  it('cold weather (0°) surfaces warm outers', () => {
    const pool = buildCandidatePool(sit({ feelsLike: 0 }));
    expect(pool.outer.length).toBeGreaterThan(0);
    expect(pool.outer.some((i) => i.tags.includes('warm'))).toBe(true);
  });
});

describe('condition overlays', () => {
  it('rain excludes open-toe shoes and surfaces an umbrella', () => {
    const pool = buildCandidatePool(
      sit({ feelsLike: 24, conditions: { ...clear, rain: true } })
    );
    expect(pool.shoes.some((s) => s.tags.includes('open'))).toBe(false);
    const accentRainproof = pool.accent.some((a) => a.tags.includes('rainproof'));
    expect(accentRainproof).toBe(true);
  });
});

describe('formality filtering', () => {
  it('interview excludes active/sporty items', () => {
    const pool = buildCandidatePool(
      sit({ feelsLike: 18, purpose: 'interview', person: 'boss', place: 'office' })
    );
    const allActive = [
      ...pool.top,
      ...pool.bottom,
      ...pool.shoes,
    ].some((i) => i.tags.includes('active'));
    expect(allActive).toBe(false);
  });
});

describe('composeRuleLooks fallback', () => {
  it('always returns at least one look with items', () => {
    const input = sit({ feelsLike: 15, purpose: 'date', person: 'partner' });
    const pool = buildCandidatePool(input);
    const looks = composeRuleLooks(input, pool, 2);
    expect(looks.length).toBeGreaterThanOrEqual(1);
    expect(Object.keys(looks[0].items).length).toBeGreaterThan(0);
    expect(looks[0].source).toBe('rule');
  });

  it('same temp, different purpose → different formality drives different pools', () => {
    const date = sit({ feelsLike: 18, purpose: 'date', person: 'partner', place: 'cafe' });
    const interview = sit({ feelsLike: 18, purpose: 'interview', person: 'boss', place: 'office' });
    const dateNames = buildCandidatePool(date).bottom.map((i) => i.name).join();
    const interviewNames = buildCandidatePool(interview).bottom.map((i) => i.name).join();
    expect(dateNames).not.toEqual(interviewNames);
  });
});
