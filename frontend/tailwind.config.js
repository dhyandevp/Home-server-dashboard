/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#090b12',
        panel: '#121827',
        accent: '#3b82f6',
        border: '#1f2937'
      }
    }
  },
  plugins: []
};
