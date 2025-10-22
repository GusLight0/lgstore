/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/react-app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-yellow': '#ffff00',
        'gold': {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        }
      },
      animation: {
        'fadeInUp': 'fadeInUp 0.6s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s infinite',
        'slide-in-right': 'slide-in-right 0.5s ease-out forwards',
        'shine': 'shine 2s infinite',
        'gradient-shift': 'gradientShift 3s ease infinite',
        'gradient-flow': 'gradient-flow 4s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 0 0 rgba(255, 215, 0, 0.4)',
          },
          '50%': {
            boxShadow: '0 0 0 20px rgba(255, 215, 0, 0)',
          },
        },
        'slide-in-right': {
          'from': {
            opacity: '0',
            transform: 'translateX(50px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        shine: {
          '0%': {
            backgroundPosition: '-200% 0',
          },
          '100%': {
            backgroundPosition: '200% 0',
          },
        },
        gradientShift: {
          '0%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
          '100%': {
            backgroundPosition: '0% 50%',
          },
        },
        'gradient-flow': {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
};
