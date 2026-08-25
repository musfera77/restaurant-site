/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C41E3A',
          dark: '#8B0000',
          light: '#E04560',
          50: '#FBF0F2',
          100: '#F8E0E4',
          200: '#F0B8C0',
          300: '#E68494',
          400: '#DC5167',
          500: '#C41E3A',
          600: '#A01830',
          700: '#7A1224',
          800: '#540C18',
          900: '#2E0710',
        },
        accent: {
          DEFAULT: '#F5A623',
          dark: '#D4881A',
          light: '#FAC56B',
        },
        whatsapp: {
          DEFAULT: '#3fbf67',
          dark: '#35a758',
        },
        ink: {
          DEFAULT: '#1a1a1a',
          soft: '#2d2d2d',
          muted: '#6b6b6b',
          faint: '#9a9a9a',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease forwards',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
