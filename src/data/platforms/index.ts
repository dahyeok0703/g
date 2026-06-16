import type { Platform } from '@/types';
import { NAVAL } from './naval';
import { AIR } from './air';
import { GROUND } from './ground';

// Aggregated seed platform catalog. Sub-modules are domain-typed; the union is
// widened to Platform here.
export const PLATFORMS: Platform[] = [...NAVAL, ...AIR, ...GROUND];

export const PLATFORMS_BY_ID: Map<string, Platform> = new Map(
  PLATFORMS.map((p) => [p.id, p])
);
