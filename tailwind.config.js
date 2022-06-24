/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto Flex', ...defaultTheme.fontFamily.sans],
      },
    },
    fontSize: {
      'timer': ['256px', '85%'],
      'l': '24px',
      'm': '16px',
      's': '12px',
    },
    colors: {
      'red950': '#0D0404',
      'red50': '#FFF2F2',
    },
  },
  plugins: [],
}
