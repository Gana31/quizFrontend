/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
      mentiDisplay: ['MentiDisplay', 'sans-serif'],
      mentiText: ['MentiText', 'sans-serif'],
    },},
  },
  plugins: [],
}

