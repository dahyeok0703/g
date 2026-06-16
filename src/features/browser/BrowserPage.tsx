import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShieldOff } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Badge, TierBadge } from '@/components/ui/Badge';
import { COUNTRY_DIRECTORY } from '@/data/countries/directory';
import { REGIONS } from '@/data/regions';
import { useCustomStore } from '@/store/useCustomStore';
import { cn } from '@/lib/cn';
import type { Country, CountryMeta } from '@/types';

const toMeta = (c: Country): CountryMeta => ({
  id: c.id, name: c.name, nameKo: c.nameKo, region: c.region,
  flagEmoji: c.flagEmoji, dataTier: c.dataTier, hasMilitary: c.hasMilitary,
});

export function BrowserPage() {
  const navigate = useNavigate();
  const [region, setRegion] = useState<string>('all');
  const [query, setQuery] = useState('');
  const customCountries = useCustomStore((s) => s.countries);

  // seed directory + imported/custom countries (custom wins on id collision)
  const directory = useMemo(() => {
    const map = new Map(COUNTRY_DIRECTORY.map((c) => [c.id, c]));
    for (const c of customCountries) map.set(c.id, toMeta(c));
    return [...map.values()];
  }, [customCountries]);

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const c of directory) m.set(c.region, (m.get(c.region) ?? 0) + 1);
    return m;
  }, [directory]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return directory.filter((c) => {
      if (region !== 'all' && c.region !== region) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.nameKo.includes(q) ||
        c.id.toLowerCase().includes(q)
      );
    }).sort((a, b) => a.dataTier - b.dataTier || a.nameKo.localeCompare(b.nameKo));
  }, [region, query, directory]);

  return (
    <div>
      <PageHeader
        eyebrow="Order of Battle"
        title="국가 군사력 브라우저"
        subtitle={`${directory.length}개국 · ${REGIONS.length}개 지역. 지역으로 좁히거나 검색해 국가를 선택하면 편제를 드릴다운합니다.`}
      />

      {/* search */}
      <div className="mb-5 flex items-center gap-2 rounded-lg border border-hud-line bg-hud-panel px-3 py-2">
        <Search size={16} className="text-hud-ink-soft" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="국가 검색 (한글/영문/코드)"
          className="w-full bg-transparent text-sm text-hud-ink outline-none placeholder:text-hud-ink-soft"
        />
      </div>

      {/* region filter */}
      <div className="mb-6 flex flex-wrap gap-1.5">
        <RegionChip active={region === 'all'} onClick={() => setRegion('all')} label="전체" count={directory.length} />
        {REGIONS.map((r) => (
          <RegionChip
            key={r.id}
            active={region === r.id}
            onClick={() => setRegion(r.id)}
            label={r.nameKo}
            count={counts.get(r.id) ?? 0}
          />
        ))}
      </div>

      {/* country grid */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <CountryCard key={c.id} country={c} onClick={() => navigate(`/country/${c.id}`)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-sm text-hud-ink-soft">검색 결과가 없습니다.</p>
      )}
    </div>
  );
}

function RegionChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full border px-3 py-1.5 font-mono text-xs transition-colors',
        active
          ? 'border-hud-accent-dim bg-hud-accent-dim/20 text-hud-ink'
          : 'border-hud-line text-hud-ink-soft hover:text-hud-ink'
      )}
    >
      {label}
      <span className="ml-1.5 text-hud-ink-soft">{count}</span>
    </button>
  );
}

function CountryCard({ country, onClick }: { country: CountryMeta; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-3 rounded-lg border border-hud-line bg-hud-panel px-4 py-3 text-left transition-colors hover:border-hud-accent-dim hover:bg-hud-panel-2"
    >
      <span className="text-2xl">{country.flagEmoji}</span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-medium text-hud-ink">
          {country.nameKo}
        </span>
        <span className="block truncate font-mono text-[11px] text-hud-ink-soft">
          {country.name} · {country.id}
        </span>
      </span>
      <span className="flex flex-col items-end gap-1">
        <TierBadge tier={country.dataTier} />
        {!country.hasMilitary && (
          <Badge tone="danger">
            <ShieldOff size={9} /> 군 미보유
          </Badge>
        )}
      </span>
    </button>
  );
}
