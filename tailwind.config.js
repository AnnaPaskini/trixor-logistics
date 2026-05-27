/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#B32025',
        'primary-dark': '#8B1A1F',
        neutral: {
          900: '#1A1A1A',
          800: '#262626',
          700: '#4A4A4A',
          100: '#F5F5F5',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        grotesk: ['Space Grotesk', 'sans-serif'],
      }
    }
  },
  plugins: [],
}
