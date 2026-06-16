import { SALVO } from './coefficients';

// Hughes salvo combat model (naval, spec §4.6). Simultaneous exchange: each
// side's offensive salvo is reduced by the opponent's defenses; surviving
// "leakers" inflict attrition scaled by staying power. Operates on aggregate
// strength points rather than discrete hulls for tractability.

export interface SalvoSide {
  strength: number; // remaining naval strength
  offenseMod: number; // tech/range multipliers
  defenseMod: number; // home/EW multipliers
}

export interface SalvoLosses {
  aLoss: number;
  bLoss: number;
}

export function salvoRound(a: SalvoSide, b: SalvoSide): SalvoLosses {
  const aLoss = leakerDamage(b, a); // b attacks a
  const bLoss = leakerDamage(a, b); // a attacks b
  return {
    aLoss: clamp(aLoss, 0, a.strength),
    bLoss: clamp(bLoss, 0, b.strength),
  };
}

function leakerDamage(attacker: SalvoSide, target: SalvoSide): number {
  const incoming = attacker.strength * SALVO.alpha * attacker.offenseMod;
  const intercepted = target.strength * SALVO.beta * target.defenseMod;
  const leakers = Math.max(0, incoming - intercepted);
  return leakers / SALVO.staying;
}

function clamp(x: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, x));
}
