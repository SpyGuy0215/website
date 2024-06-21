/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      animation:{
        'highlight': 'highlight 0.5s forwards',
      },
      keyframes:{
        highlight: {
          '0%': {filter: 'invert(0)'},
          '100%': {filter: 'invert(1)'}
        },
      }
    },
  },
  plugins: [],
};
