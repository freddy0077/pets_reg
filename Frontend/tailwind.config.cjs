/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderColor: {
        'fdbc0e': '#fdbc0e',
      },
      backgroundColor: {
        'fdbc0e20': 'rgba(253, 188, 14, 0.2)',  // Assuming 20% opacity
        'fdbc0e': '#fdbc0e',
        'e84f25': '#e84f25'
      },
      textColor: {
        'fdbc0e': '#fdbc0e',
        'e84f25': '#e84f25'
      },
      colors: {
        gold: {
          '500': '#FFD700',
          '700': '#CBA135'
        }
      }
    }
  },
  plugins: [],
});
