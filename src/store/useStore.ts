import { create } from 'zustand';
import { curate, refine, resolveImages } from '@/lib/curation';
import type {
  CandidatePool,
  Look,
  PersonKey,
  PlaceKey,
  PurposeKey,
  SituationInput,
  WeatherSnapshot,
} from '@/lib/types';

export type Route = 'landing' | 'wizard' | 'results' | 'history';
export type Status = 'idle' | 'loading' | 'ready' | 'error';

const SAVED_KEY = 'fitday:saved:v1';

interface RefineEntry {
  request: string;
  at: number;
}

interface Draft {
  place?: PlaceKey;
  person?: PersonKey;
  purpose?: PurposeKey;
}

interface StoreState {
  route: Route;
  weather: WeatherSnapshot | null;
  weatherStatus: Status;

  draft: Draft;
  situation: SituationInput | null;

  looks: Look[];
  pool: CandidatePool | null;
  source: 'ai' | 'rule' | null;
  status: Status;
  refineBusy: boolean;
  refineHistory: RefineEntry[];

  saved: Look[];

  // navigation
  go: (route: Route) => void;

  // weather
  setWeather: (w: WeatherSnapshot) => void;
  setWeatherStatus: (s: Status) => void;

  // wizard
  setDraft: (patch: Draft) => void;
  resetDraft: () => void;

  // curation
  runCuration: () => Promise<void>;
  shuffle: () => Promise<void>;
  sendRefine: (request: string) => Promise<void>;

  // saving
  saveLook: (look: Look) => void;
  removeSaved: (id: string) => void;
  isSaved: (look: Look) => boolean;
}

function loadSaved(): Look[] {
  try {
    return JSON.parse(localStorage.getItem(SAVED_KEY) ?? '[]');
  } catch {
    return [];
  }
}

function persistSaved(looks: Look[]) {
  try {
    localStorage.setItem(SAVED_KEY, JSON.stringify(looks));
  } catch {
    /* ignore quota */
  }
}

/** Stable signature so we can detect duplicate saves regardless of generated id. */
function lookSignature(l: Look): string {
  const items = (['outer', 'top', 'bottom', 'shoes', 'accent'] as const)
    .map((s) => l.items[s]?.name ?? '')
    .join('|');
  return `${l.mood}::${items}`;
}

export const useStore = create<StoreState>((set, get) => ({
  route: 'landing',
  weather: null,
  weatherStatus: 'idle',

  draft: {},
  situation: null,

  looks: [],
  pool: null,
  source: null,
  status: 'idle',
  refineBusy: false,
  refineHistory: [],

  saved: loadSaved(),

  go: (route) => set({ route }),

  setWeather: (weather) => set({ weather, weatherStatus: 'ready' }),
  setWeatherStatus: (weatherStatus) => set({ weatherStatus }),

  setDraft: (patch) => set((s) => ({ draft: { ...s.draft, ...patch } })),
  resetDraft: () => set({ draft: {} }),

  runCuration: async () => {
    const { weather, draft } = get();
    if (!weather || !draft.place || !draft.person || !draft.purpose) return;

    const situation: SituationInput = {
      feelsLike: weather.feelsLike,
      conditions: weather.conditions,
      place: draft.place,
      person: draft.person,
      purpose: draft.purpose,
    };

    set({
      situation,
      status: 'loading',
      route: 'results',
      looks: [],
      refineHistory: [],
    });

    try {
      const { looks, pool, source } = await curate(situation);
      set({ looks, pool, source, status: 'ready' });
      // progressively attach real photos
      void resolveImages(looks, (updated) => set({ looks: updated }));
    } catch {
      set({ status: 'error' });
    }
  },

  shuffle: async () => {
    const { situation } = get();
    if (!situation) return;
    set({ status: 'loading' });
    try {
      const { looks, pool, source } = await curate(situation, { shuffle: true });
      set({ looks, pool, source, status: 'ready' });
      void resolveImages(looks, (updated) => set({ looks: updated }));
    } catch {
      set({ status: 'error' });
    }
  },

  sendRefine: async (request) => {
    const { situation, pool, looks } = get();
    if (!situation || !pool || !request.trim()) return;
    set((s) => ({
      refineBusy: true,
      refineHistory: [...s.refineHistory, { request, at: Date.now() }],
    }));
    try {
      const result = await refine(situation, pool, looks, request);
      set({ looks: result.looks, source: result.source, refineBusy: false });
      void resolveImages(result.looks, (updated) => set({ looks: updated }));
    } catch {
      set({ refineBusy: false });
    }
  },

  saveLook: (look) => {
    const { saved } = get();
    const sig = lookSignature(look);
    if (saved.some((l) => lookSignature(l) === sig)) return;
    const next = [{ ...look }, ...saved].slice(0, 60);
    persistSaved(next);
    set({ saved: next });
  },

  removeSaved: (id) => {
    const next = get().saved.filter((l) => l.id !== id);
    persistSaved(next);
    set({ saved: next });
  },

  isSaved: (look) => {
    const sig = lookSignature(look);
    return get().saved.some((l) => lookSignature(l) === sig);
  },
}));
