/** @type {import('tailwindcss').Config} */
export default {
 content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  "node_modules/flowbite-react/lib/esm/**/*.js",
 ],
 theme: {
  extend: {
   screens: {
    "4xl": "1440px",
    "5xl": "1600px",
    "6xl": "1920px",
    "7xl": "2560px",
    "8xl": "3200px",
    "9xl": "3840px",
   },
  },
 },
 plugins: [
  require("flowbite/plugin"),
  require("tailwind-scrollbar")
 ],
};
