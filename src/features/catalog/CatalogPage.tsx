import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { PLATFORMS, WEAPONS, valueOfPlatform, valueOfWeapon } from '@/data';
import { useCustomStore } from '@/store/useCustomStore';
import { CATEGORY_LABEL, DOMAIN_LABEL, DOMAIN_TYPE_LABEL, ROLE_LABEL } from '@/lib/labels';
import { cn } from '@/lib/cn';
import type { Platform, WeaponSystem } from '@/types';
import { WeaponDetail } from './WeaponDetail';
import { PlatformDetail } from './PlatformDetail';

type Mode = 'weapons' | 'platforms';

export function CatalogPage() {
  const [params, setParams] = useSearchParams();
  const customWeapons = useCustomStore((s) => s.weapons);
  const customPlatforms = useCustomStore((s) => s.platforms);

  const [mode, setMode] = useState<Mode>(params.get('weapon') ? 'weapons' : 'weapons');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<string>('all');
  const [weaponId, setWeaponId] = useState<string | null>(params.get('weapon'));
  const [platformId, setPlatformId] = useState<string | null>(null);

  const allWeapons = useMemo(() => [...WEAPONS, ...customWeapons], [customWeapons]);
  const allPlatforms = useMemo(() => [...PLATFORMS, ...customPlatforms], [customPlatforms]);
  const extraWeapons = useMemo(() => new Map(customWeapons.map((w) => [w.id, w])), [customWeapons]);
  const extraPlatforms = useMemo(() => new Map(customPlatforms.map((p) => [p.id, p])), [customPlatforms]);

  // deep link ?weapon=id
  useEffect(() => {
    const w = params.get('weapon');
    if (w) {
      setMode('weapons');
      setWeaponId(w);
    }
  }, [params]);

  const filters = useMemo(() => {
    if (mode === 'weapons') {
      const cats = [...new Set(allWeapons.map((w) => w.category))];
      return cats.map((c) => ({ key: c, label: CATEGORY_LABEL[c] }));
    }
    const doms = ['naval', 'air', 'ground'];
    return doms.map((d) => ({ key: d, label: DOMAIN_LABEL[d] }));
  }, [mode, allWeapons]);

  const weapons = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allWeapons.filter((w) => {
      if (filter !== 'all' && w.category !== filter) return false;
      if (!q) return true;
      return w.name.toLowerCase().includes(q) || (w.nameKo ?? '').includes(q) || w.id.includes(q);
    });
  }, [allWeapons, query, filter]);

  const platforms = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allPlatforms.filter((p) => {
      if (filter !== 'all' && p.domain !== filter) return false;
      if (!q) return true;
      return p.name.toLowerCase().includes(q) || (p.nameKo ?? '').includes(q) || p.id.includes(q);
    });
  }, [allPlatforms, query, filter]);

  return (
    <div>
      <PageHeader
        eyebrow="Systems Index"
        title="무기 · 플랫폼 카탈로그"
        subtitle={`무기체계 ${allWeapons.length}종 · 플랫폼 ${allPlatforms.length}종. 카테고리·도메인으로 필터하고 클릭해 상세/역참조를 확인합니다.`}
      />

      <Tabs
        items={[
          { key: 'weapons', label: '무기체계', count: allWeapons.length },
          { key: 'platforms', label: '플랫폼', count: allPlatforms.length },
        ]}
        active={mode}
        onChange={(k) => {
          setMode(k as Mode);
          setFilter('all');
        }}
      />

      <div className="my-4 flex items-center gap-2 rounded-lg border border-hud-line bg-hud-panel px-3 py-2">
        <Search size={16} className="text-hud-ink-soft" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="이름/코드 검색"
          className="w-full bg-transparent text-sm text-hud-ink outline-none placeholder:text-hud-ink-soft"
        />
      </div>

      <div className="mb-5 flex flex-wrap gap-1.5">
        <FilterChip active={filter === 'all'} onClick={() => setFilter('all')} label="전체" />
        {filters.map((f) => (
          <FilterChip key={f.key} active={filter === f.key} onClick={() => setFilter(f.key)} label={f.label} />
        ))}
      </div>

      {mode === 'weapons' ? (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {weapons.map((w) => (
            <WeaponCard key={w.id} weapon={w} value={valueOfWeapon(w.id, extraWeapons)} onClick={() => setWeaponId(w.id)} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {platforms.map((p) => (
            <PlatformCard key={p.id} platform={p} value={valueOfPlatform(p.id, extraPlatforms, extraWeapons)} onClick={() => setPlatformId(p.id)} />
          ))}
        </div>
      )}

      <WeaponDetail
        weaponId={weaponId}
        extraWeapons={extraWeapons}
        onClose={() => {
          setWeaponId(null);
          if (params.get('weapon')) setParams({}, { replace: true });
        }}
      />
      <PlatformDetail
        platformId={platformId}
        extraPlatforms={extraPlatforms}
        extraWeapons={extraWeapons}
        onClose={() => setPlatformId(null)}
      />
    </div>
  );
}

function FilterChip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full border px-3 py-1.5 font-mono text-xs transition-colors',
        active ? 'border-hud-accent-dim bg-hud-accent-dim/20 text-hud-ink' : 'border-hud-line text-hud-ink-soft hover:text-hud-ink'
      )}
    >
      {label}
    </button>
  );
}

function WeaponCard({ weapon, value, onClick }: { weapon: WeaponSystem; value: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col gap-1.5 rounded-lg border border-hud-line bg-hud-panel px-4 py-3 text-left transition-colors hover:border-hud-accent-dim hover:bg-hud-panel-2"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-[15px] font-medium text-hud-ink">{weapon.nameKo ?? weapon.name}</span>
        <span className="shrink-0 font-mono text-[10px] text-hud-ink-soft">CV {value}</span>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        <Badge tone="info">{CATEGORY_LABEL[weapon.category]}</Badge>
        {weapon.role && <Badge>{ROLE_LABEL[weapon.role] ?? weapon.role}</Badge>}
        {weapon.isCustom && <Badge tone="accent">커스텀</Badge>}
        <span className="ml-auto font-mono text-[10px] text-hud-ink-soft">{weapon.origin}</span>
      </div>
    </button>
  );
}

function PlatformCard({ platform, value, onClick }: { platform: Platform; value: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col gap-1.5 rounded-lg border border-hud-line bg-hud-panel px-4 py-3 text-left transition-colors hover:border-hud-accent-dim hover:bg-hud-panel-2"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-[15px] font-medium text-hud-ink">{platform.nameKo ?? platform.name}</span>
        <span className="shrink-0 font-mono text-[10px] text-hud-ink-soft">CV {value}</span>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        <Badge tone="info">{DOMAIN_LABEL[platform.domain]}</Badge>
        <Badge>{DOMAIN_TYPE_LABEL[platform.type] ?? platform.type}</Badge>
        {platform.isCustom && <Badge tone="accent">커스텀</Badge>}
        <span className="ml-auto font-mono text-[10px] text-hud-ink-soft">{platform.origin}</span>
      </div>
    </button>
  );
}
