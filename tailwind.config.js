/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Military HUD / console palette — dark base, restrained accents.
        hud: {
          bg: '#0A0E0D', // near-black green-tinted base
          panel: '#101614', // panel surface
          'panel-2': '#16201D', // raised surface
          line: '#1F2D29', // hairline borders
          ink: '#D7E4DF', // primary text
          'ink-soft': '#7E938C', // secondary text
          accent: '#3FB68B', // primary accent (phosphor green)
          'accent-dim': '#2A6F57',
          warn: '#E0A23C', // amber readouts
          danger: '#D8553F', // threat / loss
          info: '#4C8FB5', // neutral data
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        hud: '0 0 0 1px rgba(63,182,139,0.08), 0 8px 30px rgba(0,0,0,0.4)',
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(63,182,139,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(63,182,139,0.05) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
