/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        base: '#242038',
        primary: '#9067C6',
        secondary: '#8D86C9',
        tertiary: '#CAC4CE',
        quartiary: '#F7ECE1',
        pinky: '#deacff',
        white: '#FFFFFF',
        black: '#000000',
        codeBlock: '#282c34',
        grey: '#CAC4CE',
      },
      fontFamily: {
        mono: ['monospace'],
      },
    },
  },
  plugins: [],
};
