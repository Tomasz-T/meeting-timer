/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'button': '0 2px 4px rgba(0,0,0,0.05)',
      },
      borderRadius: {
        'xl': '1rem',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'timer': ['Aurulent Sans Mono', 'monospace'],
      },
    },
  },
  plugins: [],
} 