import type { ReactNode } from 'react';

export function Stat({
  label,
  value,
  sub,
  tone = 'ink',
}: {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  tone?: 'ink' | 'accent' | 'danger' | 'warn';
}) {
  const color =
    tone === 'accent'
      ? 'text-hud-accent'
      : tone === 'danger'
        ? 'text-hud-danger'
        : tone === 'warn'
          ? 'text-hud-warn'
          : 'text-hud-ink';
  return (
    <div className="hud-panel px-4 py-3">
      <div className="hud-label mb-1">{label}</div>
      <div className={`stat-value text-xl font-semibold ${color}`}>{value}</div>
      {sub && <div className="mt-0.5 text-xs text-hud-ink-soft">{sub}</div>}
    </div>
  );
}
