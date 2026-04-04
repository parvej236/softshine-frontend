/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        midnight: { 50:'#f0f9ff', 100:'#e0f2fe', 900:'#0c1a2e', 950:'#060e1a' },
        cyan: { 400:'#22d3ee', 500:'#06b6d4', 600:'#0891b2' },
        electric: { 400:'#38bdf8', 500:'#0ea5e9', 600:'#0284c7' }
      },
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.8s ease forwards',
      },
      keyframes: {
        float: { '0%,100%': { transform:'translateY(0)' }, '50%': { transform:'translateY(-20px)' } },
        glow: { from:{ textShadow:'0 0 10px #22d3ee, 0 0 20px #22d3ee' }, to:{ textShadow:'0 0 20px #38bdf8, 0 0 40px #38bdf8, 0 0 60px #38bdf8' } },
        slideUp: { from:{ opacity:'0', transform:'translateY(40px)' }, to:{ opacity:'1', transform:'translateY(0)' } },
        fadeIn: { from:{ opacity:'0' }, to:{ opacity:'1' } }
      }
    }
  },
  plugins: []
}
