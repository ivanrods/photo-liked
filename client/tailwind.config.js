/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        // Adicionando a animação personalizada
        rotating: 'is-rotating 1s linear infinite',
      },
      keyframes: {
        // Definindo os keyframes personalizados
        'is-rotating': {
          to: {
            transform: 'rotate(1turn)', // Gira 360 graus (1 volta completa)
          },
        },
      },
    },
  },
  plugins: [],
};