/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{html,js,ts,jsx,tsx}',
    './components/**/*.{html,js,ts,jsx,tsx}',
    // Add other paths to files containing Tailwind classes
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff49db',
        secondary: '#6c757d',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      // Extend other theme properties as needed
    },
  },
  plugins: [
    // Add Tailwind CSS plugins here
  ],
};