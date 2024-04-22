/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "mainColor": "#FFAF38", // 메인 컬러 주황색
      }
    },
  },
  plugins: [],
}

