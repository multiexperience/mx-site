/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.tsx"
  ],
  theme: {
    extend: {
      screens: {
        'xs': '375px'
      },
      colors: {
        'mx-cyan': '#1dffff',
        'mx-pink': "#ff004f"
      }
    },
  },
  plugins: [],
}