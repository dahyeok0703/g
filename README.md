# GMDB · 글로벌 군사력 데이터베이스 + 무기 제작 + 전쟁 시뮬레이터

전 세계 국가의 육·해·공군 전력을 **개별 무장 단위까지** 열람하고, 직접 무기·플랫폼을
설계해 카탈로그에 등록하며, 그 전력으로 **전쟁을 시뮬레이션**하는 백과사전형 웹앱.

> 구축함을 클릭하면 "Mk41 VLS 96셀(SM-2/SM-6/ESSM/Tomahawk 혼재), Mk45 5인치 함포,
> Phalanx CIWS, 하푼 8발, Mk46 어뢰관" 수준까지 펼쳐 보여줍니다.

공개된 일반 제원(공개적으로 알려진 함급·기종·수량·탑재 무장명)만 다루는 **백과사전+게임**
성격의 도구입니다. 수치는 대략값이며 사용자가 수정·보강할 수 있습니다.

## 실행

```bash
npm install
npm run dev       # http://localhost:5173
npm run build
npm test          # 모델·엔진·데이터 정합성 테스트 (15)
```

## 핵심 기능

| 화면 | 설명 |
|---|---|
| **국가 전력** (`/`) | 76개국 8개 지역 · 검색/필터 → 국가 페이지(전략지표 + 육/해/공/전략군 탭) → **플랫폼 드릴다운으로 armament 완전 전개** |
| **카탈로그** (`/catalog`) | 무기체계 77종 · 플랫폼 70여종 필터/검색 + **역참조**(이 무기를 장착한 플랫폼) |
| **제작기** (`/creator`) | 무기·플랫폼 생성(검증·CV 미리보기) → 카탈로그 등록, JSON 내보내기/가져오기 |
| **비교** (`/compare`) | 2~4개국 화력지수 + 영역별 레이더 차트 + 지표 테이블 |
| **시뮬레이션** (`/simulator`) | 진영 구성 + 시나리오 변수 → 살보/Lanchester/공중 모델로 라운드별 전투, 결과 시각화, 시나리오 저장 슬롯 |

## 데이터 모델 (정규화)

무기체계와 플랫폼을 **분리**하고, 플랫폼이 무기를 **장착(mount)**합니다. 동일 무기를 여러
플랫폼이 공유하고, VLS 혼재 적재 같은 정밀한 표현이 가능합니다.

```
WeaponSystem ──mount──▶ Platform ──inventory──▶ Country
 (미사일/함포/어뢰/    (함정/항공기/지상장비,    (육·해·공·전략군 편제,
  CIWS/레이더…)         armament: ArmamentMount[]) InventoryEntry[])
```

데이터 등급제(Tier 1~4)로 강대국은 무장 단위까지, 소국·**군 미보유국**(`hasMilitary:false`)은
병력·예산 수준만 채웁니다. 각 데이터에 `dataConfidence`·`sources`를 표기합니다.

## 시뮬레이션 엔진 (`/sim`, 순수 함수)

UI와 분리된 결정적(시드 기반) 엔진. 2계층:
- **(A) 빠른 추정** — 전력비 → 로지스틱 승률.
- **(B) 라운드 교전** — 해전: Hughes 살보 모델 / 지상: Lanchester 제곱법칙 변형 / 공중: 교환비 모델.
  영역 커플링(제공권·제해권 보너스), 시나리오 변수(거리/홈어드밴티지/기술/사기/난수 시드),
  핵 보유 시 억지(MAD) 처리. 모든 계수는 `sim/models/coefficients.ts`에 근거 주석과 함께 모음.

## 아키텍처

```
src/
  types/        도메인 타입 (무기/장착/플랫폼/국가)
  data/
    weapons/    무기 카탈로그 (미사일/함포/방어/센서/발사기)
    platforms/  플랫폼 카탈로그 (naval/air/ground)
    countries/  국가 편제 — region별 파일 + 동적 import 지연 로딩 + 경량 directory
  store/        zustand (커스텀 아이템·시나리오 슬롯, persist)
  sim/          전쟁 시뮬 엔진 (순수 함수) + models/ + 테스트
  features/     browser · catalog · creator · compare · simulator
  components/   공용 UI (Modal/Badge/Stat/Tabs/Field …)
  lib/          combatValue · powerIndex · format · labels · validation
```

### 성능
- **지역별 코드 스플리팅**: 각 region 편제가 별도 청크로 지연 로딩.
- **라우트 단위 lazy**: 차트(Recharts)를 쓰는 비교/시뮬은 방문 시에만 로드 → 초기 번들 최소화.
- 커스텀 데이터·시나리오는 `localStorage` 영속화.

## 산출 지표(투명 공개)
- **CV(전투가치)** — 무기/플랫폼 단위 화력가치: `lib/combatValue.ts`
- **화력지수** — 국가 단위 종합 전력(영역+전략+병력+예산+핵, 조정 가능 가중치): `lib/powerIndex.ts`

## 면책
모든 데이터는 공개 출처(GlobalFirepower, IISS Military Balance류, 위키피디아, 제조사 공개제원)
기반의 대략값이며 추정치를 포함합니다. 교육·열람·게임 용도로만 사용하세요.
