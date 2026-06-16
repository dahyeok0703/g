import { PageHeader, StagePlaceholder } from '@/components/PageHeader';

export function CatalogPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Systems Index"
        title="무기 · 플랫폼 카탈로그"
        subtitle="전체 무기체계와 플랫폼을 카테고리·국가·역할로 검색합니다. 무기를 운용하는 국가, 장착한 플랫폼 역참조를 제공합니다."
      />
      <StagePlaceholder note="Stage 2~3에서 무기·플랫폼 카탈로그를 시드하고, Stage 7에서 역참조 뷰가 추가됩니다." />
    </div>
  );
}
