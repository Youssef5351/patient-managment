/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        tajawal: ['Tajawal', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      keyframes: {
        'fade-in-out': {
          '0%, 100%': { opacity: '0' },
          '10%, 90%': { opacity: '1' },
        }
      },
      animation: {
        'fade-in-out': 'fade-in-out 3s ease-in-out',
      }
    },
  },
  plugins: [],
}