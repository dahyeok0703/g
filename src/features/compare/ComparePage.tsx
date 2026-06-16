import { PageHeader, StagePlaceholder } from '@/components/PageHeader';

export function ComparePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Side by Side"
        title="전력 비교"
        subtitle="2~4개국 또는 임의의 플랫폼을 나란히 비교합니다. 종합 화력지수와 영역별(해·공·육) 레이더 차트를 제공합니다."
      />
      <StagePlaceholder note="Stage 8에서 다국 비교·화력지수·레이더 차트가 구현됩니다." />
    </div>
  );
}
