// Mood text + lookbook skeleton shown during curation (spec §4, §8.3).
const MOOD_LINES = [
  '오늘의 무드를 고르는 중…',
  '날씨와 상황을 읽고 있어요',
  '어울리는 색을 맞추는 중…',
];

export function LookbookSkeleton() {
  return (
    <div className="space-y-6">
      <p className="animate-pulse text-center font-display text-xl text-ink-soft">
        {MOOD_LINES[Math.floor(Math.random() * MOOD_LINES.length)]}
      </p>
      {[0, 1].map((i) => (
        <div key={i} className="rounded-card border border-line bg-surface/70 p-5 md:p-7">
          <div className="mb-5 flex items-center justify-between">
            <div className="space-y-2">
              <div className="skeleton h-3 w-16 rounded-full" />
              <div className="skeleton h-7 w-40 rounded-lg" />
            </div>
            <div className="flex gap-1.5">
              <div className="skeleton h-9 w-9 rounded-full" />
              <div className="skeleton h-9 w-6 rounded-full" />
              <div className="skeleton h-9 w-4 rounded-full" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
            {[0, 1, 2, 3].map((j) => (
              <div key={j} className="skeleton aspect-[3/4] rounded-photo" />
            ))}
          </div>
          <div className="mt-5 space-y-2">
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-2/3 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
