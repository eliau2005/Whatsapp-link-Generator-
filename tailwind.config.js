/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00a884',
        'primary-dark': '#008f6f',
        'primary-container': '#d0f8f0',
        'on-primary-container': '#00201a',
        secondary: '#54656f',
        surface: '#f0f2f5',
        'surface-container': '#ffffff',
        error: '#ea0038',
      },
      fontFamily: {
        sans: ['Rubik', 'sans-serif'],
      },
      borderRadius: {
        xl: '24px',
        '2xl': '32px',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(0, 0, 0, 0.08)',
        'input': '0 0 0 1px #e2e8f0',
        'input-focus': '0 0 0 2px #00a884',
      },
      animation: {
        slideUp: 'slideUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
        fadeIn: 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}