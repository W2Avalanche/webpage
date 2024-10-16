const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Añade las rutas de tus archivos de React

    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        avalancheBlue: '#0080FF',
        coolWhite: '#F2F9FF',
        avalanche10: '#E8F3FF',
        fearOrange: '#FFFBF2',
        avalanche20: '#CCE6FF',
        pureBlack: '#000000',
      },
      gradientColorStops: {
        0: '#E8F3FF',
        40: '#FFFBF2',
        55: '#F2F9FF',
        100: '#CCE6FF',
      },
      fontFamily: {
        akiraBold: ['AkiraBold', 'sans-serif'],
        akiraRegular: ['AkiraRegular', 'sans-serif'],
        akiraOutline: ['AkiraOutline', 'sans-serif'],
        robotoLight: ['RobotoLight', 'sans-serif'],
      },
    },
  },
})
