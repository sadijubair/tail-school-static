/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#dc143c',
        secondary: '#b91c1c',
        gold: '#B8860B',
        olive: '#6B5D1F',
      },
    },
  },
  plugins: [],
}
