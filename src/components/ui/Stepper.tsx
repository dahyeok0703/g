export function Stepper({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex items-center gap-2" aria-label={`${current + 1} / ${total} 단계`}>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-1 rounded-full transition-all duration-300 ${
            i === current
              ? 'w-8 bg-ink'
              : i < current
                ? 'w-4 bg-ink/40'
                : 'w-4 bg-line'
          }`}
        />
      ))}
    </div>
  );
}
