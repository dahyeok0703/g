import { useCallback, useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';
import {
  CITIES,
  type CityKey,
  getCurrentPosition,
  hasWeatherKey,
  mockWeather,
  owmAdapter,
} from './adapter';

// Drives weather acquisition: geolocation → OWM, with a manual-city fallback
// and a seasonal mock when no API key is configured.

export function useWeather() {
  const setWeather = useStore((s) => s.setWeather);
  const setWeatherStatus = useStore((s) => s.setWeatherStatus);
  const status = useStore((s) => s.weatherStatus);
  const started = useRef(false);

  const loadByCity = useCallback(
    async (city: CityKey) => {
      setWeatherStatus('loading');
      try {
        const w = hasWeatherKey()
          ? await owmAdapter.byCity(city)
          : mockWeather(city);
        setWeather(w);
      } catch {
        setWeather(mockWeather(city));
      }
    },
    [setWeather, setWeatherStatus]
  );

  const auto = useCallback(async () => {
    setWeatherStatus('loading');
    if (!hasWeatherKey()) {
      setWeather(mockWeather('seoul'));
      return;
    }
    try {
      const pos = await getCurrentPosition();
      const w = await owmAdapter.byCoords(
        pos.coords.latitude,
        pos.coords.longitude
      );
      setWeather(w);
    } catch {
      // permission denied / timeout → default city, user can change it
      try {
        setWeather(await owmAdapter.byCity('seoul'));
      } catch {
        setWeather(mockWeather('seoul'));
      }
    }
  }, [setWeather, setWeatherStatus]);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    void auto();
  }, [auto]);

  return { status, loadByCity, cities: CITIES, retry: auto };
}
