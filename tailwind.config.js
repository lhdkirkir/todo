/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'apple-blue': '#0066cc',
        'apple-red': '#ff3b30',
        'apple-gray': {
          50: '#f5f5f7',
          100: '#e5e5e7',
          500: '#86868b',
          900: '#1d1d1f',
        },
      },
    },
  },
  plugins: [],
} 