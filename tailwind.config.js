/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
      },
      colors: { 
        custom1: "#333",
        custom2: "#1a1a1a",
      },
      boxShadow:{
        'spotlight': '0 0 150px 80px rgba(255, 255, 255, 0.3)',
      }
    },
  },
  plugins: [],
};
