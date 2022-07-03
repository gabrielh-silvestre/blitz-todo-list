/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#FEFEFE",
        details: "#EE5244",
        "primary-text": "#1F1F1F",
        "secondary-text": "#575757",
        hover: "#F2F2F2",
      },
    },
  },
  plugins: [],
};
