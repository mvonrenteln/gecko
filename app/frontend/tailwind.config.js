/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}', './src/**/*.{js,jsx}', './app/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0D9488',
        accent: '#1E3A8A'
      }
    }
  },
  plugins: []
};
