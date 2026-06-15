import type { Conditions, WeatherSnapshot } from '@/lib/types';

// Weather adapter (spec §3, §6.1). OpenWeatherMap is the MVP source behind a
// thin interface so the 기상청(KMA) API can replace it later. Geolocation is
// primary; a manual city list is the fallback when permission is denied or no
// key is present.

export interface WeatherAdapter {
  byCoords(lat: number, lon: number): Promise<WeatherSnapshot>;
  byCity(city: CityKey): Promise<WeatherSnapshot>;
}

export interface City {
  key: CityKey;
  label: string;
  lat: number;
  lon: number;
}

export type CityKey =
  | 'seoul'
  | 'busan'
  | 'incheon'
  | 'daegu'
  | 'daejeon'
  | 'gwangju'
  | 'jeju';

export const CITIES: City[] = [
  { key: 'seoul', label: '서울', lat: 37.5665, lon: 126.978 },
  { key: 'busan', label: '부산', lat: 35.1796, lon: 129.0756 },
  { key: 'incheon', label: '인천', lat: 37.4563, lon: 126.7052 },
  { key: 'daegu', label: '대구', lat: 35.8714, lon: 128.6014 },
  { key: 'daejeon', label: '대전', lat: 36.3504, lon: 127.3845 },
  { key: 'gwangju', label: '광주', lat: 35.1595, lon: 126.8526 },
  { key: 'jeju', label: '제주', lat: 33.4996, lon: 126.5312 },
];

const KEY = import.meta.env.VITE_OPENWEATHER_KEY as string | undefined;

export function hasWeatherKey(): boolean {
  return Boolean(KEY);
}

interface OwmResponse {
  main: { temp: number; feels_like: number; humidity: number };
  weather: { id: number; main: string; description: string }[];
  wind: { speed: number };
  name: string;
}

function parseConditions(d: OwmResponse): Conditions {
  const id = d.weather[0]?.id ?? 800;
  const main = (d.weather[0]?.main ?? '').toLowerCase();
  return {
    rain: main.includes('rain') || main.includes('drizzle') || (id >= 500 && id < 600),
    snow: main.includes('snow') || (id >= 600 && id < 700),
    windy: (d.wind?.speed ?? 0) >= 8, // m/s
    humid: (d.main.humidity ?? 0) >= 75 && d.main.temp >= 22,
    uvHigh: d.main.temp >= 25 && (id === 800 || id === 801),
  };
}

function moodIcon(d: OwmResponse): string {
  const id = d.weather[0]?.id ?? 800;
  if (id >= 200 && id < 300) return 'storm';
  if (id >= 300 && id < 600) return 'rain';
  if (id >= 600 && id < 700) return 'snow';
  if (id >= 700 && id < 800) return 'mist';
  if (id === 800) return 'clear';
  return 'cloud';
}

function toSnapshot(d: OwmResponse): WeatherSnapshot {
  return {
    temp: Math.round(d.main.temp),
    feelsLike: Math.round(d.main.feels_like),
    conditions: parseConditions(d),
    description: d.weather[0]?.description ?? '',
    locationName: d.name || '',
    icon: moodIcon(d),
  };
}

async function fetchOwm(lat: number, lon: number): Promise<WeatherSnapshot> {
  if (!KEY) throw new Error('no_weather_key');
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=kr&appid=${KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`owm ${res.status}`);
  return toSnapshot((await res.json()) as OwmResponse);
}

export const owmAdapter: WeatherAdapter = {
  byCoords: (lat, lon) => fetchOwm(lat, lon),
  byCity: (city) => {
    const c = CITIES.find((x) => x.key === city) ?? CITIES[0];
    return fetchOwm(c.lat, c.lon).then((s) => ({ ...s, locationName: c.label }));
  },
};

/** Seasonal mock used when no key is configured (StackBlitz / first run). */
export function mockWeather(city: CityKey = 'seoul'): WeatherSnapshot {
  const c = CITIES.find((x) => x.key === city) ?? CITIES[0];
  const month = new Date().getMonth(); // 0..11
  const seasonal = [2, 1, 8, 15, 21, 25, 28, 29, 24, 16, 9, 3][month];
  return {
    temp: seasonal,
    feelsLike: seasonal,
    conditions: {
      rain: false,
      snow: seasonal < 2,
      windy: false,
      humid: seasonal >= 26,
      uvHigh: seasonal >= 25,
    },
    description: '예시 날씨',
    locationName: c.label,
    icon: seasonal >= 23 ? 'clear' : seasonal < 4 ? 'snow' : 'cloud',
  };
}

export function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('no_geolocation'));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      timeout: 8000,
      maximumAge: 10 * 60 * 1000,
    });
  });
}
