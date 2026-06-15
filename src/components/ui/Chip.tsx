import type { ButtonHTMLAttributes, ReactNode } from 'react';

export function Chip({
  active = false,
  emoji,
  label,
  hint,
  className = '',
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  emoji?: ReactNode;
  label: string;
  hint?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`group flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all duration-200 ${
        active
          ? 'border-ink bg-surface shadow-[0_1px_0_rgba(31,29,26,0.04)]'
          : 'border-line bg-surface/60 hover:border-ink/30 hover:bg-surface'
      } ${className}`}
      {...rest}
    >
      {emoji != null && <span className="text-xl leading-none">{emoji}</span>}
      <span className="flex flex-col">
        <span
          className={`text-[15px] font-medium ${active ? 'text-ink' : 'text-ink'}`}
        >
          {label}
        </span>
        {hint && <span className="text-xs text-ink-soft">{hint}</span>}
      </span>
      <span
        className={`ml-auto h-2 w-2 rounded-full transition-colors ${
          active ? 'bg-accent' : 'bg-transparent'
        }`}
      />
    </button>
  );
}
