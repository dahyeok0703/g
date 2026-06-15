import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { Stepper } from '@/components/ui/Stepper';
import { PEOPLE, PLACES, PURPOSES } from '@/data/context';
import { useStore } from '@/store/useStore';
import type { PersonKey, PlaceKey, PurposeKey } from '@/lib/types';

type StepKey = 'place' | 'person' | 'purpose';

const STEPS: { key: StepKey; title: string; question: string }[] = [
  { key: 'place', title: '장소', question: '어디로 가나요?' },
  { key: 'person', title: '사람', question: '누구를 만나나요?' },
  { key: 'purpose', title: '목적', question: '무엇을 하나요?' },
];

// quick-skip defaults (spec §5: "빠르게")
const QUICK = { place: 'cafe', person: 'friend', purpose: 'gathering' } as const;

export function Wizard() {
  const [step, setStep] = useState(0);
  const draft = useStore((s) => s.draft);
  const setDraft = useStore((s) => s.setDraft);
  const go = useStore((s) => s.go);
  const runCuration = useStore((s) => s.runCuration);

  const current = STEPS[step];
  const selected = draft[current.key];

  const pick = (value: string) => {
    setDraft({ [current.key]: value } as Partial<typeof draft>);
    if (step < STEPS.length - 1) {
      setTimeout(() => setStep((s) => s + 1), 180);
    }
  };

  const options =
    current.key === 'place'
      ? PLACES
      : current.key === 'person'
        ? PEOPLE
        : PURPOSES;

  const ready =
    Boolean(draft.place) && Boolean(draft.person) && Boolean(draft.purpose);

  const back = () => (step === 0 ? go('landing') : setStep((s) => s - 1));

  const quickStart = () => {
    setDraft(QUICK);
    setTimeout(() => void runCuration(), 60);
  };

  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-xl flex-col px-6 py-8">
      <header className="flex items-center justify-between">
        <button onClick={back} className="label-caps hover:text-ink">
          ← 뒤로
        </button>
        <Stepper total={STEPS.length} current={step} />
        <button onClick={quickStart} className="label-caps hover:text-ink">
          빠르게 ⚡
        </button>
      </header>

      <main className="flex flex-1 flex-col justify-center py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="label-caps mb-2">{current.title}</p>
            <h2 className="mb-8 font-display text-3xl font-semibold tracking-display text-ink">
              {current.question}
            </h2>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {options.map((o) => (
                <Chip
                  key={o.key}
                  emoji={o.emoji}
                  label={o.label}
                  hint={o.hint}
                  active={selected === o.key}
                  onClick={() => pick(o.key)}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="flex items-center justify-between gap-3">
        <span className="text-sm text-ink-soft">
          {summarize(draft.place, draft.person, draft.purpose)}
        </span>
        <Button onClick={() => void runCuration()} disabled={!ready}>
          코디 보기
        </Button>
      </footer>
    </div>
  );
}

function summarize(
  place?: PlaceKey,
  person?: PersonKey,
  purpose?: PurposeKey
): string {
  const p = PLACES.find((x) => x.key === place)?.label;
  const pe = PEOPLE.find((x) => x.key === person)?.label;
  const pu = PURPOSES.find((x) => x.key === purpose)?.label;
  return [p, pe, pu].filter(Boolean).join(' · ') || '세 가지를 골라 주세요';
}
