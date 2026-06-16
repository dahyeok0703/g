import type { Country, Platform, WeaponSystem } from '@/types';

// Simulation domain types (spec §4.6). The engine is pure: it takes a fully
// specified scenario (no React, no async) and returns a deterministic result
// keyed by the scenario's RNG seed.

export type SimDomain = 'naval' | 'air' | 'ground';

export interface FactionInput {
  id: string;
  name: string;
  /** Member countries (full OOB already loaded) + optional custom forces. */
  countries: Country[];
}

export interface ScenarioVars {
  /** Engagement distance band — favors longer-range / higher-tech forces. */
  engagementRange: 'close' | 'medium' | 'long';
  /** Side A defends home turf (logistics/morale bonus). 0 = none. */
  homeAdvantage: 'a' | 'b' | 'none';
  /** Tech generation gap multiplier applied to the more advanced side. */
  techWeight: number; // 0.5 .. 2
  /** Supply / morale coefficient (both sides) 0.5 .. 1.5 */
  morale: number;
  /** Include strategic/nuclear deterrence handling. */
  nuclear: boolean;
  /** Deterministic RNG seed. */
  seed: number;
  /** Max combat rounds before adjudication. */
  maxRounds: number;
}

export const DEFAULT_SCENARIO: ScenarioVars = {
  engagementRange: 'medium',
  homeAdvantage: 'none',
  techWeight: 1,
  morale: 1,
  nuclear: false,
  seed: 1,
  maxRounds: 20,
};

export interface DomainStrength {
  naval: number;
  air: number;
  ground: number;
}

export interface RoundLog {
  round: number;
  /** Remaining strength fraction (0..1) per side per domain. */
  a: DomainStrength;
  b: DomainStrength;
  note?: string;
}

export interface SimResult {
  winner: 'a' | 'b' | 'draw';
  /** 0..1 confidence/margin of victory. */
  margin: number;
  /** Fast pre-estimate win probability for A (layer A). */
  quickWinProbA: number;
  rounds: RoundLog[];
  /** Final remaining strength (absolute) per side. */
  finalA: DomainStrength;
  finalB: DomainStrength;
  initialA: DomainStrength;
  initialB: DomainStrength;
  summary: string;
}

export interface SimLookups {
  extraPlatforms?: Map<string, Platform>;
  extraWeapons?: Map<string, WeaponSystem>;
}
