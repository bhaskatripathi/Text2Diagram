/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1360px",
      },
    },
    extend: {
      backgroundColor: {
        'dark-background': '#1a202c', // Replace with your desired background color
      },
      textColor: {
        'dark-text': '#f7fafc', // Replace with your desired text color
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark'],
      textColor: ['dark'],
    },
  },
  plugins: [],
  darkMode: 'class', // or 'media'
};
