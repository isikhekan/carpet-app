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
        '-0.5rem' : '-0.5rem',
        '-1rem' : '-1rem',
        '-0.75rem':' -0.75rem',
        '-0.25rem' : '-0.25rem',
        '1/2.2': '45%',
        '1/5':'20%',
        '1/8':'12.5%',
        '1/6':'16.6666%'
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
        '2.5/10': '25%',
        '3/10': '30%',
        '4/10': '40%',
        '5/10': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '7.5/10': '75%',
        '8/10': '80%',
        '8.5/10': '85%',
        '9/,10': '90%',
      },
      boxShadow: {
        'allSide': '0px 0px 40px #0f0f0f',
      },
      colors: {
        'teal': '#59D7EE',
        'tiffany-blue': '#9DE3F6',
        'baby-blue':'#D3F4FB',
        'blue-green':'#53DFD1'

      },
      minHeight: {
        '3/4': '75%',
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
