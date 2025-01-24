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
          "primary": "#fda33d",
          "secondary": "#0de3e7",
          "accent": "#fa2390",
          "neutral": "#FDFEFE",
          "base-100": "#1a2348",
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
