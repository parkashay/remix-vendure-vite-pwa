/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
  mode: 'jit',
  content: ['./app/**/*.{ts,tsx}'],
  important: '#app',

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7300e6',
          50: '#b366ff',
          100: '#a64dff',
          200: '#9933ff',
          300: '#8c1aff',
          400: '#8000ff',
          500: '#7300e6',
          600: '#6600cc',
          700: '#5900b3',
          800: '#4d0099',
          900: '#400080',
        },
        secondary: {
          DEFAULT: '#C38C9F',
          50: '#f6eef1',
          100: '#e5cdd5',
          200: '#d3abb9',
          300: '#c28a9d',
          400: '#b06881',
          500: '#974f68',
          600: '#753d51',
          700: '#542c3a',
          800: '#321a23',
          900: '#11090c',
        },

        brand: '#414141',
        grey: {
          1: '#E0E0E0',
          10: '#858585',
          12: '#171717',
        },
        icon: {
          DEFAULT: '#5C5F62',
          disabled: '#BABEC3',
          pressed: '#44474A',
        },
        selected: {
          DEFAULT: '#F2F7FE',
        },
        surface: {
          subdued: '#FAFBFB',
          pressed: '#F1F2F3',
        },
      },

      textColor: {
        DEFAULT: '#202223',
        subdued: '#6D7175',
        disabled: '#8C9196',
      },

      backgroundColor: {
        pressed: '#EDEEEF',
      },
      borderColor: {
        DEFAULT: '#8C9196',
        default: '#8C9196',
        subdued: '#C9CCCF',
        depressed: '#575959',
        hovered: '#999EA4',
      },
      zIndex: {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
      },
      maxWidth: {
        '8xl': '1480px',
      },
      fontFamily: {
        sans: ['DM Sans', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        dropIn: 'dropIn 0.2s ease-out',
      },
      keyframes: {
        dropIn: {
          '0%': { transform: 'translateY(-100px)' },
          '100%': { transform: 'translateY(0)' },
        },
        // scroll: {
        //   '0%': {
        //     transform: 'translate3d(0, 0, 0)' /* The image container height */,
        //   },
        //   '100%': {
        //     transform:
        //       'translate3d(-1440px, 0 , 0)' /* The image container width: 240*6 */,
        //   },
        // },
      },
    },
  },
};
