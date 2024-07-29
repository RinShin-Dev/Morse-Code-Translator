import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        morserera: ['Signika', 'sans-serif']
      }
    }
  },
  daisyui: {
    themes: [
      {
        'cheesy-dark': {
          primary: '#ffe320',
          secondary: '#fbb630',
          accent: '#d87500',
          neutral: '#44403c',
          'base-100': '#292524',
          info: '#a5f3fc',
          success: '#6ee7b7',
          warning: '#fcd34d',
          error: '#f87171'
        }
      }
    ]
  },
  plugins: [daisyui]
}
