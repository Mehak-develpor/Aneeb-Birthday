/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          100: '#F9E8B8',
          200: '#F2D88A',
          300: '#EBC85C',
          400: '#E4B82E',
          500: '#D4A017',
          600: '#B8860B',
          700: '#9A7209',
          800: '#7C5E07',
          900: '#5E4A05',
        },
        dark: {
          50: '#2A2A2A',
          100: '#1F1F1F',
          200: '#181818',
          300: '#141414',
          400: '#0F0F0F',
          500: '#0A0A0A',
          600: '#080808',
          700: '#050505',
          800: '#030303',
          900: '#000000',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'vault-open-left': 'vault-open-left 1.5s ease-out forwards',
        'vault-open-right': 'vault-open-right 1.5s ease-out forwards',
        'fade-in-up': 'fade-in-up 1s ease-out forwards',
        'scale-in': 'scale-in 0.5s ease-out forwards',
        'shake': 'shake 0.5s ease-in-out',
        'particle-float': 'particle-float 8s ease-in-out infinite',
        'firework': 'firework 1.5s ease-out forwards',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { textShadow: '0 0 20px rgba(212, 160, 23, 0.3), 0 0 40px rgba(212, 160, 23, 0.1)' },
          '50%': { textShadow: '0 0 30px rgba(212, 160, 23, 0.6), 0 0 60px rgba(212, 160, 23, 0.3), 0 0 90px rgba(212, 160, 23, 0.1)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'vault-open-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'vault-open-right': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        'particle-float': {
          '0%, 100%': { transform: 'translate(0, 0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '50%': { transform: 'translate(var(--tx), var(--ty))' },
        },
        'firework': {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '1' },
          '100%': { transform: 'translate(var(--tx), var(--ty)) scale(0)', opacity: '0' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4A017 0%, #F2D88A 25%, #D4A017 50%, #B8860B 75%, #D4A017 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0A0A0A 0%, #000000 100%)',
      },
    },
  },
  plugins: [],
};
