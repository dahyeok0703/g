import { CATEGORY_LABEL, AIR_TYPE_LABEL, GROUND_TYPE_LABEL, NAVAL_TYPE_LABEL } from '@/lib/labels';
import { WEAPONS_BY_ID } from '@/data/weapons';
import { PLATFORMS_BY_ID } from '@/data/platforms';
import type {
  ArmamentMount,
  Country,
  InventoryEntry,
  Platform,
  WeaponSystem,
} from '@/types';

// ─────────────────────────────────────────────────────────────────────────
// Bulk import pipeline (spec §4.3, scaling path). Validates an externally
// prepared dataset of weapons / platforms / countries, cross-checks references
// against the seed + existing custom data + the incoming payload, and produces
// a detailed report. No data is fabricated here — invalid rows are reported and
// skipped, never invented (honors spec §3).
// ─────────────────────────────────────────────────────────────────────────

export interface BulkDataset {
  version?: string;
  weapons?: unknown[];
  platforms?: unknown[];
  countries?: unknown[];
}

export interface ValidItem<T> {
  ok: T[];
  errors: { index: number; id?: string; message: string }[];
}

export interface ImportReport {
  weapons: number;
  platforms: number;
  countries: number;
  errors: { kind: string; index: number; id?: string; message: string }[];
  /** Reference warnings (item kept, but a referenced id is unresolved). */
  warnings: string[];
  totalIn: number;
}

const VALID_CATEGORIES = new Set(Object.keys(CATEGORY_LABEL));
const VALID_DOMAIN_TYPES: Record<string, Set<string>> = {
  naval: new Set(Object.keys(NAVAL_TYPE_LABEL)),
  air: new Set(Object.keys(AIR_TYPE_LABEL)),
  ground: new Set(Object.keys(GROUND_TYPE_LABEL)),
};
const VALID_STATUS = new Set(['active', 'reserve', 'ordered', 'retired']);

function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}
function str(v: unknown): v is string {
  return typeof v === 'string' && v.length > 0;
}
function numOpt(v: unknown): v is number | undefined {
  return v === undefined || typeof v === 'number';
}

// ── weapons ────────────────────────────────────────────────────────────────
function validateWeapon(raw: unknown): { item?: WeaponSystem; error?: string } {
  if (!isObj(raw)) return { error: 'object가 아님' };
  if (!str(raw.id)) return { error: 'id 누락' };
  if (!str(raw.name)) return { error: 'name 누락' };
  if (!str(raw.category) || !VALID_CATEGORIES.has(raw.category))
    return { error: `category 불량(${String(raw.category)})` };
  if (!str(raw.origin)) return { error: 'origin 누락' };
  for (const k of ['range_km', 'speed_mach', 'warhead_kg', 'penetration_mm', 'rof_rpm', 'caliber_mm', 'introduced']) {
    if (!numOpt(raw[k])) return { error: `${k} 는 숫자여야 함` };
  }
  return { item: { ...(raw as object), isCustom: true } as WeaponSystem };
}

// ── platforms ────────────────────────────────────────────────────────────────
function validateArmament(raw: unknown): ArmamentMount[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter(isObj).map((m) => ({
    weaponSystemId: str(m.weaponSystemId) ? m.weaponSystemId : '',
    mountType: str(m.mountType) ? m.mountType : undefined,
    quantity: typeof m.quantity === 'number' ? m.quantity : 1,
    loadout: Array.isArray(m.loadout)
      ? m.loadout.filter(isObj).map((l) => ({
          weaponSystemId: String(l.weaponSystemId ?? ''),
          count: typeof l.count === 'number' ? l.count : 1,
        }))
      : undefined,
    notes: str(m.notes) ? m.notes : undefined,
  }));
}

function validatePlatform(raw: unknown): { item?: Platform; error?: string } {
  if (!isObj(raw)) return { error: 'object가 아님' };
  if (!str(raw.id)) return { error: 'id 누락' };
  if (!str(raw.name)) return { error: 'name 누락' };
  if (!str(raw.domain) || !VALID_DOMAIN_TYPES[raw.domain]) return { error: `domain 불량(${String(raw.domain)})` };
  if (!str(raw.type) || !VALID_DOMAIN_TYPES[raw.domain].has(raw.type))
    return { error: `type 불량(${String(raw.type)})` };
  if (!str(raw.origin)) return { error: 'origin 누락' };
  const armament = validateArmament(raw.armament);
  const base = { ...(raw as object), armament, isCustom: true } as Platform;
  if (base.domain === 'naval' && typeof (base as { displacement_t?: unknown }).displacement_t !== 'number') {
    (base as { displacement_t: number }).displacement_t = 0;
  }
  return { item: base };
}

// ── countries ────────────────────────────────────────────────────────────────
function validateInventory(raw: unknown): InventoryEntry[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter(isObj).map((e) => ({
    platformId: String(e.platformId ?? ''),
    quantity: typeof e.quantity === 'number' ? e.quantity : 1,
    variant: str(e.variant) ? e.variant : undefined,
    status: str(e.status) && VALID_STATUS.has(e.status) ? (e.status as InventoryEntry['status']) : undefined,
    notes: str(e.notes) ? e.notes : undefined,
  }));
}

function validateCountry(raw: unknown): { item?: Country; error?: string } {
  if (!isObj(raw)) return { error: 'object가 아님' };
  if (!str(raw.id)) return { error: 'id 누락' };
  if (!str(raw.name)) return { error: 'name 누락' };
  if (!str(raw.nameKo)) return { error: 'nameKo 누락' };
  if (!str(raw.region)) return { error: 'region 누락' };
  const tier = raw.dataTier;
  if (tier !== 1 && tier !== 2 && tier !== 3 && tier !== 4) return { error: 'dataTier 는 1~4' };
  const item: Country = {
    ...(raw as object),
    army: validateInventory(raw.army),
    navy: validateInventory(raw.navy),
    airForce: validateInventory(raw.airForce),
    strategic: raw.strategic ? validateInventory(raw.strategic) : undefined,
    hasMilitary: raw.hasMilitary !== false,
  } as Country;
  return { item };
}

/**
 * Validate + reference-check a bulk dataset. `existing` carries already-loaded
 * custom data so references across seed + custom + incoming all resolve.
 */
export function validateDataset(
  raw: BulkDataset,
  existing: { weapons: WeaponSystem[]; platforms: Platform[] }
): { weapons: WeaponSystem[]; platforms: Platform[]; countries: Country[]; report: ImportReport } {
  const report: ImportReport = { weapons: 0, platforms: 0, countries: 0, errors: [], warnings: [], totalIn: 0 };

  const weapons: WeaponSystem[] = [];
  (raw.weapons ?? []).forEach((w, i) => {
    report.totalIn++;
    const { item, error } = validateWeapon(w);
    if (error) report.errors.push({ kind: 'weapon', index: i, id: isObj(w) ? String(w.id ?? '') : '', message: error });
    else if (item) weapons.push(item);
  });

  const platforms: Platform[] = [];
  (raw.platforms ?? []).forEach((p, i) => {
    report.totalIn++;
    const { item, error } = validatePlatform(p);
    if (error) report.errors.push({ kind: 'platform', index: i, id: isObj(p) ? String(p.id ?? '') : '', message: error });
    else if (item) platforms.push(item);
  });

  const countries: Country[] = [];
  (raw.countries ?? []).forEach((c, i) => {
    report.totalIn++;
    const { item, error } = validateCountry(c);
    if (error) report.errors.push({ kind: 'country', index: i, id: isObj(c) ? String(c.id ?? '') : '', message: error });
    else if (item) countries.push(item);
  });

  // reference checks (warnings only — items are still imported)
  const weaponIds = new Set<string>([
    ...WEAPONS_BY_ID.keys(),
    ...existing.weapons.map((w) => w.id),
    ...weapons.map((w) => w.id),
  ]);
  const platformIds = new Set<string>([
    ...PLATFORMS_BY_ID.keys(),
    ...existing.platforms.map((p) => p.id),
    ...platforms.map((p) => p.id),
  ]);

  let unresolvedW = 0;
  for (const p of platforms) {
    for (const m of p.armament) {
      if (m.weaponSystemId && !weaponIds.has(m.weaponSystemId)) unresolvedW++;
      for (const l of m.loadout ?? []) if (!weaponIds.has(l.weaponSystemId)) unresolvedW++;
    }
  }
  if (unresolvedW) report.warnings.push(`플랫폼 무장 참조 ${unresolvedW}건이 카탈로그에 없음(아이콘 폴백으로 표시).`);

  let unresolvedP = 0;
  for (const c of countries) {
    for (const branch of [c.army, c.navy, c.airForce, c.strategic ?? []]) {
      for (const e of branch) if (e.platformId && !platformIds.has(e.platformId)) unresolvedP++;
    }
  }
  if (unresolvedP) report.warnings.push(`국가 편제 플랫폼 참조 ${unresolvedP}건이 카탈로그에 없음.`);

  report.weapons = weapons.length;
  report.platforms = platforms.length;
  report.countries = countries.length;
  return { weapons, platforms, countries, report };
}
