/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    options: {
      safelist: [],
    },
  },
  content: ["./src/**/*.tsx"],
  safelist: ["bg-[#59657D]", "bg-[#DC143C]", "bg-[#1F3E93]"],
  theme: {
    extend: {
      fontFamily: {
        sans: "'Anek Bangla', sans-serif",
        serif: "'Stoke', serif",
      },
      colors: {
        blue: {
          500: "#006DD6",
          900: "#003669",
          darker: "#00274C",
        },
        gray: {
          900: "#1F1D2B",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
