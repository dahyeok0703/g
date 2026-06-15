import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { PhotoTile } from '@/components/ui/PhotoTile';
import { Swatch } from '@/components/ui/Swatch';
import { slotIcon } from '@/lib/slotIcon';
import { SLOTS } from '@/lib/types';
import { useStore } from '@/store/useStore';

export function History() {
  const saved = useStore((s) => s.saved);
  const removeSaved = useStore((s) => s.removeSaved);
  const go = useStore((s) => s.go);

  return (
    <div className="mx-auto min-h-[100dvh] max-w-page px-6 py-8 md:px-10">
      <header className="mb-8 flex items-center justify-between">
        <button onClick={() => go('landing')} className="label-caps hover:text-ink">
          ← 홈
        </button>
        <span className="label-caps">보관함 {saved.length > 0 && `(${saved.length})`}</span>
      </header>

      <h1 className="mb-8 font-display text-4xl font-semibold tracking-display text-ink">
        저장한 코디
      </h1>

      {saved.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-card border border-dashed border-line py-24 text-center">
          <p className="text-ink-soft">아직 저장한 코디가 없어요.</p>
          <Button onClick={() => go('wizard')}>코디 받으러 가기</Button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((look, i) => {
            const used = SLOTS.filter((s) => look.items[s]).slice(0, 3);
            return (
              <motion.article
                key={look.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="rounded-card border border-line bg-surface/70 p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {look.mood}
                  </h3>
                  <Swatch palette={look.palette} />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {used.map((slot) => (
                    <PhotoTile
                      key={slot}
                      item={look.items[slot]}
                      iconKey={slotIcon(slot, look.items[slot]?.name)}
                    />
                  ))}
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-ink-soft">{look.reason}</p>
                <button
                  onClick={() => removeSaved(look.id)}
                  className="mt-3 text-xs text-ink-soft underline-offset-2 hover:text-ink hover:underline"
                >
                  삭제
                </button>
              </motion.article>
            );
          })}
        </div>
      )}
    </div>
  );
}
