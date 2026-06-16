import { valueOfPlatform } from '@/data';
import type { Country, InventoryEntry, Platform, WeaponSystem } from '@/types';

// ─────────────────────────────────────────────────────────────────────────
// Power index (spec §4.4, §7). Transparent, tunable weights — no magic numbers.
// Aggregates a country's order-of-battle into per-domain firepower plus
// strategic factors. Used by Compare (radar/bars) and as a fast pre-estimate
// in the simulator (Stage 10).
// ─────────────────────────────────────────────────────────────────────────

export interface PowerWeights {
  /** Status multipliers — reserves/ordered count for less than active. */
  status: { active: number; reserve: number; ordered: number; retired: number };
  /** Domain weights folded into the overall total. */
  domain: { army: number; navy: number; air: number };
  /** Strategic indicator weights for the overall total. */
  personnelPerPoint: number; // active troops per 1 index point
  budgetPerPoint: number; // USD per 1 index point
  nuclearPoint: number; // index points per warhead (capped)
  nuclearCap: number; // max warheads counted
}

export const DEFAULT_WEIGHTS: PowerWeights = {
  status: { active: 1, reserve: 0.35, ordered: 0.5, retired: 0 },
  domain: { army: 1, navy: 1.1, air: 1.15 }, // air/naval platforms project power further
  personnelPerPoint: 2000,
  budgetPerPoint: 1_000_000_000, // $1B → 1 point
  nuclearPoint: 4,
  nuclearCap: 300,
};

export interface PowerBreakdown {
  army: number;
  navy: number;
  air: number;
  strategic: number;
  personnel: number;
  budget: number;
  nuclear: number;
  /** Weighted overall index. */
  total: number;
}

type Lookups = {
  extraPlatforms?: Map<string, Platform>;
  extraWeapons?: Map<string, WeaponSystem>;
};

function branchFirepower(
  entries: InventoryEntry[],
  weights: PowerWeights,
  lk: Lookups
): number {
  return entries.reduce((sum, e) => {
    const statusMul = weights.status[e.status ?? 'active'] ?? 1;
    const cv = valueOfPlatform(e.platformId, lk.extraPlatforms, lk.extraWeapons);
    return sum + cv * e.quantity * statusMul;
  }, 0);
}

export function computePower(
  country: Country,
  weights: PowerWeights = DEFAULT_WEIGHTS,
  lk: Lookups = {}
): PowerBreakdown {
  const army = branchFirepower(country.army, weights, lk);
  const navy = branchFirepower(country.navy, weights, lk);
  const air = branchFirepower(country.airForce, weights, lk);
  const strategic = country.strategic
    ? branchFirepower(country.strategic, weights, lk)
    : 0;

  const personnel = (country.activePersonnel ?? 0) / weights.personnelPerPoint;
  const budget = (country.defenseBudget_usd ?? 0) / weights.budgetPerPoint;
  const nuclear =
    Math.min(country.nuclearWarheads ?? 0, weights.nuclearCap) * weights.nuclearPoint;

  const total =
    army * weights.domain.army +
    navy * weights.domain.navy +
    air * weights.domain.air +
    strategic +
    personnel +
    budget +
    nuclear;

  return {
    army: round(army),
    navy: round(navy),
    air: round(air),
    strategic: round(strategic),
    personnel: round(personnel),
    budget: round(budget),
    nuclear: round(nuclear),
    total: round(total),
  };
}

function round(x: number): number {
  return Math.round(x * 10) / 10;
}

/** Axes shown on the comparison radar chart. */
export const RADAR_AXES: { axis: keyof PowerBreakdown; label: string }[] = [
  { axis: 'army', label: '육군' },
  { axis: 'navy', label: '해군' },
  { axis: 'air', label: '공군' },
  { axis: 'strategic', label: '전략' },
  { axis: 'personnel', label: '병력' },
  { axis: 'budget', label: '예산' },
];
