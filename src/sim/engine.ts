import { computePower } from '@/lib/powerIndex';
import { makeRng, jitter } from './rng';
import { salvoRound } from './models/salvo';
import { lanchesterRound } from './models/lanchester';
import { airRound } from './models/air';
import { COUPLING, QUICK, SCENARIO_MOD } from './models/coefficients';
import type {
  DomainStrength,
  FactionInput,
  ScenarioVars,
  SimLookups,
  SimResult,
  RoundLog,
} from './types';

// ── Faction aggregation ────────────────────────────────────────────────────

interface FactionState {
  naval: number;
  air: number;
  ground: number;
  nuclear: number;
}

function aggregate(faction: FactionInput, lk: SimLookups): FactionState {
  return faction.countries.reduce<FactionState>(
    (acc, c) => {
      const p = computePower(c, undefined, lk);
      acc.naval += p.navy;
      acc.air += p.air;
      // personnel reinforces ground mass
      acc.ground += p.army + p.personnel;
      acc.nuclear += c.nuclearWarheads ?? 0;
      return acc;
    },
    { naval: 0, air: 0, ground: 0, nuclear: 0 }
  );
}

const strengthOf = (s: FactionState): DomainStrength => ({
  naval: s.naval,
  air: s.air,
  ground: s.ground,
});

const totalStrength = (s: DomainStrength): number => s.naval + s.air + s.ground;

// ── Layer A: fast power-ratio estimate ─────────────────────────────────────

export function quickWinProbability(
  a: FactionInput,
  b: FactionInput,
  lk: SimLookups = {}
): number {
  const sa = totalStrength(strengthOf(aggregate(a, lk))) + 1;
  const sb = totalStrength(strengthOf(aggregate(b, lk))) + 1;
  const ratio = Math.log10(sa / sb); // symmetric around 0
  return 1 / (1 + Math.exp(-QUICK.steepness * ratio * 2));
}

// ── Layer B: round-based domain combat ─────────────────────────────────────

interface Mods {
  offense: number;
  defense: number;
  quality: number;
  firepower: number;
}

function sideMods(side: 'a' | 'b', sc: ScenarioVars): Mods {
  const rangeMod = SCENARIO_MOD.range[sc.engagementRange];
  const home = sc.homeAdvantage === side ? SCENARIO_MOD.homeDefense : 1;
  // techWeight > 1 favors side A; < 1 favors side B
  const tech = side === 'a' ? sc.techWeight : 1 / sc.techWeight;
  return {
    offense: rangeMod * sc.morale * tech,
    defense: home,
    quality: tech,
    firepower: sc.morale * tech * (sc.homeAdvantage === side ? 1.1 : 1),
  };
}

export function simulate(
  a: FactionInput,
  b: FactionInput,
  scenario: ScenarioVars,
  lk: SimLookups = {}
): SimResult {
  const rng = makeRng(scenario.seed);
  const stateA = aggregate(a, lk);
  const stateB = aggregate(b, lk);
  const initialA = strengthOf(stateA);
  const initialB = strengthOf(stateB);

  const cur = {
    a: { ...initialA },
    b: { ...initialB },
  };
  const modA = sideMods('a', scenario);
  const modB = sideMods('b', scenario);

  const rounds: RoundLog[] = [];
  const elimThreshold = 0.02; // 2% of initial total = effectively destroyed

  const initTotalA = totalStrength(initialA) || 1;
  const initTotalB = totalStrength(initialB) || 1;

  for (let r = 1; r <= scenario.maxRounds; r++) {
    // ── Air first — winner gains cross-domain support ──
    const air = airRound(
      { strength: cur.a.air, quality: modA.quality },
      { strength: cur.b.air, quality: modB.quality }
    );
    cur.a.air = Math.max(0, cur.a.air - air.aLoss * jitter(rng, SCENARIO_MOD.jitter));
    cur.b.air = Math.max(0, cur.b.air - air.bLoss * jitter(rng, SCENARIO_MOD.jitter));
    const airEdgeA = cur.a.air >= cur.b.air;
    const airBonusA = airEdgeA ? COUPLING.airSupportBonus : 0;
    const airBonusB = airEdgeA ? 0 : COUPLING.airSupportBonus;

    // ── Naval (salvo) — sea control feeds ground ──
    const naval = salvoRound(
      { strength: cur.a.naval, offenseMod: modA.offense * (1 + airBonusA), defenseMod: modA.defense },
      { strength: cur.b.naval, offenseMod: modB.offense * (1 + airBonusB), defenseMod: modB.defense }
    );
    cur.a.naval = Math.max(0, cur.a.naval - naval.aLoss * jitter(rng, SCENARIO_MOD.jitter));
    cur.b.naval = Math.max(0, cur.b.naval - naval.bLoss * jitter(rng, SCENARIO_MOD.jitter));
    const seaEdgeA = cur.a.naval >= cur.b.naval;

    // ── Ground (Lanchester) — air + sea control modifiers ──
    const ground = lanchesterRound(
      { strength: cur.a.ground, firepower: modA.firepower * (1 + airBonusA + (seaEdgeA ? COUPLING.seaControlBonus : 0)) },
      { strength: cur.b.ground, firepower: modB.firepower * (1 + airBonusB + (!seaEdgeA ? COUPLING.seaControlBonus : 0)) }
    );
    cur.a.ground = Math.max(0, cur.a.ground - ground.aLoss * jitter(rng, SCENARIO_MOD.jitter));
    cur.b.ground = Math.max(0, cur.b.ground - ground.bLoss * jitter(rng, SCENARIO_MOD.jitter));

    rounds.push({
      round: r,
      a: { naval: cur.a.naval / initTotalA, air: cur.a.air / initTotalA, ground: cur.a.ground / initTotalA },
      b: { naval: cur.b.naval / initTotalB, air: cur.b.air / initTotalB, ground: cur.b.ground / initTotalB },
    });

    const fracA = totalStrength(cur.a) / initTotalA;
    const fracB = totalStrength(cur.b) / initTotalB;
    if (fracA < elimThreshold || fracB < elimThreshold) break;
  }

  const remA = totalStrength(cur.a);
  const remB = totalStrength(cur.b);
  const fracA = remA / initTotalA;
  const fracB = remB / initTotalB;

  let winner: SimResult['winner'];
  const diff = fracA - fracB;
  if (Math.abs(diff) < 0.05) winner = 'draw';
  else winner = diff > 0 ? 'a' : 'b';

  const summary = buildSummary(a, b, winner, fracA, fracB, stateA, stateB, scenario);

  return {
    winner,
    margin: Math.min(1, Math.abs(diff)),
    quickWinProbA: quickWinProbability(a, b, lk),
    rounds,
    finalA: { ...cur.a },
    finalB: { ...cur.b },
    initialA,
    initialB,
    summary,
  };
}

function buildSummary(
  a: FactionInput,
  b: FactionInput,
  winner: SimResult['winner'],
  fracA: number,
  fracB: number,
  stateA: FactionState,
  stateB: FactionState,
  sc: ScenarioVars
): string {
  const pct = (x: number) => `${Math.round(x * 100)}%`;
  const head =
    winner === 'draw'
      ? '교착 — 양측 모두 결정적 우위를 확보하지 못했습니다.'
      : `${winner === 'a' ? a.name : b.name} 우세 — 전력 잔존율 ${pct(winner === 'a' ? fracA : fracB)} 대 ${pct(winner === 'a' ? fracB : fracA)}.`;

  let nuke = '';
  if (sc.nuclear && (stateA.nuclear > 0 || stateB.nuclear > 0)) {
    if (stateA.nuclear > 0 && stateB.nuclear > 0) {
      nuke = ` ⚠ 양측 핵 보유(${stateA.nuclear} vs ${stateB.nuclear}) — 상호확증파괴(MAD)로 전면전 억지가 작동, 재래식 결과는 참고치입니다.`;
    } else {
      const holder = stateA.nuclear > 0 ? a.name : b.name;
      nuke = ` ⚠ ${holder} 단독 핵 보유 — 열세 시 전략무기 사용으로 확전 위험.`;
    }
  }
  return head + nuke;
}
