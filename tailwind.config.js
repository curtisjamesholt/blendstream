/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./pages/**/*.tsx', './src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        brand: {
          300: '#7FCDFD',
          400: '#50BDFF',
          500: '#29AEFE',
          600: '#1FA6E0',
          700: '#2089AA',
        },
        accent: {
          300: '#FFB363',
          400: '#FFA03C',
          500: '#FF8E17',
          600: '#F88317',
          700: '#E9721B',
        },
      },
    },
  },
  plugins: [
    require('tailwind-gradient-mask-image'),
    require('@tailwindcss/line-clamp'),
  ],
};
