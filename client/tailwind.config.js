/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        detective: {
          dark: '#0B0F14',
          subtle: '#121923',
          card: '#18212D',
          border: '#293444',
          accent: '#D94B4B',
          amber: '#D6A85F',
          light: '#F3F4F6',
          muted: '#9CA3AF',
        }
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
