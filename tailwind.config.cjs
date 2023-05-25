module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './public/index.html'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        basic: {
          100: '#B9F3FC',
          200: '#AEE2FF',
          300: '#93C6E7',
          400: '#FEDEFF',
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}