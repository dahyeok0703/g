import { PageHeader, StagePlaceholder } from '@/components/PageHeader';

export function BrowserPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Order of Battle"
        title="국가 군사력 브라우저"
        subtitle="약 200개국의 육·해·공군 전력을 개별 무장 단위까지 열람합니다. 지역별 그리드에서 국가를 선택해 편제를 드릴다운합니다."
      />
      <StagePlaceholder note="Stage 6에서 국가 리스트·국가 페이지·육해공 탭이 구현됩니다. (데이터는 Stage 2~5에서 시드)" />
    </div>
  );
}
