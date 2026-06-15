import type { Palette } from '@/lib/types';

// Palette as round swatches sized by the 70/25/5 ratio (spec §4).
export function Swatch({ palette }: { palette: Palette }) {
  const items: { color: string; w: string; label: string }[] = [
    { color: palette.base, w: 'w-9', label: 'base' },
    { color: palette.sub, w: 'w-6', label: 'sub' },
    { color: palette.accent, w: 'w-4', label: 'accent' },
  ];
  return (
    <div className="flex items-center gap-1.5" aria-label="컬러 팔레트">
      {items.map((it) => (
        <span
          key={it.label}
          title={it.color}
          className={`${it.w} h-9 rounded-full border border-black/5`}
          style={{ background: it.color }}
        />
      ))}
    </div>
  );
}
