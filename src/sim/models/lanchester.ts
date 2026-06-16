import { LANCHESTER } from './coefficients';

// Lanchester square-law variant (ground, spec §4.6). Aimed-fire attrition:
// each side's losses scale with the *opponent's* surviving strength raised to
// an exponent, modified by firepower/armor/artillery (folded into `firepower`).

export interface LanchesterSide {
  strength: number;
  firepower: number; // combined firepower/armor/artillery multiplier
}

export interface LanchesterLosses {
  aLoss: number;
  bLoss: number;
}

export function lanchesterRound(
  a: LanchesterSide,
  b: LanchesterSide
): LanchesterLosses {
  const aLoss = LANCHESTER.k * Math.pow(b.strength, LANCHESTER.exponent / 2) * b.firepower;
  const bLoss = LANCHESTER.k * Math.pow(a.strength, LANCHESTER.exponent / 2) * a.firepower;
  return {
    aLoss: Math.min(aLoss, a.strength),
    bLoss: Math.min(bLoss, b.strength),
  };
}
