import { describe, expect, it } from 'vitest';
import { simulate, quickWinProbability } from './engine';
import { DEFAULT_SCENARIO, type FactionInput } from './types';
import { salvoRound } from './models/salvo';
import { lanchesterRound } from './models/lanchester';
import { airRound } from './models/air';
import type { Country } from '@/types';

function country(id: string, big: boolean): Country {
  const q = big ? 50 : 5;
  return {
    id,
    name: id,
    nameKo: id,
    region: 'test',
    dataTier: 1,
    hasMilitary: true,
    activePersonnel: big ? 1_000_000 : 100_000,
    defenseBudget_usd: big ? 800e9 : 50e9,
    nuclearWarheads: big ? 100 : 0,
    army: [{ platformId: 'm1a2', quantity: q }],
    navy: [{ platformId: 'arleigh-burke-iia', quantity: q }],
    airForce: [{ platformId: 'f35a', quantity: q }],
  };
}

const strong: FactionInput = { id: 'A', name: 'Strong', countries: [country('A', true)] };
const weak: FactionInput = { id: 'B', name: 'Weak', countries: [country('B', false)] };
const equalA: FactionInput = { id: 'A', name: 'A', countries: [country('A', false)] };
const equalB: FactionInput = { id: 'B', name: 'B', countries: [country('B', false)] };

describe('salvoRound', () => {
  it('stronger attacker inflicts more loss than it takes', () => {
    const r = salvoRound(
      { strength: 100, offenseMod: 1, defenseMod: 1 },
      { strength: 20, offenseMod: 1, defenseMod: 1 }
    );
    expect(r.bLoss).toBeGreaterThan(r.aLoss);
  });
  it('never loses more than current strength', () => {
    const r = salvoRound(
      { strength: 1, offenseMod: 1, defenseMod: 1 },
      { strength: 1000, offenseMod: 5, defenseMod: 1 }
    );
    expect(r.aLoss).toBeLessThanOrEqual(1);
  });
});

describe('lanchesterRound', () => {
  it('equal sides take equal losses', () => {
    const r = lanchesterRound({ strength: 50, firepower: 1 }, { strength: 50, firepower: 1 });
    expect(r.aLoss).toBeCloseTo(r.bLoss, 6);
  });
});

describe('airRound', () => {
  it('higher-quality side imposes worse exchange on the enemy', () => {
    const r = airRound({ strength: 50, quality: 1.5 }, { strength: 50, quality: 1 });
    expect(r.bLoss).toBeGreaterThan(r.aLoss);
  });
});

describe('quickWinProbability', () => {
  it('~0.5 for evenly matched factions', () => {
    const p = quickWinProbability(equalA, equalB);
    expect(p).toBeGreaterThan(0.45);
    expect(p).toBeLessThan(0.55);
  });
  it('> 0.5 when A is much stronger', () => {
    expect(quickWinProbability(strong, weak)).toBeGreaterThan(0.8);
  });
});

describe('simulate', () => {
  it('stronger faction wins', () => {
    const res = simulate(strong, weak, DEFAULT_SCENARIO);
    expect(res.winner).toBe('a');
    expect(res.margin).toBeGreaterThan(0);
    expect(res.rounds.length).toBeGreaterThan(0);
  });

  it('is deterministic for a fixed seed', () => {
    const r1 = simulate(strong, weak, { ...DEFAULT_SCENARIO, seed: 42 });
    const r2 = simulate(strong, weak, { ...DEFAULT_SCENARIO, seed: 42 });
    expect(r1.finalA).toEqual(r2.finalA);
    expect(r1.rounds.length).toEqual(r2.rounds.length);
  });

  it('different seeds can diverge', () => {
    const r1 = simulate(equalA, equalB, { ...DEFAULT_SCENARIO, seed: 1 });
    const r2 = simulate(equalA, equalB, { ...DEFAULT_SCENARIO, seed: 999 });
    expect(r1.rounds).not.toEqual(r2.rounds);
  });

  it('home advantage helps the defender', () => {
    const neutral = simulate(equalA, equalB, { ...DEFAULT_SCENARIO, seed: 7 });
    const homeB = simulate(equalA, equalB, { ...DEFAULT_SCENARIO, seed: 7, homeAdvantage: 'b' });
    const remBneutral = neutral.finalB.naval + neutral.finalB.air + neutral.finalB.ground;
    const remBhome = homeB.finalB.naval + homeB.finalB.air + homeB.finalB.ground;
    expect(remBhome).toBeGreaterThanOrEqual(remBneutral);
  });

  it('flags nuclear deterrence in the summary when enabled', () => {
    const res = simulate(strong, weak, { ...DEFAULT_SCENARIO, nuclear: true });
    expect(res.summary).toContain('핵');
  });
});
