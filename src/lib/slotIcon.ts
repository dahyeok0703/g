import { CLOTHING } from '@/data/clothing';
import type { Slot } from '@/lib/types';

// Resolve a fallback glyph for an item: prefer the dataset's icon when the
// name matches, else a sensible per-slot default.

const SLOT_DEFAULT: Record<Slot, string> = {
  outer: 'jacket',
  top: 'tee',
  bottom: 'pants',
  shoes: 'sneaker',
  accent: 'bag',
};

const BY_NAME = new Map(CLOTHING.map((c) => [c.name, c.icon]));

export function slotIcon(slot: Slot, name?: string): string {
  if (name && BY_NAME.has(name)) return BY_NAME.get(name)!;
  return SLOT_DEFAULT[slot];
}
