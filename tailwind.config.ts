import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#F5F2EC',
          alt: '#EBE6DB',
          deep: '#17170F',
        },
        fg: {
          DEFAULT: '#14130E',
          mute: '#5A544A',
        },
        line: 'rgba(20,19,14,.16)',
        accent: {
          DEFAULT: '#2F4A38',
          soft: '#5A7A63',
        },
        'hero-accent': '#E8D9B8',
      },
      fontFamily: {
        sans: [
          'Pretendard',
          'IBM Plex Sans KR',
          '-apple-system',
          'BlinkMacSystemFont',
          'Apple SD Gothic Neo',
          'Noto Sans KR',
          'system-ui',
          'sans-serif',
        ],
        serif: ['Noto Serif KR', 'serif'],
        'serif-it': ['Cormorant Garamond', 'Noto Serif KR', 'serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      maxWidth: {
        page: '1240px',
      },
      letterSpacing: {
        tightish: '-0.015em',
        eyebrow: '0.22em',
        mono: '0.14em',
      },
    },
  },
  plugins: [],
};

export default config;
