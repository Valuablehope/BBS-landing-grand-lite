/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      keyframes: {
        scroll: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        // name: keyframes duration timing-function iteration-count
        scroll: 'scroll 25s linear infinite'
      }
    }
  },
  plugins: []
}
