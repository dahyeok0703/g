import type { WeaponCategory } from '@/types';

// Soft validation — "reasonable range" warnings (spec §4.3). These never block
// saving; they nudge the user when a value looks implausible.

export interface FieldRange {
  min: number;
  max: number;
  label: string;
}

// Per-field plausibility bands by weapon category (only the relevant fields).
const RANGES: Partial<Record<WeaponCategory, Partial<Record<string, FieldRange>>>> = {
  missile: {
    range_km: { min: 1, max: 20000, label: '사거리' },
    speed_mach: { min: 0.3, max: 30, label: '속도(Mach)' },
    warhead_kg: { min: 0, max: 3000, label: '탄두중량' },
  },
  gun: {
    caliber_mm: { min: 5, max: 460, label: '구경' },
    rof_rpm: { min: 1, max: 12000, label: '발사속도' },
    range_km: { min: 0.1, max: 70, label: '사거리' },
  },
  torpedo: {
    range_km: { min: 1, max: 100, label: '사거리' },
    warhead_kg: { min: 10, max: 600, label: '탄두중량' },
  },
  ciws: {
    rof_rpm: { min: 100, max: 12000, label: '발사속도' },
    range_km: { min: 0.5, max: 15, label: '사거리' },
  },
};

export interface Warning {
  field: string;
  message: string;
}

export function validateWeaponFields(
  category: WeaponCategory,
  values: Record<string, number | undefined>
): Warning[] {
  const bands = RANGES[category];
  if (!bands) return [];
  const warnings: Warning[] = [];
  for (const [field, band] of Object.entries(bands)) {
    const v = values[field];
    if (v == null || !band) continue;
    if (v < band.min || v > band.max) {
      warnings.push({
        field,
        message: `${band.label} ${v} 는 일반적 범위(${band.min}~${band.max})를 벗어납니다.`,
      });
    }
  }
  return warnings;
}

/** Generic numeric range warning helper for platform specs. */
export function rangeWarn(
  value: number | undefined,
  min: number,
  max: number,
  label: string
): Warning | null {
  if (value == null) return null;
  if (value < min || value > max) {
    return { field: label, message: `${label} ${value} 는 일반적 범위(${min}~${max})를 벗어납니다.` };
  }
  return null;
}
