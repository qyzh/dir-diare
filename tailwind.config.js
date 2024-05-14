/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', 
    './content/**/*.mdx',
    './public/**/*.svg', 
    '.app/components/**.{js,ts,jsx,tsx,mdx}',
  ],
    theme: {
      extend: {
        animation: {
          spotlight: "spotlight 2s ease .75s 1 forwards",
        },
        keyframes: {
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
        fontFamily: {
          sans: ['var(--font-geist-sans)'],
          mono: ['var(--font-geist-mono)'],
        },
        typography: {
          quoteless: {
            css: {
              'blockquote p:first-of-type::before': { content: 'none' },
              'blockquote p:first-of-type::after': { content: 'none' },
            },
          },
        },
      },
    },
    future: {
      hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/typography')],
}

