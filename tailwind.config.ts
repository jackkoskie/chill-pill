import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

export default {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      animation: {
        rotateText: 'text-slide 8s infinite',
      },
      keyframes: {
        'text-slide': {
          '0%, 16%': {
            transform: 'translateY(0)',
          },
          '20%, 36%': {
            transform: 'translateY(-16.66%)',
          },
          '40%, 56%': {
            transform: 'translateY(-33.33%)',
          },
          '60%, 76%': {
            transform: 'translateY(-50%)',
          },
          '80%, 96%': {
            transform: 'translateY(-66.66%)',
          },
          '100%': {
            transform: 'translateY(-83.33%)',
          },
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#111827",
          "secondary": "#0035ff",
          "accent": "#00b66f",
          "neutral": "#142225",
          "base-100": "#fff3ec",
          "info": "#00d7ff",
          "success": "#007d00",
          "warning": "#a38000",
          "error": "#fe5974",
          },
        },
        "luxury",
      ],
  },
  plugins: [daisyui],
} satisfies Config;
