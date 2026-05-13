/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          0:   '#06070a',
          50:  '#0a0b0f',
          100: '#0e1014',
          200: '#14171d',
          300: '#1c2027',
          400: '#262b34',
          500: '#363c47',
        },
        fog: {
          50:  '#9ca0aa',
          100: '#b8bcc6',
          200: '#d4d7de',
        },
        violet: { DEFAULT: '#a78bfa' },
        mint:   { DEFAULT: '#5eead4' },
        amber:  { DEFAULT: '#fbbf24' },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'glow-violet': '0 0 60px -10px rgba(167,139,250,0.35)',
        'glow-mint':   '0 0 60px -10px rgba(94,234,212,0.30)',
      },
    },
  },
  plugins: [],
};
