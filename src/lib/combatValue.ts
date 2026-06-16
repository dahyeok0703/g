import type {
  ArmamentMount,
  Platform,
  WeaponSystem,
} from '@/types';

// ─────────────────────────────────────────────────────────────────────────
// Combat-value model (spec §2.1, §2.3, §7: no magic numbers — named constants
// with rationale). Produces a single normalized "firepower value" for weapons
// and platforms, consumed by Compare (Stage 8) and the simulator (Stage 10).
//
// These are game-balance heuristics over *public, general* specs — not a
// real-world lethality model. All weights live here and are tunable.
// ─────────────────────────────────────────────────────────────────────────

/** Per-category base value — rough "how much does owning one matter". */
const CATEGORY_BASE: Record<WeaponSystem['category'], number> = {
  missile: 10,
  torpedo: 8,
  gun: 4,
  ciws: 6,
  rocket: 5,
  bomb: 4,
  radar: 5,
  sonar: 4,
  ew: 5,
  countermeasure: 2,
  launcher: 2, // the launcher itself adds little — value comes from its loadout
};

/** Role multipliers — strategic reach is weighted higher than point defense. */
const ROLE_WEIGHT: Record<string, number> = {
  ballistic: 2.4,
  'cruise-land-attack': 1.8,
  'anti-ship': 1.5,
  'anti-air-sam': 1.3,
  'anti-air-aam': 1.2,
  'anti-radiation': 1.2,
  'air-to-ground': 1.1,
  'anti-tank': 1.0,
};

// Diminishing-returns scaling: log-compress big numbers so a 2500 km missile
// isn't 25× a 100 km one. Tunable coefficients, not physical constants.
const RANGE_COEF = 3.2; // weight of log(range)
const SPEED_COEF = 2.5; // weight of mach beyond subsonic
const WARHEAD_COEF = 2.0; // weight of log(warhead kg)
const GUIDANCE_COEF = 1.4; // per guidance mode
const PEN_COEF = 0.02; // per mm of penetration
const ROF_COEF = 0.04; // per rpm (guns)
const CALIBER_COEF = 0.03; // per mm caliber (guns)

function logp(x: number | undefined): number {
  return x && x > 0 ? Math.log10(x + 1) : 0;
}

/** Compute a weapon's combat value (uses stored value if present). */
export function weaponCombatValue(w: WeaponSystem): number {
  if (typeof w.combatValue === 'number') return w.combatValue;

  let v = CATEGORY_BASE[w.category] ?? 3;

  v += logp(w.range_km) * RANGE_COEF;
  if (w.speed_mach && w.speed_mach > 1) v += (w.speed_mach - 1) * SPEED_COEF;
  v += logp(w.warhead_kg) * WARHEAD_COEF;
  v += (w.guidance?.length ?? 0) * GUIDANCE_COEF;
  if (w.penetration_mm) v += w.penetration_mm * PEN_COEF;
  if (w.rof_rpm) v += w.rof_rpm * ROF_COEF;
  if (w.caliber_mm) v += w.caliber_mm * CALIBER_COEF;

  const roleW = (w.role && ROLE_WEIGHT[w.role]) || 1;
  v *= roleW;

  return round1(v);
}

// VLS quad-pack: a single cell can hold up to 4 of certain short-range SAMs
// (e.g. ESSM). We don't double-count beyond the cell count, but loadout `count`
// already reflects rounds; this is just documentation of the modeling choice.

/**
 * Sum the combat value contributed by one armament mount, given a lookup of
 * weapon systems. Mixed VLS loadouts are valued per-round; otherwise the mount
 * value scales with quantity (cells / barrels / hardpoints).
 */
export function mountValue(
  mount: ArmamentMount,
  lookup: (id: string) => WeaponSystem | undefined
): number {
  if (mount.loadout && mount.loadout.length > 0) {
    return round1(
      mount.loadout.reduce((sum, l) => {
        const w = lookup(l.weaponSystemId);
        return sum + (w ? weaponCombatValue(w) * l.count : 0);
      }, 0)
    );
  }
  const w = lookup(mount.weaponSystemId);
  if (!w) return 0;
  // Launchers/sensors don't scale linearly with cell count for value purposes:
  // dampen large mounts so a 96-cell VLS doesn't dwarf everything.
  const qty = mount.quantity > 0 ? mount.quantity : 1;
  const damp = qty <= 1 ? 1 : 1 + Math.log10(qty);
  return round1(weaponCombatValue(w) * damp);
}

/** Hull/airframe survivability bonus by domain-specific size metric. */
function survivabilityBonus(p: Platform): number {
  if (p.domain === 'naval') return logp(p.displacement_t) * 6;
  if (p.domain === 'air') return (p.maxSpeed_mach ?? 1) * 4 + logp(p.combatRadius_km) * 3;
  return logp(p.weight_t) * 5 + logp(p.engine_hp) * 2;
}

/** Compute a platform's combat value from its mounts + survivability. */
export function platformCombatValue(
  p: Platform,
  lookup: (id: string) => WeaponSystem | undefined
): number {
  if (typeof p.combatValue === 'number') return p.combatValue;
  const arm = p.armament.reduce((sum, m) => sum + mountValue(m, lookup), 0);
  return round1(arm + survivabilityBonus(p));
}

function round1(x: number): number {
  return Math.round(x * 10) / 10;
}
