/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A020',
          light: '#E8C547',
          dark: '#9B7A18',
        },
        surface: {
          DEFAULT: '#141414',
          2: '#1E1E1E',
          3: '#252525',
        },
        ink: {
          DEFAULT: '#F5F5F5',
          muted: '#9CA3AF',
          subtle: '#6B7280',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': {
            boxShadow:
              '0 0 30px rgba(201,160,32,0.15), 0 0 60px rgba(201,160,32,0.08)',
          },
          '50%': {
            boxShadow:
              '0 0 60px rgba(201,160,32,0.35), 0 0 120px rgba(201,160,32,0.18)',
          },
        },
      },
      screens: {
        xs: '375px',
      },
    },
  },
  plugins: [],
}
