/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#4169e1',
        secondary: '#1e40af',
        gold: '#B8860B',
        olive: '#6B5D1F',
      },
    },
  },
  plugins: [],
}
