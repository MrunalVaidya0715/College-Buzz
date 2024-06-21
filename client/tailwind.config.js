/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'xs': '364px',
      }
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};
