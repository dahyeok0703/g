# 오늘의 코디 · Fitday

날씨 · 장소 · 만나는 사람 · 목적(TPO)을 입력하면, **Claude가 상황에 맞춘 완성형 코디 2~3벌**을 큐레이션하고
각 아이템을 **실제 옷 사진과 함께 잡지 화보(lookbook)처럼** 보여주는 개인용 코디 추천 웹앱.

> 같은 18°C라도 면접이냐 데이트냐에 따라 결과가 다르다 — 단순 날씨앱이 아니라 **상황(TPO) 큐레이션**이 본질.

## 핵심 동작 (하이브리드)

```
규칙 엔진(결정적)  →  Claude 큐레이션(취향·맥락)  →  실제 사진 룩북  →  대화로 보정
체감온도·격식 필터     후보 안에서 완성 코디 2~3벌     ImageProvider+캐시    "더 캐주얼하게" 등
```

- **두뇌:** Claude 큐레이션 + 대화형 보정 (`src/features/ai`, `api/ai.ts`)
- **얼굴:** 실제 사진 룩북 (`src/features/images`, `api/image.ts`, `src/screens/Results.tsx`)
- **안전망:** AI/이미지 실패 시 규칙 엔진 폴백 + 아이콘 폴백으로 **항상 끊김 없이** 동작 (`src/features/engine`)

## 기술 스택

Vite · React · TypeScript · Tailwind(디자인 토큰) · Zustand · Framer Motion · zod
날씨: OpenWeatherMap(adapter 추상화) · AI: Anthropic Claude · 이미지: SerpAPI/Bing → Unsplash/Pexels 폴백

## 실행

```bash
npm install
npm run dev      # http://localhost:5173 (api 프록시 미들웨어 포함)
npm run build
npm test         # 규칙 엔진 경계 케이스
```

키가 하나도 없어도 동작합니다: 날씨는 계절 mock, 코디는 규칙 엔진, 사진은 아이콘 폴백.
키를 넣을수록 (Claude 큐레이션 → 실제 사진) 완성도가 올라갑니다.

## 환경변수 (`.env`)

키는 **서버/프록시에만** 두고 클라이언트 번들에 노출하지 않습니다. `.env.example` 참고.

| 변수 | 용도 |
|---|---|
| `ANTHROPIC_API_KEY` | Claude 큐레이션·보정 (`api/ai.ts`) |
| `AI_MODEL` | 기본 `claude-sonnet-4-6` |
| `IMAGE_SEARCH_PROVIDER` / `IMAGE_SEARCH_KEY` | 이미지 검색 (`serpapi` 또는 `bing`) |
| `UNSPLASH_KEY` / `PEXELS_KEY` | 이미지 폴백 (옵션) |
| `VITE_OPENWEATHER_KEY` | 날씨 (없으면 도시 수동선택/계절 mock 폴백) |

> 로컬은 Vite dev 미들웨어가 `api/*.ts`를 마운트하고, 배포(Vercel)는 동일 파일이 serverless 함수로 동작합니다.

## 폴더 구조

```
src/
  components/ui/   Button · Chip · Card · Swatch · Stepper · PhotoTile(blur-up·폴백) · Icon
  data/            clothing(의류 데이터셋) · context(장소/사람/목적 규칙 테이블)
  features/
    engine/        규칙 후보 풀 생성 + 규칙 폴백 큐레이터 (+ 단위테스트)
    ai/            Claude 프롬프트 · 클라이언트 · zod 스키마
    images/        ImageProvider + localStorage 캐시
    weather/       weather adapter + geolocation 훅
  screens/         Landing · Wizard · Results(룩북) · History
  store/           Zustand
  lib/             types · curation 오케스트레이션 · slotIcon
api/               ai.ts · image.ts (키 보관 serverless 프록시)
```

## 구현 단계 (Stage 0~9)

0 셋업 · 1 디자인 시스템 · 2 입력 위저드 · 3 날씨 연동 · 4 규칙 엔진(+테스트) ·
5 AI 큐레이션(+zod+폴백) · 6 이미지 소싱(+캐시) · 7 룩북 UI · 8 대화형 보정 · 9 저장/히스토리
