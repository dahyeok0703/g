import { useState } from 'react';
import { useStore } from '@/store/useStore';

// Conversational refinement bar (spec §6.4, §8.4).
const SUGGESTIONS = ['더 캐주얼하게', '더 격식 있게', '바지로 바꿔줘', '밝은 색으로'];

export function RefineBar() {
  const sendRefine = useStore((s) => s.sendRefine);
  const busy = useStore((s) => s.refineBusy);
  const [text, setText] = useState('');

  const submit = (value: string) => {
    const v = value.trim();
    if (!v || busy) return;
    void sendRefine(v);
    setText('');
  };

  return (
    <div className="sticky bottom-0 z-10 -mx-6 mt-8 border-t border-line bg-bg/85 px-6 pb-[max(env(safe-area-inset-bottom),16px)] pt-3 backdrop-blur md:-mx-10 md:px-10">
      <div className="mx-auto max-w-page">
        <div className="mb-2 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => submit(s)}
              disabled={busy}
              className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-ink-soft transition-colors hover:border-ink/40 hover:text-ink disabled:opacity-40"
            >
              {s}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit(text);
          }}
          className="flex items-center gap-2"
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={busy ? '코디를 다시 맞추는 중…' : '“이 코트 빼줘” 처럼 말해보세요'}
            disabled={busy}
            className="h-12 flex-1 rounded-xl border border-line bg-surface px-4 text-[15px] text-ink outline-none transition-colors focus:border-ink/40 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={busy || !text.trim()}
            className="h-12 shrink-0 rounded-xl bg-ink px-5 text-[15px] font-medium text-bg transition-opacity disabled:opacity-40"
          >
            {busy ? '…' : '보정'}
          </button>
        </form>
      </div>
    </div>
  );
}
