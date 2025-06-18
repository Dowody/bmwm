/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bebasneue: ['Bebas Neue', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-sans-serif'],
      },
      screens: {
        'below400': {'max': '399px'},
        'below385': {'max': '384px'},
      },
      colors: {
        primary: {
          DEFAULT: '#ff3e3e',
          dark: '#cc0000',
          light: '#ff6b6b',
        },
        secondary: {
          DEFAULT: '#1a1a1a',
          dark: '#000000',
          light: '#333333',
        },
        accent: {
          DEFAULT: '#000000',
          dark: '#000000',
          light: '#333333',
        },
        background: {
          dark: '#0a0a0a',
          light: '#f5f5f5',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "url('/src/assets/hero-bg.jpg')",
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '10%': { transform: 'translateX(0)', opacity: '1' },
          '90%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(20px)', opacity: '0' },
        },
        slideLeftToCenter: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '20%': { opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideCenterToRight: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '80%': { opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        slideRightToCenter: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '20%': { opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideCenterToLeft: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '80%': { opacity: '1' },
          '100%': { transform: 'translateX(-100%)', opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        slideDown: 'slideDown 0.5s ease-out forwards',
        slideIn: 'slideIn 10s ease-out forwards',
        slideLeftToCenter: 'slideLeftToCenter 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        slideLeftToCenter: 'slideLeftToCenter 0.3s ease-out forwards',
        slideCenterToRight: 'slideCenterToRight 0.3s ease-out forwards',
        slideRightToCenter: 'slideRightToCenter 0.3s ease-out forwards',
        slideCenterToLeft: 'slideCenterToLeft 0.3s ease-out forwards',
        marquee: 'marquee 12s linear infinite',
      }
    },
  },
  plugins: [],
}
