import { PERSON_MAP, PLACE_MAP, PURPOSE_MAP } from '@/data/context';
import { blendFormality } from '@/features/engine/engine';
import type { CandidatePool, Look, SituationInput, Slot } from '@/lib/types';
import { SLOTS } from '@/lib/types';

// Builds the messages sent to Claude. Kept on the client so the prompt logic
// is versioned with the app; the API key never leaves the server (api/ai.ts).

const SLOT_KO: Record<Slot, string> = {
  outer: '아우터',
  top: '상의',
  bottom: '하의',
  shoes: '신발',
  accent: '포인트',
};

export const SYSTEM_PROMPT = `당신은 한국의 감각 있는 패션 스타일리스트입니다.
주어진 상황(날씨·장소·사람·목적)과 후보 의류 풀 안에서, 서로 무드가 뚜렷이 다른 완성형 코디를 2~3벌 큐레이션합니다.

규칙:
- 반드시 candidatePool 안의 아이템 이름만 사용합니다(임의 생성 금지).
- 각 코디는 outer/top/bottom/shoes/accent 슬롯을 적절히 채웁니다(더운 날 아우터는 생략 가능).
- palette는 채도 낮은 뮤트톤 hex 3개(base/sub/accent), 형광·원색 금지.
- reason은 이 상황에 어울리는 이유 2~3문장, tip은 실용적인 한 줄.
- imageQueries는 각 아이템을 실제 사진으로 검색할 한국어 쿼리(아이템명 + 색/무드 + "코디").
- 반드시 JSON만 출력합니다. 마크다운, 코드펜스, 설명 문장 절대 금지.

출력 스키마:
{"looks":[{"mood":string,"items":{"outer"?:string,"top"?:string,"bottom"?:string,"shoes"?:string,"accent"?:string},"palette":{"base":"#hex","sub":"#hex","accent":"#hex"},"reason":string,"tip":string,"imageQueries":{"outer"?:string,...}}]}`;

function describeSituation(input: SituationInput): string {
  const cond: string[] = [];
  if (input.conditions.rain) cond.push('비');
  if (input.conditions.snow) cond.push('눈');
  if (input.conditions.windy) cond.push('강풍');
  if (input.conditions.humid) cond.push('높은습도');
  if (input.conditions.uvHigh) cond.push('강한자외선');
  return [
    `체감온도: ${Math.round(input.feelsLike)}°C`,
    `날씨컨디션: ${cond.length ? cond.join(', ') : '쾌청'}`,
    `장소: ${PLACE_MAP[input.place].label}`,
    `만나는사람: ${PERSON_MAP[input.person].label}`,
    `목적: ${PURPOSE_MAP[input.purpose].label}`,
    `격식도(0~5): ${blendFormality(input)}`,
  ].join('\n');
}

function describePool(pool: CandidatePool): string {
  return SLOTS.map((slot) => {
    const names = (pool[slot] ?? []).map((i) => i.name);
    return `${SLOT_KO[slot]}(${slot}): ${names.length ? names.join(', ') : '— 없음(생략 가능)'}`;
  }).join('\n');
}

export function buildCurationPrompt(
  input: SituationInput,
  pool: CandidatePool
): string {
  return `[상황]\n${describeSituation(input)}\n\n[후보 의류 풀]\n${describePool(
    pool
  )}\n\n위 후보 안에서 무드가 다른 코디 2~3벌을 JSON으로 큐레이션하세요.`;
}

/** Refinement turn (spec §6.4): prior looks + user's natural-language nudge. */
export function buildRefinePrompt(
  input: SituationInput,
  pool: CandidatePool,
  prevLooks: Look[],
  userRequest: string
): string {
  const prev = prevLooks
    .map((l, i) => {
      const items = SLOTS.map((s) => l.items[s]?.name)
        .filter(Boolean)
        .join(', ');
      return `${i + 1}. [${l.mood}] ${items}`;
    })
    .join('\n');
  return `[상황]\n${describeSituation(input)}\n\n[후보 의류 풀]\n${describePool(
    pool
  )}\n\n[직전 코디]\n${prev}\n\n[사용자 요청]\n"${userRequest}"\n\n사용자 요청을 반영해 코디를 다시 큐레이션하세요. 후보 풀 안의 아이템만 사용하고 같은 JSON 스키마로만 출력하세요.`;
}
