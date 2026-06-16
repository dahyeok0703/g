import { AIR } from './coefficients';

// Air combat exchange (spec §4.6). The stronger side (fleet size × generation ×
// radar/AAM quality, abstracted into `strength`) imposes a worse exchange ratio
// on the weaker side, reflecting BVR (beyond-visual-range) advantage.

export interface AirSide {
  strength: number;
  quality: number; // generation/radar/AAM multiplier
}

export interface AirLosses {
  aLoss: number;
  bLoss: number;
}

export function airRound(a: AirSide, b: AirSide): AirLosses {
  const effA = a.strength * a.quality;
  const effB = b.strength * b.quality;
  const total = effA + effB || 1;

  // Weaker effective force loses a larger fraction (ratioPower amplifies the gap).
  const bShare = Math.pow(effA / total, AIR.ratioPower);
  const aShare = Math.pow(effB / total, AIR.ratioPower);

  return {
    aLoss: Math.min(a.strength * AIR.base * aShare * 2, a.strength),
    bLoss: Math.min(b.strength * AIR.base * bShare * 2, b.strength),
  };
}
