/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#008080',
        secondary: '#006666',
        gold: '#B8860B',
        olive: '#6B5D1F',
      },
    },
  },
  plugins: [],
}
