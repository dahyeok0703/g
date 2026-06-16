import { Radar } from 'lucide-react';

export function Loading({ label = '로딩 중…' }: { label?: string }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3" role="status" aria-live="polite">
      <Radar size={28} className="animate-spin text-hud-accent" style={{ animationDuration: '2.4s' }} />
      <span className="font-mono text-xs text-hud-ink-soft">{label}</span>
    </div>
  );
}
