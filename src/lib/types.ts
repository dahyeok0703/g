// Shared domain model (spec §7). Kept dependency-free so both the client
// and the serverless functions can import it.

export type Slot = 'outer' | 'top' | 'bottom' | 'shoes' | 'accent';

export const SLOTS: Slot[] = ['outer', 'top', 'bottom', 'shoes', 'accent'];

export type Formality = 0 | 1 | 2 | 3 | 4 | 5;

export interface ClothingItem {
  id: string;
  slot: Slot;
  name: string;
  minTemp: number;
  maxTemp: number;
  formality: Formality;
  tags: string[]; // 'rainproof' | 'active' | 'dressy' | 'breathable' | ...
  icon: string; // fallback SVG key when a photo can't be sourced
}

export interface ImageRef {
  url: string;
  source: string; // e.g. 'serpapi' | 'unsplash' | 'musinsa'
  link: string; // original page / attribution link
}

export interface ResolvedItem {
  name: string;
  slot: Slot;
  imageQuery?: string;
  image?: ImageRef | null;
}

export interface Palette {
  base: string;
  sub: string;
  accent: string;
}

export interface Look {
  id: string;
  mood: string;
  items: Partial<Record<Slot, ResolvedItem>>;
  palette: Palette;
  reason: string;
  tip: string;
  source: 'ai' | 'rule';
}

export type PlaceKey =
  | 'cafe'
  | 'restaurant'
  | 'office'
  | 'gallery'
  | 'outdoor'
  | 'club'
  | 'home';

export type PersonKey =
  | 'partner'
  | 'firstMeet'
  | 'boss'
  | 'elder'
  | 'friend';

export type PurposeKey =
  | 'work'
  | 'interview'
  | 'meeting'
  | 'date'
  | 'blindDate'
  | 'gathering'
  | 'formal'
  | 'workout'
  | 'outing'
  | 'exhibit';

export interface Conditions {
  rain: boolean;
  snow: boolean;
  windy: boolean;
  humid: boolean;
  uvHigh: boolean;
}

export interface SituationInput {
  feelsLike: number;
  conditions: Conditions;
  place: PlaceKey;
  person: PersonKey;
  purpose: PurposeKey;
}

export interface WeatherSnapshot {
  feelsLike: number;
  temp: number;
  conditions: Conditions;
  description: string; // human label e.g. '구름 조금'
  locationName: string;
  icon: string; // weather mood key
}

// candidate pool handed to Claude / rule fallback
export type CandidatePool = Record<Slot, ClothingItem[]>;
