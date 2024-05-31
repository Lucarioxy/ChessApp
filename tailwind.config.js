/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/src/Components/lobbypage/images/chess_image5.jpg')",
      }
  },
},
  plugins: [],   
}

// theme: {
//   extend: {
//     backgroundImage: {
//       'custom-bg': "url('/src/assets/images/background.jpg')",
//     }
//   },
// },