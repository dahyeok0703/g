import { cn } from '@/lib/cn';

export interface TabItem {
  key: string;
  label: string;
  count?: number;
}

export function Tabs({
  items,
  active,
  onChange,
}: {
  items: TabItem[];
  active: string;
  onChange: (key: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1 border-b border-hud-line">
      {items.map((t) => {
        const isActive = t.key === active;
        return (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={cn(
              '-mb-px border-b-2 px-4 py-2.5 font-mono text-sm transition-colors',
              isActive
                ? 'border-hud-accent text-hud-ink'
                : 'border-transparent text-hud-ink-soft hover:text-hud-ink'
            )}
          >
            {t.label}
            {t.count != null && (
              <span className="ml-1.5 text-xs text-hud-ink-soft">{t.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
