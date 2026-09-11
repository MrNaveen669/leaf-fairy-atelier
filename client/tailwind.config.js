/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: '#10261D',
        botanical: '#18382B',
        ivory: '#F6F1E7',
        parchment: '#ECE4D7',
        warmwhite: '#FCFAF6',
        charcoal: '#252822',
        brass: '#A78A54',
        sage: '#8E9C87',
        clay: '#A59280',
        cream: '#F1EADC',
        card: '#252822',
        border: 'rgba(241, 234, 220, .18)',
        muted: '#B5B0A5'
      },
      fontFamily: { display:['Cormorant Garamond','serif'], sans:['Inter','sans-serif'] }
    }
  }, plugins: []
};
