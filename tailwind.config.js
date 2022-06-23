/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: "'Anek Bangla', sans-serif",
        serif: "'Stoke', serif"
      },
      colors: {
        blue: {
          500: '#006DD6',
          900: '#003669'
        },
        gray: {
          900: '#1F1D2B'
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
