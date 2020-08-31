const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      boxShadow: theme => ({
        'outline-big': `0 0 0 10px ${theme('colors.primary.100')}`
      }),
      fontFamily: {
        sans: [
          'Nunito',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      colors : {
        primary: colors[process.env.REACT_APP_THEME_COLOR],
      }
    },
  },
  variants: {
    padding: ['responsive', 'last'],
    textColor: ['responsive', 'hover', 'focus', 'disabled'],
  },
  future: {
    removeDeprecatedGapUtilities: true,
  },
}
