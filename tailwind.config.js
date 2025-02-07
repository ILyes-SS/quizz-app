/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#000000',
        'background': '#ffffff',
        'primary': '#9d74f6',
        'secondary': '#746CF6',
        'accent': '#74F6D8',
       },
       fontFamily: {
        heading: 'Poppins',
        body: 'Roboto',
      },
    },
  },
  plugins: [],
}

