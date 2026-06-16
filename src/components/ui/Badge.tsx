import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import type { DataConfidence, DataTier } from '@/types';

type Tone = 'neutral' | 'accent' | 'warn' | 'danger' | 'info';

const TONES: Record<Tone, string> = {
  neutral: 'border-hud-line text-hud-ink-soft',
  accent: 'border-hud-accent-dim text-hud-accent',
  warn: 'border-hud-warn/40 text-hud-warn',
  danger: 'border-hud-danger/40 text-hud-danger',
  info: 'border-hud-info/40 text-hud-info',
};

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider',
        TONES[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

const TIER_TONE: Record<DataTier, Tone> = { 1: 'accent', 2: 'info', 3: 'neutral', 4: 'neutral' };

export function TierBadge({ tier }: { tier: DataTier }) {
  return <Badge tone={TIER_TONE[tier]}>Tier {tier}</Badge>;
}

const CONF_TONE: Record<DataConfidence, Tone> = { high: 'accent', medium: 'warn', low: 'danger' };
const CONF_LABEL: Record<DataConfidence, string> = { high: '신뢰 高', medium: '신뢰 中', low: '추정' };

export function ConfidenceBadge({ level }: { level?: DataConfidence }) {
  if (!level) return null;
  return <Badge tone={CONF_TONE[level]}>{CONF_LABEL[level]}</Badge>;
}
