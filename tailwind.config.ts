import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#171717',
          soft: '#2a2a2a',
          muted: '#5a5a5a',
          subtle: '#8a8a8a',
        },
        paper: {
          DEFAULT: '#ffffff',
          warm: '#faf9f6',
          line: '#e6e4df',
          card: '#f3f1ec',
        },
        accent: {
          DEFAULT: '#1f3a2b',
        },
      },
      fontFamily: {
        sans: [
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Apple SD Gothic Neo"',
          '"Noto Sans KR"',
          'system-ui',
          'sans-serif',
        ],
      },
      maxWidth: {
        page: '1240px',
      },
      letterSpacing: {
        tightish: '-0.015em',
      },
    },
  },
  plugins: [],
};

export default config;
