import { useMemo, useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { COUNTRY_DIRECTORY } from '@/data/countries/directory';

// Faction roster builder — pick member countries (spec §4.5).
export function FactionBuilder({
  title,
  color,
  ids,
  onChange,
  excludeIds,
}: {
  title: string;
  color: string;
  ids: string[];
  onChange: (ids: string[]) => void;
  excludeIds: string[];
}) {
  const [picking, setPicking] = useState(false);
  const options = useMemo(
    () =>
      COUNTRY_DIRECTORY.filter(
        (c) => c.hasMilitary && !ids.includes(c.id) && !excludeIds.includes(c.id)
      ),
    [ids, excludeIds]
  );

  return (
    <div className="hud-panel p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="h-3 w-3 rounded-full" style={{ background: color }} />
        <h3 className="font-mono text-sm font-bold text-hud-ink">{title}</h3>
        <span className="ml-auto font-mono text-xs text-hud-ink-soft">{ids.length}개국</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {ids.map((id) => {
          const c = COUNTRY_DIRECTORY.find((x) => x.id === id);
          return (
            <span key={id} className="inline-flex items-center gap-1.5 rounded-full border border-hud-line px-2.5 py-1 text-sm text-hud-ink">
              <span>{c?.flagEmoji}</span>
              {c?.nameKo ?? id}
              <button onClick={() => onChange(ids.filter((x) => x !== id))} aria-label="제거">
                <X size={12} className="text-hud-ink-soft hover:text-hud-danger" />
              </button>
            </span>
          );
        })}

        <div className="relative">
          <button
            onClick={() => setPicking((v) => !v)}
            className="inline-flex items-center gap-1 rounded-full border border-dashed border-hud-line px-2.5 py-1 font-mono text-xs text-hud-ink-soft hover:border-hud-accent-dim hover:text-hud-ink"
          >
            <Plus size={12} /> 추가
          </button>
          {picking && (
            <div className="absolute z-20 mt-2 max-h-64 w-60 overflow-y-auto rounded-lg border border-hud-line bg-hud-panel p-1 shadow-hud">
              {options.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    onChange([...ids, c.id]);
                    setPicking(false);
                  }}
                  className="flex w-full items-center gap-2 rounded px-2.5 py-1.5 text-left text-sm text-hud-ink hover:bg-hud-panel-2"
                >
                  <span>{c.flagEmoji}</span>
                  <span className="flex-1 truncate">{c.nameKo}</span>
                  <Badge>T{c.dataTier}</Badge>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
