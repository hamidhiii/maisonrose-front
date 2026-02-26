/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#ef3966",
        "background-light": "#f8f6f6",
        "background-dark": "#221015",
        "surface-light": "#ffffff",
        "surface-dark": "#2d1b20",
      },
      fontFamily: {
        "display": ["Roboto", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "1rem",
        "xl": "1.5rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}
