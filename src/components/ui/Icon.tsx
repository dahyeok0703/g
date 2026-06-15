import type { SVGProps } from 'react';

// Minimal line-icon set used as graceful fallbacks when a real photo can't be
// sourced (spec §3-A) and for weather moods. Intentionally simple + on-brand.

type IconKey =
  | 'shirt'
  | 'tee'
  | 'blouse'
  | 'knit'
  | 'sweat'
  | 'cardigan'
  | 'jacket'
  | 'blazer'
  | 'trench'
  | 'coat'
  | 'padding'
  | 'pants'
  | 'shorts'
  | 'skirt'
  | 'sneaker'
  | 'loafer'
  | 'boot'
  | 'heel'
  | 'flat'
  | 'sandal'
  | 'cap'
  | 'glasses'
  | 'bag'
  | 'watch'
  | 'scarf'
  | 'gloves'
  | 'umbrella'
  // weather
  | 'clear'
  | 'cloud'
  | 'rain'
  | 'snow'
  | 'storm'
  | 'mist';

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const PATHS: Record<IconKey, JSX.Element> = {
  shirt: <path {...base} d="M8 4l4 2 4-2 4 3-2 3-2-1v9H8V9L6 10 4 7z" />,
  tee: <path {...base} d="M8 4l4 2 4-2 4 3-2 3-2-1v9H8V9L6 10 4 7z" />,
  blouse: <path {...base} d="M9 4l3 3 3-3 4 3-2 3v9H7v-9L5 7z" />,
  knit: (
    <g {...base}>
      <path d="M8 4l4 2 4-2 4 3-2 3-2-1v9H8V9L6 10 4 7z" />
      <path d="M9 11l6 4M15 11l-6 4" />
    </g>
  ),
  sweat: <path {...base} d="M8 4l4 1 4-1 4 3-2 3-2-1v9H8V9L6 10 4 7z" />,
  cardigan: (
    <g {...base}>
      <path d="M8 4l4 2 4-2 4 3-2 3-2-1v9H8V9L6 10 4 7z" />
      <path d="M12 6v13" />
    </g>
  ),
  jacket: (
    <g {...base}>
      <path d="M8 4l4 2 4-2 4 3-2 3-2-1v9H8V9L6 10 4 7z" />
      <path d="M12 6v13" />
    </g>
  ),
  blazer: (
    <g {...base}>
      <path d="M8 4l4 2 4-2 4 3-2 3-2-1v9H8V9L6 10 4 7z" />
      <path d="M12 6l-2 5M12 6l2 5" />
    </g>
  ),
  trench: (
    <g {...base}>
      <path d="M8 4l4 2 4-2 3 3-1 3-2-1v10H8V9L7 10 5 7z" />
      <path d="M12 6v13M10 12h4" />
    </g>
  ),
  coat: (
    <g {...base}>
      <path d="M8 4l4 2 4-2 3 3-1 3-2-1v11H8V9L7 10 5 7z" />
      <path d="M12 6v14" />
    </g>
  ),
  padding: (
    <g {...base}>
      <path d="M8 4l4 2 4-2 3 3-1 3-2-1v11H8V9L7 10 5 7z" />
      <path d="M9 10h6M9 13h6M9 16h6" />
    </g>
  ),
  pants: <path {...base} d="M8 4h8l-1 16h-2l-1-9-1 9H8z" />,
  shorts: <path {...base} d="M8 4h8l-1 9h-2l-1-5-1 5H8z" />,
  skirt: <path {...base} d="M8 5h8l3 14H5z" />,
  sneaker: <path {...base} d="M4 15l2-5 4 3 8 1 2 3v2H4z" />,
  loafer: <path {...base} d="M4 14h9l5 2 2 1v2H4zM7 14v-2" />,
  boot: <path {...base} d="M9 4h4v8l5 2v4H9z" />,
  heel: <path {...base} d="M5 5h3l1 9 8 3v2H5z" />,
  flat: <path {...base} d="M4 14c4 1 9 1 16 1v3H4z" />,
  sandal: (
    <g {...base}>
      <path d="M5 16h12v2H5z" />
      <path d="M7 16l4-4M11 16l3-3" />
    </g>
  ),
  cap: <path {...base} d="M4 15c0-5 4-8 8-8s8 3 8 8H4zM12 15v2" />,
  glasses: (
    <g {...base}>
      <circle cx="7" cy="13" r="3" />
      <circle cx="17" cy="13" r="3" />
      <path d="M10 12h4M3 11l2-1M21 11l-2-1" />
    </g>
  ),
  bag: <path {...base} d="M6 9h12l1 11H5zM9 9V7a3 3 0 016 0v2" />,
  watch: (
    <g {...base}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 5V8M12 16v3" />
    </g>
  ),
  scarf: <path {...base} d="M6 5h12v5a4 4 0 01-4 4h-1v6h-2v-6H6z" />,
  gloves: <path {...base} d="M7 12V6a1 1 0 012 0M9 12V5a1 1 0 012 0M11 12V6a1 1 0 012 0M7 12c0 5 2 7 5 7s5-2 5-7v-2" />,
  umbrella: <path {...base} d="M12 4c5 0 8 4 8 7H4c0-3 3-7 8-7zM12 4v13a2 2 0 01-4 0" />,
  clear: (
    <g {...base}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.5 5.5l1.5 1.5M17 17l1.5 1.5M18.5 5.5L17 7M7 17l-1.5 1.5" />
    </g>
  ),
  cloud: <path {...base} d="M7 16a4 4 0 010-8 5 5 0 019 1 3.5 3.5 0 01-1 7z" />,
  rain: (
    <g {...base}>
      <path d="M7 14a4 4 0 010-8 5 5 0 019 1 3.5 3.5 0 01-1 7" />
      <path d="M9 18l-1 2M13 18l-1 2M17 18l-1 2" />
    </g>
  ),
  snow: (
    <g {...base}>
      <path d="M7 13a4 4 0 010-8 5 5 0 019 1 3.5 3.5 0 01-1 7" />
      <path d="M9 18v.01M12 19v.01M15 18v.01" />
    </g>
  ),
  storm: (
    <g {...base}>
      <path d="M7 13a4 4 0 010-8 5 5 0 019 1 3.5 3.5 0 01-1 7" />
      <path d="M12 14l-2 4h3l-2 4" />
    </g>
  ),
  mist: <path {...base} d="M4 9h16M5 13h14M6 17h12" />,
};

export function Icon({
  name,
  size = 24,
  ...rest
}: { name: string; size?: number } & SVGProps<SVGSVGElement>) {
  const path = PATHS[name as IconKey] ?? PATHS.shirt;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role="img"
      aria-hidden="true"
      {...rest}
    >
      {path}
    </svg>
  );
}
