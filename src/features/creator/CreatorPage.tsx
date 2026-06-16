import { PageHeader, StagePlaceholder } from '@/components/PageHeader';

export function CreatorPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Fabrication"
        title="커스텀 제작기"
        subtitle="새 무기체계와 플랫폼을 직접 설계해 카탈로그에 등록하고, 시뮬레이션에 투입합니다. 모든 커스텀 데이터는 로컬에 영속화됩니다."
      />
      <StagePlaceholder note="Stage 9에서 무기·플랫폼 생성/검증/저장과 JSON 내보내기·가져오기가 구현됩니다." />
    </div>
  );
}
