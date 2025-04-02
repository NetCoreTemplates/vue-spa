const defaultTheme = require('tailwindcss/defaultTheme')
const { colors } = defaultTheme

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    './*.ts',
    "./src/**/*.{vue,js,ts,jsx,tsx,md}",
    "./node_modules/@servicestack/vue/dist/servicestack-vue.mjs",
  ],
  theme: {
    extend: {
      // https://github.com/tailwindlabs/tailwindcss-typography
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'pre': {
              overflowX: 'auto',
              maxWidth: 'calc(100vw - 1rem)'
            },
            code: {
              color: theme('colors.blue.500'),
              backgroundColor: theme('colors.blue.50'),
              fontWeight: 'normal',
              borderRadius: '.25rem',
              padding: '.25em .5rem',
            },
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            },
          }
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
