/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    maxWidth: {
      '10.5': '168px',
      '20': '320px',
      '18.75': '300px'
    },
    extend: {
      spacing: {
        '-2.75rem': '-2.75rem',
      },
      width: {
        '1/15': '6.66666666%',
        '2/15': '13.33333333%',
        '13/15': '86.6666666%',
        '14/15': '93.3333333%'
      },
      height: {
        '1/10': '10%',
        '1.5/10': '15%',
        '2/10': '20%',
        '3/10': '30%',
        '4/10': '40%',
        '5/10': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%',
        '8.5/10': '85%',
        '9/,10': '90%',
      },
      boxShadow: {
        'allSide': '0px 0px 6px #aaaaaa',
      }
    },

  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
  corePlugins: {
    preflight: false,
  }
}
