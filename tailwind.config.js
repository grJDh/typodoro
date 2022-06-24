/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto Flex', ...defaultTheme.fontFamily.sans],
      },
    },
    fontFamily: {
      'sans': ['Roboto Flex', 'sans-serif'],
    },
  },
  plugins: [],
}
