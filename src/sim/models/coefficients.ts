// All tunable model coefficients in one place (spec §4.6, §7: named constants
// with rationale). The simulator UI (Stage 11) exposes a subset as sliders.

// ── Salvo (naval) — Hughes salvo combat model ──────────────────────────────
// ΔTarget = max(0, attackerFirepower·α − defenderDefense·β) / stayingPower
export const SALVO = {
  /** Fraction of a side's strength delivered as offensive salvo per round. */
  alpha: 0.45,
  /** Defensive interception efficiency (SAM/CIWS/EW abstracted). */
  beta: 0.35,
  /** Staying power: how much incoming "leaker" damage one strength-point absorbs. */
  staying: 1.6,
};

// ── Lanchester (ground) — square-law variant ───────────────────────────────
// dA = -k·B·firepowerMod ; dB = -k·A·firepowerMod
export const LANCHESTER = {
  /** Base attrition coefficient per round. */
  k: 0.06,
  /** Square-law exponent (2 = classic aimed-fire square law). */
  exponent: 1.85,
};

// ── Air exchange ───────────────────────────────────────────────────────────
// Beyond-visual-range advantage scales the exchange ratio.
export const AIR = {
  /** Base loss fraction per round for the weaker side. */
  base: 0.18,
  /** How strongly a strength ratio tilts the exchange. */
  ratioPower: 1.3,
};

// ── Cross-domain coupling ──────────────────────────────────────────────────
export const COUPLING = {
  /** Air superiority winner grants this bonus to its naval+ground each round. */
  airSupportBonus: 0.12,
  /** Naval dominance (sea control) bonus to ground for amphibious reach. */
  seaControlBonus: 0.06,
};

// ── Scenario modifiers ─────────────────────────────────────────────────────
export const SCENARIO_MOD = {
  /** Range band → multiplier on offensive reach (long range favors tech). */
  range: { close: 0.9, medium: 1.0, long: 1.15 },
  /** Home advantage defensive multiplier. */
  homeDefense: 1.18,
  /** RNG jitter amplitude (±) applied to per-round losses. */
  jitter: 0.12,
};

// ── Quick estimate (layer A) ───────────────────────────────────────────────
export const QUICK = {
  /** Logistic steepness mapping power ratio → win probability. */
  steepness: 1.4,
};
