/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        sm: "648px",
        md: "768px",
        lg: " 1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  darkMode: "class", // Enable dark mode with class-based switching
  plugins: [],
});
