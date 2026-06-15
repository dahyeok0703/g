/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Per-app design tokens — muted editorial palette (see spec §4).
        bg: '#F6F4EF',
        surface: '#FFFFFF',
        ink: '#1F1D1A',
        'ink-soft': '#6B665E',
        line: '#E7E3DA',
        accent: '#B5704D', // terracotta — single low-saturation accent
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', 'sans-serif'],
        display: ['"Nanum Myeongjo"', 'Pretendard', 'serif'],
      },
      borderRadius: {
        card: '18px',
        photo: '16px',
      },
      letterSpacing: {
        display: '-0.02em',
        label: '0.06em',
      },
      maxWidth: {
        page: '1120px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22,1,0.36,1) both',
      },
    },
  },
  plugins: [],
};
