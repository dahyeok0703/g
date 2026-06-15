import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { useWeather } from '@/features/weather/useWeather';
import { useStore } from '@/store/useStore';

const WEATHER_LABEL: Record<string, string> = {
  clear: '맑음',
  cloud: '구름',
  rain: '비',
  snow: '눈',
  storm: '천둥번개',
  mist: '안개',
};

export function Landing() {
  const weather = useStore((s) => s.weather);
  const go = useStore((s) => s.go);
  const savedCount = useStore((s) => s.saved.length);
  const { status, loadByCity, cities } = useWeather();
  const [pickCity, setPickCity] = useState(false);

  const summary = weather ? buildSummary(weather.feelsLike, weather.conditions) : '';

  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-page flex-col px-6 py-8 md:px-10">
      <header className="flex items-center justify-between">
        <span className="label-caps">오늘의 코디 · Fitday</span>
        <button
          onClick={() => go('history')}
          className="label-caps transition-colors hover:text-ink"
        >
          보관함{savedCount > 0 ? ` (${savedCount})` : ''}
        </button>
      </header>

      <main className="flex flex-1 flex-col justify-center py-12">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 flex items-center gap-2 text-ink-soft"
        >
          {weather && <Icon name={weather.icon} size={20} />}
          <span className="text-sm">
            {weather
              ? `${weather.locationName || '내 위치'} · ${WEATHER_LABEL[weather.icon] ?? weather.description}`
              : status === 'loading'
                ? '날씨를 불러오는 중…'
                : '위치를 확인하는 중…'}
          </span>
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display text-[clamp(40px,12vw,84px)] font-semibold leading-[0.95] tracking-display text-ink"
        >
          {weather ? (
            <>
              체감 {weather.feelsLike}°
            </>
          ) : (
            <span className="text-ink-soft/40">— °</span>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft"
        >
          {summary || '오늘 당신의 하루에 어울리는 옷을 골라 드릴게요.'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Button
            onClick={() => go('wizard')}
            disabled={!weather}
            className="px-7 py-4 text-base"
          >
            오늘 코디 받기 →
          </Button>
          <button
            onClick={() => setPickCity((v) => !v)}
            className="text-sm text-ink-soft underline-offset-4 hover:text-ink hover:underline"
          >
            위치가 다른가요?
          </button>
        </motion.div>

        {pickCity && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-5 flex flex-wrap gap-2"
          >
            {cities.map((c) => (
              <button
                key={c.key}
                onClick={() => {
                  void loadByCity(c.key);
                  setPickCity(false);
                }}
                className="rounded-full border border-line bg-surface px-4 py-2 text-sm text-ink-soft transition-colors hover:border-ink/40 hover:text-ink"
              >
                {c.label}
              </button>
            ))}
          </motion.div>
        )}
      </main>

      <footer className="label-caps text-ink-soft/70">
        날씨 · 장소 · 사람 · 목적 → 화보 같은 코디
      </footer>
    </div>
  );
}

function buildSummary(
  feelsLike: number,
  c: { rain: boolean; snow: boolean; windy: boolean; humid: boolean; uvHigh: boolean }
): string {
  const parts: string[] = [];
  if (feelsLike >= 28) parts.push('한낮 더위가 느껴지는 날');
  else if (feelsLike >= 23) parts.push('가볍게 입기 좋은 날');
  else if (feelsLike >= 17) parts.push('얇은 겉옷이 어울리는 날');
  else if (feelsLike >= 9) parts.push('코트가 생각나는 쌀쌀한 날');
  else parts.push('단단히 챙겨 입어야 할 추운 날');

  if (c.rain) parts.push('비 소식이 있어요');
  else if (c.snow) parts.push('눈이 올 수 있어요');
  else if (c.windy) parts.push('바람이 부니 겉옷을 챙기세요');
  else if (c.uvHigh) parts.push('햇빛이 강해요');

  return parts.join(', ') + '.';
}
