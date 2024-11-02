const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    './node_modules/@rewind-ui/core/dist/theme/styles/*.js',
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      animation: 
      {
        shimmer: "shimmer 2s linear infinite",
      spotlight: "spotlight 2s ease .75s 1 forwards",
    },
    
    keyframes: {
      shimmer: {
        from: {
          "backgroundPosition": "0 0"
        },
        to: {
          "backgroundPosition": "-200% 0"
        }
      },
      spotlight: {
        "0%": {
          opacity: 0,
          transform: "translate(-72%, -62%) scale(0.5)",
        },
        "100%": {
          opacity: 1,
          transform: "translate(-50%,-40%) scale(1)",
        },
      },
    },
  },
  },
  plugins: [addVariablesForColors,
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar')({ nocompatible: true }),
    require('@tailwindcss/forms')({
      strategy: 'class' // only generate classes
    })
  ],
  
}

function addVariablesForColors({ addBase, theme }) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

