import { ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { getPlatform, valueOfPlatform } from '@/data';
import { DOMAIN_TYPE_LABEL } from '@/lib/labels';
import type { InventoryEntry } from '@/types';

// Lists a branch's inventory. Each row resolves its platform from the catalog;
// clicking selects it for the drilldown detail (wired in Stage 7).
export function InventoryList({
  entries,
  branchLabel,
  onSelect,
}: {
  entries: InventoryEntry[];
  branchLabel: string;
  onSelect?: (platformId: string) => void;
}) {
  if (entries.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-hud-line px-4 py-10 text-center text-sm text-hud-ink-soft">
        {branchLabel} 보유 장비 데이터가 없습니다.
      </p>
    );
  }

  return (
    <ul className="space-y-1.5">
      {entries.map((entry, i) => {
        const p = getPlatform(entry.platformId);
        const value = valueOfPlatform(entry.platformId);
        return (
          <li key={`${entry.platformId}-${i}`}>
            <button
              onClick={() => onSelect?.(entry.platformId)}
              disabled={!onSelect || !p}
              className="group flex w-full items-center gap-3 rounded-lg border border-hud-line bg-hud-panel px-4 py-3 text-left transition-colors enabled:hover:border-hud-accent-dim enabled:hover:bg-hud-panel-2 disabled:cursor-default"
            >
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="truncate text-[15px] font-medium text-hud-ink">
                    {p?.nameKo ?? p?.name ?? entry.platformId}
                  </span>
                  {p && <Badge>{DOMAIN_TYPE_LABEL[p.type] ?? p.type}</Badge>}
                  {entry.status && entry.status !== 'active' && (
                    <Badge tone={entry.status === 'ordered' ? 'info' : 'neutral'}>
                      {STATUS_LABEL[entry.status]}
                    </Badge>
                  )}
                </span>
                {(entry.variant || entry.notes) && (
                  <span className="mt-0.5 block truncate text-xs text-hud-ink-soft">
                    {[entry.variant, entry.notes].filter(Boolean).join(' · ')}
                  </span>
                )}
              </span>

              <span className="flex shrink-0 flex-col items-end">
                <span className="stat-value text-lg font-semibold text-hud-ink">
                  ×{entry.quantity.toLocaleString()}
                </span>
                {value > 0 && (
                  <span className="font-mono text-[10px] text-hud-ink-soft">CV {value}</span>
                )}
              </span>
              {onSelect && p && (
                <ChevronRight size={16} className="shrink-0 text-hud-ink-soft transition-colors group-hover:text-hud-accent" />
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

const STATUS_LABEL: Record<string, string> = {
  active: '운용',
  reserve: '예비',
  ordered: '도입예정',
  retired: '퇴역',
};
