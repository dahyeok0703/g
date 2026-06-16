import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ScenarioVars } from '@/sim';

// Saved simulation matchups (spec §12: 저장 슬롯). Persisted to localStorage.

export interface ScenarioSlot {
  id: string;
  name: string;
  aIds: string[];
  bIds: string[];
  scenario: ScenarioVars;
  savedAt: number;
}

interface ScenarioStoreState {
  slots: ScenarioSlot[];
  save: (slot: Omit<ScenarioSlot, 'id' | 'savedAt'>) => void;
  remove: (id: string) => void;
}

export const useScenarioStore = create<ScenarioStoreState>()(
  persist(
    (set) => ({
      slots: [],
      save: (slot) =>
        set((s) => ({
          slots: [
            { ...slot, id: `slot-${Date.now()}`, savedAt: Date.now() },
            ...s.slots,
          ].slice(0, 30),
        })),
      remove: (id) => set((s) => ({ slots: s.slots.filter((x) => x.id !== id) })),
    }),
    { name: 'gmdb:scenarios:v1' }
  )
);
