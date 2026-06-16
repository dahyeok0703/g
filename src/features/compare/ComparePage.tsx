import { useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Plus, X } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Badge } from '@/components/ui/Badge';
import { COUNTRY_DIRECTORY } from '@/data/countries/directory';
import { useCustomStore } from '@/store/useCustomStore';
import { computePower, RADAR_AXES, type PowerBreakdown } from '@/lib/powerIndex';
import { intl } from '@/lib/format';
import { useCountries } from './useCountries';

// Neutral comparison palette (spec §5: no enforced national colors).
const SERIES_COLORS = ['#3FB68B', '#4C8FB5', '#E0A23C', '#B07BC4'];
const MAX_SLOTS = 4;

export function ComparePage() {
  const [ids, setIds] = useState<string[]>(['US', 'CN']);
  const [picking, setPicking] = useState(false);
  const { countries, loading } = useCountries(ids);

  const extraPlatforms = useCustomStore((s) => new Map(s.platforms.map((p) => [p.id, p])));
  const extraWeapons = useCustomStore((s) => new Map(s.weapons.map((w) => [w.id, w])));

  const powers = useMemo(
    () => countries.map((c) => ({ country: c, power: computePower(c, undefined, { extraPlatforms, extraWeapons }) })),
    [countries, extraPlatforms, extraWeapons]
  );

  // radar: normalize each axis to the max across selected countries → 0..100
  const radarData = useMemo(() => {
    return RADAR_AXES.map(({ axis, label }) => {
      const row: Record<string, number | string> = { axis: label };
      const max = Math.max(1, ...powers.map((p) => p.power[axis] as number));
      powers.forEach((p) => {
        row[p.country.id] = Math.round(((p.power[axis] as number) / max) * 100);
      });
      return row;
    });
  }, [powers]);

  const barData = useMemo(
    () => powers.map((p) => ({ name: p.country.id, 화력지수: p.power.total })),
    [powers]
  );

  const directory = useMemo(
    () => COUNTRY_DIRECTORY.filter((c) => !ids.includes(c.id) && c.hasMilitary),
    [ids]
  );

  return (
    <div>
      <PageHeader
        eyebrow="Side by Side"
        title="전력 비교"
        subtitle="2~4개국을 선택해 종합 화력지수와 영역별 레이더 차트로 비교합니다. 산출식은 /lib/powerIndex.ts에 투명하게 공개되어 있습니다."
      />

      {/* selected countries + add */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {ids.map((id, i) => {
          const meta = COUNTRY_DIRECTORY.find((c) => c.id === id);
          return (
            <span
              key={id}
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm"
              style={{ borderColor: SERIES_COLORS[i], color: '#D7E4DF' }}
            >
              <span>{meta?.flagEmoji}</span>
              {meta?.nameKo ?? id}
              <button onClick={() => setIds(ids.filter((x) => x !== id))} aria-label="제거">
                <X size={13} className="text-hud-ink-soft hover:text-hud-danger" />
              </button>
            </span>
          );
        })}
        {ids.length < MAX_SLOTS && (
          <div className="relative">
            <button
              onClick={() => setPicking((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-hud-line px-3 py-1.5 font-mono text-xs text-hud-ink-soft hover:border-hud-accent-dim hover:text-hud-ink"
            >
              <Plus size={13} /> 국가 추가
            </button>
            {picking && (
              <div className="absolute z-20 mt-2 max-h-72 w-64 overflow-y-auto rounded-lg border border-hud-line bg-hud-panel p-1 shadow-hud">
                {directory.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setIds([...ids, c.id]);
                      setPicking(false);
                    }}
                    className="flex w-full items-center gap-2 rounded px-2.5 py-2 text-left text-sm text-hud-ink hover:bg-hud-panel-2"
                  >
                    <span>{c.flagEmoji}</span>
                    <span className="flex-1 truncate">{c.nameKo}</span>
                    <Badge>T{c.dataTier}</Badge>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {loading && powers.length === 0 ? (
        <div className="hud-panel h-80 animate-pulse" />
      ) : powers.length === 0 ? (
        <p className="py-16 text-center text-sm text-hud-ink-soft">비교할 국가를 추가하세요.</p>
      ) : (
        <div className="space-y-6">
          {/* charts */}
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="hud-panel p-4">
              <h3 className="hud-label mb-3 text-hud-accent">영역별 전력 (정규화 0–100)</h3>
              <ResponsiveContainer width="100%" height={320}>
                <RadarChart data={radarData} outerRadius="72%">
                  <PolarGrid stroke="#1F2D29" />
                  <PolarAngleAxis dataKey="axis" tick={{ fill: '#7E938C', fontSize: 12 }} />
                  {powers.map((p, i) => (
                    <Radar
                      key={p.country.id}
                      name={p.country.nameKo}
                      dataKey={p.country.id}
                      stroke={SERIES_COLORS[i]}
                      fill={SERIES_COLORS[i]}
                      fillOpacity={0.18}
                    />
                  ))}
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="hud-panel p-4">
              <h3 className="hud-label mb-3 text-hud-accent">종합 화력지수</h3>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F2D29" />
                  <XAxis dataKey="name" tick={{ fill: '#7E938C', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#7E938C', fontSize: 12 }} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(63,182,139,0.06)' }} />
                  <Bar dataKey="화력지수" radius={[4, 4, 0, 0]}>
                    {barData.map((_, i) => (
                      <Cell key={i} fill={SERIES_COLORS[i]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* table */}
          <CompareTable powers={powers} />
        </div>
      )}
    </div>
  );
}

const TOOLTIP_STYLE = {
  background: '#101614',
  border: '1px solid #1F2D29',
  borderRadius: 8,
  color: '#D7E4DF',
  fontSize: 12,
};

const ROWS: { key: keyof PowerBreakdown; label: string }[] = [
  { key: 'total', label: '종합 화력지수' },
  { key: 'army', label: '육군' },
  { key: 'navy', label: '해군' },
  { key: 'air', label: '공군' },
  { key: 'strategic', label: '전략군' },
  { key: 'nuclear', label: '핵 전력' },
  { key: 'personnel', label: '병력 지수' },
  { key: 'budget', label: '예산 지수' },
];

function CompareTable({
  powers,
}: {
  powers: { country: { id: string; nameKo: string; flagEmoji?: string }; power: PowerBreakdown }[];
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-hud-line">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-hud-line bg-hud-panel-2/40">
            <th className="px-4 py-2.5 text-left font-mono text-xs text-hud-ink-soft">지표</th>
            {powers.map((p) => (
              <th key={p.country.id} className="px-4 py-2.5 text-right font-mono text-xs text-hud-ink">
                {p.country.flagEmoji} {p.country.nameKo}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => {
            const max = Math.max(...powers.map((p) => p.power[row.key] as number));
            return (
              <tr key={row.key} className="border-b border-hud-line/60 last:border-0">
                <td className="px-4 py-2 text-hud-ink-soft">{row.label}</td>
                {powers.map((p) => {
                  const v = p.power[row.key] as number;
                  const isMax = v === max && v > 0;
                  return (
                    <td
                      key={p.country.id}
                      className={`px-4 py-2 text-right font-mono tabular-nums ${isMax ? 'text-hud-accent' : 'text-hud-ink'} ${row.key === 'total' ? 'font-bold' : ''}`}
                    >
                      {intl(v)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
