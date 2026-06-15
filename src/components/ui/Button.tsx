import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'ghost' | 'outline';

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-ink text-bg hover:bg-ink/90 active:scale-[0.99] disabled:opacity-40',
  ghost: 'text-ink-soft hover:text-ink hover:bg-line/50',
  outline:
    'border border-line text-ink hover:border-ink/40 hover:bg-surface active:scale-[0.99]',
};

export function Button({
  variant = 'primary',
  className = '',
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-[15px] font-medium transition-all duration-200 disabled:cursor-not-allowed ${VARIANTS[variant]} ${className}`}
      {...rest}
    />
  );
}
