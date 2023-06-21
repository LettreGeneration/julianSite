/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        forma: ["forma-djr-display", "sans-serif"],
        futura: ['futura', 'sans-serif'],
        avenir: ['avenir', 'sans-serif'],
        avenirNext: ['avenirNext', 'sans-serif'],
        helvetica : ['Helvetica Rounded LT Std', "sans-serif"],
                                                
      }
    },
  },
  plugins: [],
}

