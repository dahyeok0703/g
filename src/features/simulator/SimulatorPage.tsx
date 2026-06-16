import { useMemo, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Swords } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { useCustomStore } from '@/store/useCustomStore';
import { useCountries } from '@/features/compare/useCountries';
import { simulate, DEFAULT_SCENARIO, type FactionInput, type ScenarioVars } from '@/sim';
import { FactionBuilder } from './FactionBuilder';
import { ScenarioControls } from './ScenarioControls';

const COLOR_A = '#3FB68B';
const COLOR_B = '#D8553F';

export function SimulatorPage() {
  const [aIds, setAIds] = useState<string[]>(['US']);
  const [bIds, setBIds] = useState<string[]>(['CN']);
  const [scenario, setScenario] = useState<ScenarioVars>(DEFAULT_SCENARIO);
  const [ran, setRan] = useState(false);

  const allIds = useMemo(() => [...aIds, ...bIds], [aIds, bIds]);
  const { countries, loading } = useCountries(allIds);

  const customCountries = useCustomStore((s) => s.countries);
  const extraPlatforms = useCustomStore((s) => new Map(s.platforms.map((p) => [p.id, p])));
  const extraWeapons = useCustomStore((s) => new Map(s.weapons.map((w) => [w.id, w])));

  const pool = useMemo(() => [...countries, ...customCountries], [countries, customCountries]);

  const result = useMemo(() => {
    if (!ran) return null;
    const factionA: FactionInput = { id: 'A', name: '진영 A', countries: pool.filter((c) => aIds.includes(c.id)) };
    const factionB: FactionInput = { id: 'B', name: '진영 B', countries: pool.filter((c) => bIds.includes(c.id)) };
    if (factionA.countries.length === 0 || factionB.countries.length === 0) return null;
    return simulate(factionA, factionB, scenario, { extraPlatforms, extraWeapons });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ran, scenario, pool, aIds, bIds]);

  const chartData = useMemo(() => {
    if (!result) return [];
    return [
      { round: 0, A: 100, B: 100 },
      ...result.rounds.map((r) => ({
        round: r.round,
        A: Math.round((r.a.naval + r.a.air + r.a.ground) * 100),
        B: Math.round((r.b.naval + r.b.air + r.b.ground) * 100),
      })),
    ];
  }, [result]);

  const canRun = aIds.length > 0 && bIds.length > 0 && !loading;

  return (
    <div>
      <PageHeader
        eyebrow="War Game"
        title="전쟁 시뮬레이션"
        subtitle="진영을 구성하고 시나리오 변수를 조정해 교전을 시뮬레이션합니다. 살보 해전·Lanchester 지상전·공중 교환 모델로 라운드별 전력 잔존율을 계산합니다."
      />

      <div className="grid gap-3 lg:grid-cols-2">
        <FactionBuilder title="진영 A" color={COLOR_A} ids={aIds} onChange={setAIds} excludeIds={bIds} />
        <FactionBuilder title="진영 B" color={COLOR_B} ids={bIds} onChange={setBIds} excludeIds={aIds} />
      </div>

      <div className="mt-3">
        <ScenarioControls scenario={scenario} onChange={(patch) => setScenario((s) => ({ ...s, ...patch }))} />
      </div>

      <button
        onClick={() => setRan(true)}
        disabled={!canRun}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-hud-accent px-4 py-3 font-mono text-sm font-bold text-hud-bg transition-opacity hover:opacity-90 disabled:opacity-40 sm:w-auto"
      >
        <Swords size={16} /> {loading ? '전력 로딩 중…' : '시뮬레이션 실행'}
      </button>

      {result && (
        <div className="mt-8 space-y-6">
          <ResultBanner result={result} />

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="hud-panel p-4">
              <h3 className="hud-label mb-3 text-hud-accent">전력 잔존율 추이 (%)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F2D29" />
                  <XAxis dataKey="round" tick={{ fill: '#7E938C', fontSize: 12 }} label={{ value: 'Round', position: 'insideBottom', offset: -2, fill: '#7E938C', fontSize: 11 }} />
                  <YAxis domain={[0, 100]} tick={{ fill: '#7E938C', fontSize: 12 }} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Line type="monotone" dataKey="A" stroke={COLOR_A} strokeWidth={2} dot={false} name="진영 A" />
                  <Line type="monotone" dataKey="B" stroke={COLOR_B} strokeWidth={2} dot={false} name="진영 B" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <BattleLog result={result} />
          </div>
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

function ResultBanner({ result }: { result: ReturnType<typeof simulate> }) {
  const label = result.winner === 'draw' ? '교착 (DRAW)' : result.winner === 'a' ? '진영 A 승리' : '진영 B 승리';
  const tone = result.winner === 'a' ? COLOR_A : result.winner === 'b' ? COLOR_B : '#E0A23C';
  return (
    <div className="rounded-lg border p-5" style={{ borderColor: tone }}>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <span className="font-mono text-2xl font-bold" style={{ color: tone }}>{label}</span>
        <span className="font-mono text-sm text-hud-ink-soft">
          승리 margin {Math.round(result.margin * 100)}% · 사전 추정 A 승률 {Math.round(result.quickWinProbA * 100)}% · {result.rounds.length} 라운드
        </span>
      </div>
      <p className="mt-2 text-sm text-hud-ink">{result.summary}</p>
    </div>
  );
}

function BattleLog({ result }: { result: ReturnType<typeof simulate> }) {
  return (
    <div className="hud-panel flex flex-col p-4">
      <h3 className="hud-label mb-3 text-hud-accent">전투 로그 (라운드별 잔존율)</h3>
      <div className="max-h-[300px] overflow-y-auto">
        <table className="w-full font-mono text-xs">
          <thead className="sticky top-0 bg-hud-panel">
            <tr className="text-hud-ink-soft">
              <th className="px-2 py-1.5 text-left">R</th>
              <th className="px-2 py-1.5 text-right" style={{ color: COLOR_A }}>A 해/공/육</th>
              <th className="px-2 py-1.5 text-right" style={{ color: COLOR_B }}>B 해/공/육</th>
            </tr>
          </thead>
          <tbody>
            {result.rounds.map((r) => (
              <tr key={r.round} className="border-t border-hud-line/50 tabular-nums">
                <td className="px-2 py-1.5 text-hud-ink-soft">{r.round}</td>
                <td className="px-2 py-1.5 text-right text-hud-ink">{pct(r.a.naval)}/{pct(r.a.air)}/{pct(r.a.ground)}</td>
                <td className="px-2 py-1.5 text-right text-hud-ink">{pct(r.b.naval)}/{pct(r.b.air)}/{pct(r.b.ground)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const pct = (x: number) => `${Math.round(x * 100)}`;
