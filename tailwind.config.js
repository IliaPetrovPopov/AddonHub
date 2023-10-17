/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx}",
    // "node_modules/daisyui",
  ],
  theme: {
    extend: {},
  },
  // darkMode: 'media',
  plugins: [import("flowbite/plugin"), import("daisyui")],
};
