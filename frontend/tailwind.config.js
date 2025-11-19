/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00796b',
        accent: '#ffb74d',
      },
    },
  },
  plugins: [],
};

