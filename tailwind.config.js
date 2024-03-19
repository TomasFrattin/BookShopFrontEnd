/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: { 
        custom1: "#333",
        custom2: "#1a1a1a",
      },
    },
  },
  plugins: [],
};
