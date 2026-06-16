import { useRef, useState } from 'react';
import { AlertTriangle, CheckCircle2, Database, FileDown, Upload } from 'lucide-react';
import { useCustomStore } from '@/store/useCustomStore';
import { validateDataset, type ImportReport, type BulkDataset } from '@/lib/dataset';
import { csvToWeapons } from '@/lib/csv';

// Bulk import pipeline UI (spec §4.3, scaling path). Accepts a JSON dataset
// ({weapons,platforms,countries}) or a flat weapons CSV, validates + reference-
// checks it, merges into the custom store, and shows a detailed report.
export function BulkImport() {
  const weapons = useCustomStore((s) => s.weapons);
  const platforms = useCustomStore((s) => s.platforms);
  const mergeMany = useCustomStore((s) => s.mergeMany);
  const jsonRef = useRef<HTMLInputElement>(null);
  const csvRef = useRef<HTMLInputElement>(null);
  const [report, setReport] = useState<ImportReport | null>(null);
  const [busy, setBusy] = useState(false);

  const runImport = (dataset: BulkDataset) => {
    setBusy(true);
    try {
      const result = validateDataset(dataset, { weapons, platforms });
      mergeMany({ weapons: result.weapons, platforms: result.platforms, countries: result.countries });
      setReport(result.report);
    } catch (e) {
      setReport({ weapons: 0, platforms: 0, countries: 0, totalIn: 0, warnings: [], errors: [{ kind: 'parse', index: -1, message: String(e) }] });
    } finally {
      setBusy(false);
    }
  };

  const onJsonFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        runImport(JSON.parse(String(reader.result)) as BulkDataset);
      } catch {
        setReport({ weapons: 0, platforms: 0, countries: 0, totalIn: 0, warnings: [], errors: [{ kind: 'parse', index: -1, message: 'JSON 파싱 실패' }] });
      }
    };
    reader.readAsText(file);
  };

  const onCsvFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => runImport({ weapons: csvToWeapons(String(reader.result)) });
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      <div className="hud-panel p-5">
        <div className="mb-3 flex items-center gap-2">
          <Database size={18} className="text-hud-accent" />
          <h3 className="font-mono text-sm font-bold text-hud-ink">대량 데이터 가져오기</h3>
        </div>
        <p className="mb-4 text-sm text-hud-ink-soft">
          외부에서 준비한 대형 데이터셋을 한 번에 적재합니다. 모든 항목은 검증·참조 확인을 거쳐
          커스텀 카탈로그에 병합되며, 불량 행은 <span className="text-hud-warn">건너뛰고 리포트</span>로 보고합니다
          (없는 값을 지어내지 않습니다).
        </p>

        <div className="flex flex-wrap gap-2">
          <input ref={jsonRef} type="file" accept="application/json" className="hidden" onChange={(e) => e.target.files?.[0] && onJsonFile(e.target.files[0])} />
          <input ref={csvRef} type="file" accept=".csv,text/csv" className="hidden" onChange={(e) => e.target.files?.[0] && onCsvFile(e.target.files[0])} />
          <button onClick={() => jsonRef.current?.click()} disabled={busy} className="flex items-center gap-1.5 rounded-md bg-hud-accent px-3.5 py-2 font-mono text-xs font-semibold text-hud-bg hover:opacity-90 disabled:opacity-40">
            <Upload size={14} /> JSON 데이터셋
          </button>
          <button onClick={() => csvRef.current?.click()} disabled={busy} className="flex items-center gap-1.5 rounded-md border border-hud-line px-3.5 py-2 font-mono text-xs text-hud-ink-soft hover:border-hud-accent-dim hover:text-hud-ink disabled:opacity-40">
            <Upload size={14} /> 무기 CSV
          </button>
          <button onClick={downloadJsonTemplate} className="flex items-center gap-1.5 rounded-md border border-hud-line px-3.5 py-2 font-mono text-xs text-hud-ink-soft hover:border-hud-accent-dim hover:text-hud-ink">
            <FileDown size={14} /> JSON 템플릿
          </button>
          <button onClick={downloadCsvTemplate} className="flex items-center gap-1.5 rounded-md border border-hud-line px-3.5 py-2 font-mono text-xs text-hud-ink-soft hover:border-hud-accent-dim hover:text-hud-ink">
            <FileDown size={14} /> CSV 템플릿
          </button>
        </div>
      </div>

      {report && <ReportView report={report} />}

      <FormatGuide />
    </div>
  );
}

function ReportView({ report }: { report: ImportReport }) {
  const ok = report.errors.length === 0;
  return (
    <div className={`rounded-lg border p-4 ${ok ? 'border-hud-accent-dim/40 bg-hud-accent-dim/5' : 'border-hud-warn/30 bg-hud-warn/5'}`}>
      <div className="mb-2 flex items-center gap-2">
        {ok ? <CheckCircle2 size={16} className="text-hud-accent" /> : <AlertTriangle size={16} className="text-hud-warn" />}
        <span className="font-mono text-sm text-hud-ink">
          가져오기 완료 — 무기 {report.weapons} · 플랫폼 {report.platforms} · 국가 {report.countries}
          <span className="text-hud-ink-soft"> / 입력 {report.totalIn}</span>
        </span>
      </div>
      {report.warnings.map((w, i) => (
        <p key={i} className="ml-6 text-xs text-hud-warn">※ {w}</p>
      ))}
      {report.errors.length > 0 && (
        <details className="ml-6 mt-1">
          <summary className="cursor-pointer font-mono text-xs text-hud-danger">건너뛴 행 {report.errors.length}건</summary>
          <ul className="mt-1 max-h-40 overflow-y-auto font-mono text-[11px] text-hud-ink-soft">
            {report.errors.slice(0, 200).map((e, i) => (
              <li key={i}>[{e.kind} #{e.index}{e.id ? ` ${e.id}` : ''}] {e.message}</li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}

function FormatGuide() {
  return (
    <div className="hud-panel p-5">
      <h4 className="hud-label mb-2 text-hud-accent">데이터 포맷</h4>
      <pre className="overflow-x-auto rounded-md bg-hud-bg p-3 font-mono text-[11px] leading-relaxed text-hud-ink-soft">{`{
  "weapons": [
    { "id":"my-aam-1", "name":"AAM-X", "category":"missile",
      "role":"anti-air-aam", "origin":"KR", "range_km":120,
      "speed_mach":4, "warhead_kg":20, "guidance":["active-radar"] }
  ],
  "platforms": [
    { "id":"my-ddg", "name":"My DDG", "domain":"naval",
      "type":"destroyer", "origin":"KR", "displacement_t":8000,
      "armament":[{ "mountType":"VLS", "weaponSystemId":"mk41-vls",
        "quantity":48, "loadout":[{"weaponSystemId":"sm-2","count":48}] }] }
  ],
  "countries": [
    { "id":"ZZ", "name":"Zedland", "nameKo":"제드랜드",
      "region":"europe", "dataTier":3, "hasMilitary":true,
      "army":[{ "platformId":"my-ddg", "quantity":4 }],
      "navy":[], "airForce":[] }
  ]
}`}</pre>
      <p className="mt-3 text-xs text-hud-ink-soft">
        · 카테고리/도메인/타입은 카탈로그 enum과 일치해야 하며, 불일치 행은 건너뜁니다.<br />
        · 무장/편제가 참조하는 id는 시드+커스텀+이번 페이로드 안에서 해소되면 OK(미해소는 경고).<br />
        · 대형 CSV → JSON 변환은 <code className="text-hud-ink">node scripts/csv-to-dataset.mjs</code> 사용.
      </p>
    </div>
  );
}

function download(name: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

function downloadJsonTemplate() {
  download(
    'gmdb-dataset-template.json',
    JSON.stringify(
      {
        version: '1',
        weapons: [{ id: 'example-aam', name: 'Example AAM', nameKo: '예시 공대공', category: 'missile', role: 'anti-air-aam', origin: 'XX', range_km: 100, speed_mach: 4, warhead_kg: 20, guidance: ['active-radar'] }],
        platforms: [{ id: 'example-jet', name: 'Example Jet', nameKo: '예시 전투기', domain: 'air', type: 'multirole', origin: 'XX', maxSpeed_mach: 2, hardpoints: 10, armament: [{ mountType: 'hardpoint', weaponSystemId: 'example-aam', quantity: 4 }] }],
        countries: [{ id: 'ZZ', name: 'Example', nameKo: '예시국', region: 'europe', dataTier: 3, hasMilitary: true, army: [], navy: [], airForce: [{ platformId: 'example-jet', quantity: 12 }] }],
      },
      null,
      2
    ),
    'application/json'
  );
}

function downloadCsvTemplate() {
  download(
    'gmdb-weapons-template.csv',
    'id,name,nameKo,category,role,origin,introduced,range_km,speed_mach,warhead_kg,penetration_mm,rof_rpm,caliber_mm,guidance\n' +
      'example-aam,Example AAM,예시 공대공,missile,anti-air-aam,XX,2025,100,4,20,,,,active-radar|inertial\n' +
      'example-gun,Example Gun,예시 함포,gun,,XX,2020,30,,,,20,127,\n',
    'text/csv'
  );
}
