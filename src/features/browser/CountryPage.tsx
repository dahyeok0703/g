import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ShieldOff } from 'lucide-react';
import { Badge, ConfidenceBadge, TierBadge } from '@/components/ui/Badge';
import { Stat } from '@/components/ui/Stat';
import { Tabs } from '@/components/ui/Tabs';
import { REGION_BY_ID } from '@/data/regions';
import { koNumber, usd, intl } from '@/lib/format';
import type { Branch, Country } from '@/types';
import { useCountry } from './useCountry';
import { InventoryList } from './InventoryList';
import { PlatformDetail } from '@/features/catalog/PlatformDetail';

const BRANCH_LABEL: Record<Branch, string> = {
  army: '육군',
  navy: '해군',
  airForce: '공군',
  strategic: '전략군',
};

export function CountryPage() {
  const { id } = useParams();
  const { meta, country, loading, notFound } = useCountry(id);
  const [branch, setBranch] = useState<Branch>('army');

  if (notFound) {
    return (
      <div className="py-20 text-center">
        <p className="text-hud-ink-soft">해당 국가를 찾을 수 없습니다.</p>
        <BackLink />
      </div>
    );
  }

  return (
    <div>
      <BackLink />
      <header className="mb-7 mt-3 flex flex-wrap items-center gap-4 border-b border-hud-line pb-6">
        <span className="text-5xl">{meta?.flagEmoji}</span>
        <div className="flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <h1 className="font-mono text-2xl font-bold text-hud-ink md:text-3xl">
              {meta?.nameKo}
            </h1>
            {meta && <TierBadge tier={meta.dataTier} />}
            <ConfidenceBadge level={country?.dataConfidence} />
            {meta && !meta.hasMilitary && (
              <Badge tone="danger">
                <ShieldOff size={10} /> 정규군 미보유
              </Badge>
            )}
          </div>
          <p className="font-mono text-sm text-hud-ink-soft">
            {meta?.name} · {meta?.id} · {meta && REGION_BY_ID[meta.region]?.nameKo}
          </p>
        </div>
      </header>

      {loading ? (
        <LoadingGrid />
      ) : country ? (
        <CountryBody country={country} branch={branch} onBranch={setBranch} />
      ) : null}
    </div>
  );
}

function CountryBody({
  country,
  branch,
  onBranch,
}: {
  country: Country;
  branch: Branch;
  onBranch: (b: Branch) => void;
}) {
  const tabs = useMemo(() => {
    const list: { key: Branch; label: string; count: number }[] = [
      { key: 'army', label: BRANCH_LABEL.army, count: country.army.length },
      { key: 'navy', label: BRANCH_LABEL.navy, count: country.navy.length },
      { key: 'airForce', label: BRANCH_LABEL.airForce, count: country.airForce.length },
    ];
    if (country.strategic?.length) {
      list.push({ key: 'strategic', label: BRANCH_LABEL.strategic, count: country.strategic.length });
    }
    return list;
  }, [country]);

  const [selected, setSelected] = useState<string | null>(null);

  const entries =
    branch === 'strategic' ? country.strategic ?? [] : country[branch];

  return (
    <>
      {/* strategic indicators */}
      <div className="mb-8 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        <Stat label="병력 (현역)" value={koNumber(country.activePersonnel)} sub={`예비 ${koNumber(country.reservePersonnel)}`} />
        <Stat label="국방예산" value={usd(country.defenseBudget_usd)} tone="accent" />
        <Stat label="인구" value={koNumber(country.population)} />
        <Stat label="준군사" value={koNumber(country.paramilitary)} />
        <Stat
          label="핵탄두"
          value={country.nuclearWarheads ? intl(country.nuclearWarheads) : '—'}
          tone={country.nuclearWarheads ? 'danger' : 'ink'}
        />
        <Stat label="데이터 등급" value={`T${country.dataTier}`} />
      </div>

      {!country.hasMilitary && (
        <div className="mb-6 rounded-lg border border-hud-danger/30 bg-hud-danger/5 px-4 py-3 text-sm text-hud-ink-soft">
          이 국가는 <span className="text-hud-danger">정규군을 보유하지 않습니다.</span>{' '}
          {country.sources?.[0] && <span>({country.sources[0]})</span>} 아래는 해안경비대·경찰 등 대체 조직의 보유 장비입니다.
        </div>
      )}

      <Tabs items={tabs} active={branch} onChange={(k) => onBranch(k as Branch)} />
      <div className="mt-5">
        <InventoryList entries={entries} branchLabel={BRANCH_LABEL[branch]} onSelect={setSelected} />
      </div>

      <PlatformDetail platformId={selected} onClose={() => setSelected(null)} />


      {country.sources && country.sources.length > 0 && (
        <p className="mt-8 font-mono text-[11px] text-hud-ink-soft">
          출처: {country.sources.join(' · ')}
        </p>
      )}
    </>
  );
}

function BackLink() {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-1.5 font-mono text-xs text-hud-ink-soft transition-colors hover:text-hud-accent"
    >
      <ArrowLeft size={14} /> 국가 목록
    </Link>
  );
}

function LoadingGrid() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="hud-panel h-20 animate-pulse" />
      ))}
    </div>
  );
}
