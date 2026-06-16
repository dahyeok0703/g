import type { ReactNode } from 'react';

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  actions,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-hud-line pb-5">
      <div>
        <p className="hud-label mb-1.5 text-hud-accent">{eyebrow}</p>
        <h1 className="font-mono text-2xl font-bold tracking-tight text-hud-ink md:text-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-hud-ink-soft">
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  );
}

/** Stage 0 placeholder body — replaced as each feature lands. */
export function StagePlaceholder({ note }: { note: string }) {
  return (
    <div className="hud-panel flex flex-col items-center justify-center gap-3 px-6 py-20 text-center">
      <div className="hud-label">awaiting build</div>
      <p className="max-w-md text-sm text-hud-ink-soft">{note}</p>
    </div>
  );
}
