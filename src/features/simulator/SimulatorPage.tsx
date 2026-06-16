import { PageHeader, StagePlaceholder } from '@/components/PageHeader';

export function SimulatorPage() {
  return (
    <div>
      <PageHeader
        eyebrow="War Game"
        title="전쟁 시뮬레이션"
        subtitle="진영을 구성하고 시나리오 변수를 설정해 교전을 시뮬레이션합니다. 살보 해전·Lanchester 지상전 모델 기반의 라운드별 전투 로그와 결과 차트를 출력합니다."
      />
      <StagePlaceholder note="Stage 10에서 순수 함수 시뮬 엔진, Stage 11에서 진영 구성·실행·결과 시각화 UI가 구현됩니다." />
    </div>
  );
}
