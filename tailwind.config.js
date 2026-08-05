/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FFFDF6',
          100: '#FAF6E9',
          200: '#F5EFDB',
        },
        ochre: {
          DEFAULT: '#EADCB9',
          100: '#DFCDA2',
          200: '#D4BE8B',
        },
        espresso: {
          DEFAULT: '#3E2723',
          100: '#4E342E',
        }
      }
    },
  },
  plugins: [],
}