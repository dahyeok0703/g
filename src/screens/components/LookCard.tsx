import { motion } from 'framer-motion';
import { PhotoTile } from '@/components/ui/PhotoTile';
import { Swatch } from '@/components/ui/Swatch';
import { slotIcon } from '@/lib/slotIcon';
import type { Look, Slot } from '@/lib/types';
import { SLOTS } from '@/lib/types';
import { useStore } from '@/store/useStore';

// One curated look rendered as a magazine spread (spec §8.4).
export function LookCard({
  look,
  index,
  loadingImages,
}: {
  look: Look;
  index: number;
  loadingImages: boolean;
}) {
  const saveLook = useStore((s) => s.saveLook);
  const isSaved = useStore((s) => s.isSaved(look));

  // Only render slots this look actually uses; keep a tidy lineup.
  const usedSlots = SLOTS.filter((s) => look.items[s]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-card border border-line bg-surface/70 p-5 md:p-7"
    >
      <header className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="label-caps mb-1">
            Look {String(index + 1).padStart(2, '0')}
            {look.source === 'ai' ? ' · 큐레이션' : ' · 추천'}
          </p>
          <h3 className="font-display text-2xl font-semibold tracking-display text-ink md:text-3xl">
            {look.mood}
          </h3>
        </div>
        <Swatch palette={look.palette} />
      </header>

      <div
        className={`grid gap-2.5 ${gridCols(usedSlots.length)}`}
      >
        {usedSlots.map((slot: Slot) => (
          <PhotoTile
            key={slot}
            item={look.items[slot]}
            iconKey={slotIcon(slot, look.items[slot]?.name)}
            loading={loadingImages && !look.items[slot]?.image}
          />
        ))}
      </div>

      <div className="mt-5 space-y-3">
        <p className="text-[15px] leading-relaxed text-ink">{look.reason}</p>
        <p className="flex gap-2 rounded-xl bg-bg px-4 py-3 text-sm text-ink-soft">
          <span aria-hidden>💡</span>
          <span>{look.tip}</span>
        </p>
      </div>

      <div className="mt-4 flex items-center gap-3 border-t border-line pt-4">
        <button
          onClick={() => saveLook(look)}
          disabled={isSaved}
          className={`text-sm font-medium transition-colors ${
            isSaved ? 'text-accent' : 'text-ink-soft hover:text-ink'
          }`}
        >
          {isSaved ? '♥ 보관함에 저장됨' : '♡ 저장'}
        </button>
      </div>
    </motion.article>
  );
}

function gridCols(n: number): string {
  if (n <= 2) return 'grid-cols-2';
  if (n === 3) return 'grid-cols-3';
  if (n === 4) return 'grid-cols-2 sm:grid-cols-4';
  return 'grid-cols-3 sm:grid-cols-5';
}
