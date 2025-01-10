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
    animation: {
      animloader: "animloader 0.3s linear infinite alternate",
    },
    keyframes: {
      animloader: {
        "0%": { height: "48px" },
        "100%": { height: "4px" },
      },
    },
  },
  plugins: [],
}

