import type {
  Formality,
  PersonKey,
  PlaceKey,
  PurposeKey,
} from '@/lib/types';

// Context modifiers (spec §6.2). Each option carries a base formality, a set
// of banned tags, a set of boosted tags, and Korean UI copy. The wizard reads
// `label`/`hint`; the engine reads `formality`/`ban`/`boost`.

export interface ContextOption<K extends string> {
  key: K;
  label: string;
  hint: string;
  emoji: string;
  formality: Formality;
  ban: string[]; // item tags to exclude
  boost: string[]; // item tags to prefer
}

export const PURPOSES: ContextOption<PurposeKey>[] = [
  { key: 'work', label: '출근', hint: '비즈니스 캐주얼', emoji: '💼', formality: 4, ban: ['active', 'open'], boost: ['dressy'] },
  { key: 'interview', label: '면접', hint: '단정·무채색', emoji: '📋', formality: 5, ban: ['active', 'open', 'skirt'], boost: ['dressy'] },
  { key: 'meeting', label: '미팅', hint: '깔끔한 비즈니스', emoji: '🤝', formality: 4, ban: ['active', 'open'], boost: ['dressy'] },
  { key: 'date', label: '데이트', hint: '호감형·포인트 1', emoji: '💗', formality: 3, ban: ['active'], boost: ['dressy'] },
  { key: 'blindDate', label: '소개팅', hint: '무난+호감', emoji: '🌷', formality: 3, ban: ['active'], boost: ['dressy'] },
  { key: 'gathering', label: '친구모임', hint: '편하게', emoji: '🍻', formality: 2, ban: [], boost: [] },
  { key: 'formal', label: '격식행사', hint: '드레시', emoji: '🥂', formality: 5, ban: ['active', 'open'], boost: ['dressy'] },
  { key: 'workout', label: '운동', hint: '액티브 전용', emoji: '🏃', formality: 0, ban: ['dressy', 'skirt'], boost: ['active'] },
  { key: 'outing', label: '나들이', hint: '편한 신발', emoji: '🌿', formality: 2, ban: ['dressy'], boost: ['active'] },
  { key: 'exhibit', label: '전시', hint: '미니멀', emoji: '🖼️', formality: 3, ban: ['active'], boost: ['dressy'] },
];

export const PEOPLE: ContextOption<PersonKey>[] = [
  { key: 'partner', label: '연인 / 썸', hint: '매력 허용', emoji: '💞', formality: 2, ban: [], boost: ['dressy'] },
  { key: 'firstMeet', label: '처음 만나는 사람', hint: '무난+호감', emoji: '👋', formality: 3, ban: ['active'], boost: ['dressy'] },
  { key: 'boss', label: '상사 / 거래처', hint: '보수·격식', emoji: '🧑‍💼', formality: 4, ban: ['active', 'open'], boost: ['dressy'] },
  { key: 'elder', label: '부모님 / 어른', hint: '단정', emoji: '🙇', formality: 4, ban: ['active', 'open'], boost: [] },
  { key: 'friend', label: '친구', hint: '제약 없음', emoji: '🙆', formality: 1, ban: [], boost: [] },
];

export const PLACES: ContextOption<PlaceKey>[] = [
  { key: 'cafe', label: '카페', hint: '자유', emoji: '☕', formality: 2, ban: [], boost: [] },
  { key: 'restaurant', label: '레스토랑 / 호텔', hint: '스마트 캐주얼', emoji: '🍽️', formality: 4, ban: ['active', 'open'], boost: ['dressy'] },
  { key: 'office', label: '오피스', hint: '비즈 캐주얼', emoji: '🏢', formality: 4, ban: ['active', 'open'], boost: ['dressy'] },
  { key: 'gallery', label: '갤러리', hint: '미니멀', emoji: '🏛️', formality: 3, ban: ['active'], boost: ['dressy'] },
  { key: 'outdoor', label: '야외 / 페스티벌', hint: '편한 신발', emoji: '🎡', formality: 1, ban: ['dressy', 'open'], boost: ['active'] },
  { key: 'club', label: '클럽 / 바', hint: '드레시·다크', emoji: '🍸', formality: 3, ban: ['active'], boost: ['dressy'] },
  { key: 'home', label: '가정집', hint: '단정·양말', emoji: '🏠', formality: 2, ban: ['open'], boost: [] },
];

export const PURPOSE_MAP = Object.fromEntries(
  PURPOSES.map((p) => [p.key, p])
) as Record<PurposeKey, ContextOption<PurposeKey>>;
export const PERSON_MAP = Object.fromEntries(
  PEOPLE.map((p) => [p.key, p])
) as Record<PersonKey, ContextOption<PersonKey>>;
export const PLACE_MAP = Object.fromEntries(
  PLACES.map((p) => [p.key, p])
) as Record<PlaceKey, ContextOption<PlaceKey>>;
