import { useState } from 'react';
import { Save, Trash2, FolderOpen } from 'lucide-react';
import { COUNTRY_DIRECTORY } from '@/data/countries/directory';
import { useScenarioStore, type ScenarioSlot } from '@/store/useScenarioStore';
import type { ScenarioVars } from '@/sim';

// Save / load named simulation matchups (spec §12).
export function ScenarioSlots({
  current,
  onLoad,
}: {
  current: { aIds: string[]; bIds: string[]; scenario: ScenarioVars };
  onLoad: (slot: ScenarioSlot) => void;
}) {
  const slots = useScenarioStore((s) => s.slots);
  const save = useScenarioStore((s) => s.save);
  const remove = useScenarioStore((s) => s.remove);
  const [name, setName] = useState('');

  const doSave = () => {
    const label = name.trim() || `${flags(current.aIds)} vs ${flags(current.bIds)}`;
    save({ name: label, ...current });
    setName('');
  };

  return (
    <div className="hud-panel p-4">
      <h3 className="hud-label mb-3 text-hud-accent">저장된 시나리오 ({slots.length})</h3>
      <div className="mb-3 flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="시나리오 이름 (선택)"
          className="flex-1 rounded-md border border-hud-line bg-hud-panel-2 px-3 py-2 text-sm text-hud-ink outline-none focus:border-hud-accent-dim placeholder:text-hud-ink-soft/60"
        />
        <button
          onClick={doSave}
          className="flex shrink-0 items-center gap-1.5 rounded-md border border-hud-line px-3 py-2 font-mono text-xs text-hud-ink-soft hover:border-hud-accent-dim hover:text-hud-ink"
        >
          <Save size={14} /> 저장
        </button>
      </div>

      {slots.length === 0 ? (
        <p className="text-xs text-hud-ink-soft">현재 진영·시나리오를 저장해 두면 여기서 불러올 수 있습니다.</p>
      ) : (
        <ul className="space-y-1.5">
          {slots.map((slot) => (
            <li key={slot.id} className="flex items-center gap-2 rounded-md border border-hud-line bg-hud-panel-2/40 px-3 py-2">
              <span className="min-w-0 flex-1 truncate text-sm text-hud-ink">{slot.name}</span>
              <span className="shrink-0 font-mono text-[10px] text-hud-ink-soft">
                {flags(slot.aIds)} vs {flags(slot.bIds)}
              </span>
              <button onClick={() => onLoad(slot)} className="shrink-0 p-1 text-hud-ink-soft hover:text-hud-accent" aria-label="불러오기">
                <FolderOpen size={14} />
              </button>
              <button onClick={() => remove(slot.id)} className="shrink-0 p-1 text-hud-ink-soft hover:text-hud-danger" aria-label="삭제">
                <Trash2 size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function flags(ids: string[]): string {
  return (
    ids
      .map((id) => COUNTRY_DIRECTORY.find((c) => c.id === id)?.flagEmoji ?? '?')
      .slice(0, 4)
      .join('') || '—'
  );
}
