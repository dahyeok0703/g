// ─────────────────────────────────────────────────────────────────────────
// Domain model (spec §2). The heart of the app: weapon systems and platforms
// are normalized separately; platforms *mount* weapon systems so the same
// weapon can be shared across many platforms and per-ship loadouts stay exact.
// ─────────────────────────────────────────────────────────────────────────

export type Domain = 'naval' | 'air' | 'ground';

export type DataConfidence = 'high' | 'medium' | 'low';

// ── 2.1 Weapon systems ────────────────────────────────────────────────────

export type WeaponCategory =
  | 'missile'
  | 'gun'
  | 'torpedo'
  | 'bomb'
  | 'rocket'
  | 'radar'
  | 'sonar'
  | 'ew'
  | 'ciws'
  | 'countermeasure';

export type MissileRole =
  | 'anti-ship'
  | 'anti-air-sam'
  | 'anti-air-aam'
  | 'cruise-land-attack'
  | 'ballistic'
  | 'anti-tank'
  | 'anti-radiation'
  | 'air-to-ground';

export interface WeaponSystem {
  id: string; // 'aim-120d', 'sm-6', 'mk45-5in', 'mk41-vls'
  name: string;
  nameKo?: string;
  category: WeaponCategory;
  role?: MissileRole | string;
  origin: string; // ISO 3166 alpha-2 of producer
  introduced?: number;

  // performance — fill only the fields relevant to the category
  range_km?: number;
  speed_mach?: number;
  warhead_kg?: number;
  guidance?: string[]; // ['active-radar','inertial','datalink']
  penetration_mm?: number;
  rof_rpm?: number; // rounds per minute (guns/cannons)
  caliber_mm?: number;

  // simulation-derived metric (Stage 10). Computed if absent.
  combatValue?: number;
  isCustom?: boolean;
  dataConfidence?: DataConfidence;
}

// ── 2.2 Armament mounts (platform ↔ weapon link) ──────────────────────────

export type MountType =
  | 'VLS'
  | 'deck-launcher'
  | 'gun'
  | 'hardpoint'
  | 'torpedo-tube'
  | 'ciws'
  | 'sensor'
  | string;

export interface ArmamentMount {
  weaponSystemId: string;
  mountType?: MountType;
  quantity: number; // VLS 96 cells → 96, single gun → 1
  loadout?: { weaponSystemId: string; count: number }[]; // mixed VLS load
  notes?: string;
}

// ── 2.3 Platforms ─────────────────────────────────────────────────────────

export interface BasePlatform {
  id: string;
  name: string;
  nameKo?: string;
  origin: string;
  introduced?: number;
  armament: ArmamentMount[];
  sensors?: { radar?: string[]; sonar?: string[]; ew?: string[] };
  combatValue?: number;
  isCustom?: boolean;
  dataConfidence?: DataConfidence;
}

export type NavalType =
  | 'carrier'
  | 'helicopter-carrier'
  | 'cruiser'
  | 'destroyer'
  | 'frigate'
  | 'corvette'
  | 'submarine-ssbn'
  | 'submarine-ssn'
  | 'submarine-ssk'
  | 'amphibious'
  | 'patrol'
  | 'mine-warfare'
  | 'auxiliary';

export interface NavalPlatform extends BasePlatform {
  domain: 'naval';
  type: NavalType;
  displacement_t: number;
  length_m?: number;
  propulsion?: string;
  speed_kn?: number;
  range_nm?: number;
  crew?: number;
  aviation?: { capacity: number; types?: string[] };
}

export type AirType =
  | 'fighter'
  | 'multirole'
  | 'interceptor'
  | 'attack'
  | 'bomber'
  | 'transport'
  | 'tanker'
  | 'awacs'
  | 'recon'
  | 'maritime-patrol'
  | 'helicopter-attack'
  | 'helicopter-utility'
  | 'uav-combat'
  | 'uav-recon'
  | 'trainer';

export interface AirPlatform extends BasePlatform {
  domain: 'air';
  type: AirType;
  generation?: string; // '4.5세대','5세대'
  maxSpeed_mach?: number;
  combatRadius_km?: number;
  serviceCeiling_m?: number;
  hardpoints?: number;
  payload_kg?: number;
  compatibleWeapons?: string[];
}

export type GroundType =
  | 'mbt'
  | 'light-tank'
  | 'ifv'
  | 'apc'
  | 'recon-vehicle'
  | 'spg'
  | 'towed-artillery'
  | 'mlrs'
  | 'mortar'
  | 'sam-system'
  | 'spaag'
  | 'atgm-carrier'
  | 'ballistic-launcher'
  | 'engineering'
  | 'logistics';

export interface GroundPlatform extends BasePlatform {
  domain: 'ground';
  type: GroundType;
  weight_t?: number;
  armor?: string;
  engine_hp?: number;
  speed_kmh?: number;
  range_km?: number;
  crew?: number;
}

export type Platform = NavalPlatform | AirPlatform | GroundPlatform;

// ── 2.4 Country order of battle ───────────────────────────────────────────

export type InventoryStatus = 'active' | 'reserve' | 'ordered' | 'retired';

export interface InventoryEntry {
  platformId: string;
  quantity: number;
  variant?: string;
  status?: InventoryStatus;
  notes?: string;
}

export type DataTier = 1 | 2 | 3 | 4;

export interface Country {
  id: string; // ISO 3166 alpha-2
  name: string;
  nameKo: string;
  region: string;
  flagEmoji?: string;
  dataTier: DataTier;

  // strategic indicators
  population?: number;
  defenseBudget_usd?: number;
  activePersonnel?: number;
  reservePersonnel?: number;
  paramilitary?: number;
  nuclearWarheads?: number;
  hasMilitary: boolean;

  // order of battle
  army: InventoryEntry[];
  navy: InventoryEntry[];
  airForce: InventoryEntry[];
  strategic?: InventoryEntry[];

  dataConfidence?: DataConfidence;
  sources?: string[];
}

// ── Helper unions used across features ─────────────────────────────────────

export type Branch = 'army' | 'navy' | 'airForce' | 'strategic';

export interface Region {
  id: string;
  name: string;
  nameKo: string;
}
