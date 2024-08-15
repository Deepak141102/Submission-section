/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'gray-white': 'linear-gradient(45deg, #7272cd, #fffc78fa)',
        'gray-white-trans': 'linear-gradient(5deg, #464646, #6d6d6d)',
        // 'removebg': "url('/images/istockphoto-1472514703-612x612.jpg')"
        'removebg': "url('/images/hh.svg')",
        'bg-img': "url('/images/img.svg')",
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
        leagueSpartan: ['League Spartan', 'sans-serif'],
        // Add more custom fonts here
      },
    },
  },
  plugins: [],
};
