// Couleurs reprises du logo Mespoulet : rouge du nom, encre du dessin
tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#C42B25',
          dark:    '#A11F1A',
          soft:    '#E5554E', // rouge éclairci pour les fonds sombres
          tint:    '#FBECEA',
        },
        ink: {
          DEFAULT: '#161412',
          soft:    '#3A3531',
        },
        paper: '#FAF7F2',
        sand:  '#F1EBE1',
        line:  '#E4DCCF',
        muted: '#6B645C',
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
    },
  },
};
