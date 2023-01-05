/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.tsx', './src/**/*.tsx'],
  theme: {
    extend: {},
  },
  plugins: [require('tailwind-gradient-mask-image')],
};
