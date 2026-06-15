import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { PERSON_MAP, PLACE_MAP, PURPOSE_MAP } from '@/data/context';
import { useStore } from '@/store/useStore';
import { LookCard } from './components/LookCard';
import { LookbookSkeleton } from './components/LookbookSkeleton';
import { RefineBar } from './components/RefineBar';

export function Results() {
  const status = useStore((s) => s.status);
  const looks = useStore((s) => s.looks);
  const weather = useStore((s) => s.weather);
  const situation = useStore((s) => s.situation);
  const source = useStore((s) => s.source);
  const shuffle = useStore((s) => s.shuffle);
  const go = useStore((s) => s.go);

  const loadingImages = looks.some((l) =>
    Object.values(l.items).some((it) => it && it.image === undefined)
  );

  return (
    <div className="mx-auto min-h-[100dvh] max-w-page px-6 py-8 md:px-10">
      <header className="mb-6 flex items-center justify-between">
        <button onClick={() => go('wizard')} className="label-caps hover:text-ink">
          ← 다시 고르기
        </button>
        <span className="label-caps">
          {source === 'rule' ? '규칙 추천' : 'Claude 큐레이션'}
        </span>
      </header>

      {/* situation summary chips */}
      {weather && situation && (
        <div className="mb-7 flex flex-wrap items-center gap-2">
          <SummaryChip icon={weather.icon} label={`체감 ${weather.feelsLike}°`} />
          <SummaryChip label={PLACE_MAP[situation.place].label} />
          <SummaryChip label={PERSON_MAP[situation.person].label} />
          <SummaryChip label={PURPOSE_MAP[situation.purpose].label} />
        </div>
      )}

      {status === 'loading' && looks.length === 0 ? (
        <LookbookSkeleton />
      ) : status === 'error' ? (
        <ErrorState onRetry={() => void shuffle()} />
      ) : (
        <>
          <div className="grid gap-6 lg:grid-cols-2">
            {looks.map((look, i) => (
              <LookCard
                key={look.id}
                look={look}
                index={i}
                loadingImages={loadingImages}
              />
            ))}
          </div>

          <div className="mt-7 flex items-center justify-center gap-3">
            <Button variant="outline" onClick={() => void shuffle()}>
              ↻ 다른 코디
            </Button>
            <Button variant="outline" onClick={() => go('history')}>
              보관함
            </Button>
          </div>

          <RefineBar />
        </>
      )}
    </div>
  );
}

function SummaryChip({ icon, label }: { icon?: string; label: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-ink"
    >
      {icon && <Icon name={icon} size={16} />}
      {label}
    </motion.span>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-card border border-line bg-surface/60 py-20 text-center">
      <p className="font-display text-2xl text-ink">코디를 불러오지 못했어요</p>
      <p className="max-w-sm text-sm text-ink-soft">
        잠시 후 다시 시도하면 규칙 기반 추천으로라도 코디를 보여드릴게요.
      </p>
      <Button onClick={onRetry}>다시 시도</Button>
    </div>
  );
}
