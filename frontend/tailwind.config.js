/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        // Redefined "gray" to perfectly match Google AI Studio's minimal premium contrast scaling
        gray: {
          50: '#F8F9FA',   // Crisp bright white background
          100: '#F1F3F4',  // Light subtle components
          200: '#E8EAED',  // Light mode borders
          300: '#DADCE0',  // Muted indicators
          400: '#BDC1C6',  // Disabled text
          500: '#9AA0A6',  // Neutral metric secondary text
          600: '#80868B',  // Paragraph text
          700: '#3C4043',  // Dark mode heavy border lines
          800: '#1E1F22',  // Premium Dark Mode Card Surfaces
          900: '#0B0E14',  // Rich Black for 2026 standard dark mode
          950: '#05070A',
        },
        // Neon tech accents
        electric: {
          blue: '#0070F3',
          purple: '#8B5CF6',
          violet: '#7C3AED',
        },
        // Upgrading basic blue to vibrant Google GenAI Neons for gradients
        blue: {
          50: '#E8F0FE',
          100: '#D2E3FC',
          300: '#8AB4F8',
          500: '#4285F4',
          600: '#1A73E8',  // Google Primary Blue
          700: '#1967D2',
          800: '#185ABC',
          900: '#174EA6',
        },
        // Enhancing greens to adopt GeeksForGeeks (#2f8d46) / ATS Success semantic colors
        green: {
          50: '#E6F4EA',
          100: '#CEEAD6',
          300: '#81C995',
          500: '#34A853',  // Google Semantic Success Green
          600: '#2f8d46',  // Exact GeeksForGeeks Code Green
          700: '#188038',
          800: '#137333',
          900: '#0D652D',
        }
      }
    },
  },
  plugins: [],
}
