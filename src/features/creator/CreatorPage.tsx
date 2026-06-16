import { useRef, useState } from 'react';
import { Download, Trash2, Upload } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { useCustomStore } from '@/store/useCustomStore';
import { CATEGORY_LABEL, DOMAIN_TYPE_LABEL } from '@/lib/labels';
import { WeaponForm } from './WeaponForm';
import { PlatformForm } from './PlatformForm';

type Tab = 'weapon' | 'platform' | 'manage';

export function CreatorPage() {
  const [tab, setTab] = useState<Tab>('weapon');
  const weapons = useCustomStore((s) => s.weapons);
  const platforms = useCustomStore((s) => s.platforms);
  const countries = useCustomStore((s) => s.countries);

  return (
    <div>
      <PageHeader
        eyebrow="Fabrication"
        title="커스텀 제작기"
        subtitle="무기체계와 플랫폼을 직접 설계해 카탈로그에 등록하고 시뮬레이션에 투입합니다. 모든 커스텀 데이터는 브라우저에 영속 저장되며 JSON으로 백업할 수 있습니다."
        actions={<ImportExport />}
      />

      <Tabs
        items={[
          { key: 'weapon', label: '무기 제작' },
          { key: 'platform', label: '플랫폼 제작' },
          { key: 'manage', label: '내 커스텀', count: weapons.length + platforms.length + countries.length },
        ]}
        active={tab}
        onChange={(k) => setTab(k as Tab)}
      />

      <div className="mt-6">
        {tab === 'weapon' && <WeaponForm />}
        {tab === 'platform' && <PlatformForm />}
        {tab === 'manage' && <ManageList />}
      </div>
    </div>
  );
}

function ImportExport() {
  const { weapons, platforms, countries, importAll } = useCustomStore();
  const fileRef = useRef<HTMLInputElement>(null);

  const exportJson = () => {
    const blob = new Blob([JSON.stringify({ weapons, platforms, countries }, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gmdb-custom-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result));
        importAll({ weapons: data.weapons, platforms: data.platforms, countries: data.countries });
        alert('커스텀 데이터를 가져왔습니다.');
      } catch {
        alert('JSON 파싱에 실패했습니다.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex gap-2">
      <input
        ref={fileRef}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && importJson(e.target.files[0])}
      />
      <button
        onClick={() => fileRef.current?.click()}
        className="flex items-center gap-1.5 rounded-md border border-hud-line px-3 py-2 font-mono text-xs text-hud-ink-soft hover:border-hud-accent-dim hover:text-hud-ink"
      >
        <Upload size={14} /> 가져오기
      </button>
      <button
        onClick={exportJson}
        className="flex items-center gap-1.5 rounded-md border border-hud-line px-3 py-2 font-mono text-xs text-hud-ink-soft hover:border-hud-accent-dim hover:text-hud-ink"
      >
        <Download size={14} /> 내보내기
      </button>
    </div>
  );
}

function ManageList() {
  const { weapons, platforms, removeWeapon, removePlatform, clearAll } = useCustomStore();

  if (weapons.length + platforms.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-hud-line px-4 py-16 text-center text-sm text-hud-ink-soft">
        아직 제작한 항목이 없습니다. 무기/플랫폼을 만들어 등록하세요.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {weapons.length > 0 && (
        <section>
          <h3 className="hud-label mb-2 text-hud-accent">커스텀 무기 ({weapons.length})</h3>
          <ul className="space-y-1.5">
            {weapons.map((w) => (
              <li key={w.id} className="flex items-center gap-3 rounded-lg border border-hud-line bg-hud-panel px-4 py-2.5">
                <span className="flex-1 truncate text-sm text-hud-ink">{w.nameKo ?? w.name}</span>
                <Badge tone="info">{CATEGORY_LABEL[w.category]}</Badge>
                <button onClick={() => removeWeapon(w.id)} className="p-1 text-hud-ink-soft hover:text-hud-danger">
                  <Trash2 size={15} />
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {platforms.length > 0 && (
        <section>
          <h3 className="hud-label mb-2 text-hud-accent">커스텀 플랫폼 ({platforms.length})</h3>
          <ul className="space-y-1.5">
            {platforms.map((p) => (
              <li key={p.id} className="flex items-center gap-3 rounded-lg border border-hud-line bg-hud-panel px-4 py-2.5">
                <span className="flex-1 truncate text-sm text-hud-ink">{p.nameKo ?? p.name}</span>
                <Badge tone="info">{DOMAIN_TYPE_LABEL[p.type] ?? p.type}</Badge>
                <button onClick={() => removePlatform(p.id)} className="p-1 text-hud-ink-soft hover:text-hud-danger">
                  <Trash2 size={15} />
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <button
        onClick={() => confirm('모든 커스텀 데이터를 삭제할까요?') && clearAll()}
        className="font-mono text-xs text-hud-danger/80 hover:text-hud-danger hover:underline"
      >
        전체 삭제
      </button>
    </div>
  );
}
