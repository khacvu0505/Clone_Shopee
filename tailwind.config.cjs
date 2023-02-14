/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // Trong corePlugins sẽ là remove class đó trong tailwind css
  corePlugins: {
    container: false
  },
  theme: {
    extend: {
      colors: {
        orange: '#ee4d2d',
        white: '#fff'
      }
    }
  },
  // Chỗ này là tạo class mới với style mình mong muốn
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities, theme }) {
      addComponents({
        '.container': {
          maxWidth: theme('columns.7xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4')
        }
      })
    }),
    require('@tailwindcss/line-clamp')
  ]
}
