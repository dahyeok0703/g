import type { ReactNode, SelectHTMLAttributes, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export function Field({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn('block', className)}>
      <span className="hud-label mb-1 block">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[11px] text-hud-ink-soft">{hint}</span>}
    </label>
  );
}

const baseInput =
  'w-full rounded-md border border-hud-line bg-hud-panel-2 px-3 py-2 text-sm text-hud-ink outline-none transition-colors focus:border-hud-accent-dim placeholder:text-hud-ink-soft/60';

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(baseInput, props.className)} />;
}

export function NumberInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input type="number" {...props} className={cn(baseInput, 'font-mono', props.className)} />;
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn(baseInput, 'appearance-none', props.className)} />;
}
