/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './client/**/*.tsx'],
  theme: {
    extend: {
      extend: {
        fontFamily: {
          heading: ['Averia Serif Libre', 'serif'],
          body: ['Quicksand', 'sans-serif'],
        },
        fontSize: {
          'heading-lg': '2.5rem',
          'heading-md': '1.5rem',
          'heading-sm': '1.2rem',
          'body-xl': '2rem',
          'body-lg': '1.125rem',
          'body-md': '1rem',
          'body-xsm': '0.5rem',
        },
        fontWeight: {
          'heading-regular': 400,
          'heading-bold': 700,
          'body-light': 300,
          'body-regular': 400,
          'body-bold': 700,
        },
      },
    },
    plugins: [],
  },
}
