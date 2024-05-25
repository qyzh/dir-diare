/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', 
    '.app/components/**.{js,ts,jsx,tsx,mdx}',
  ],
    theme: {
      extend: {
        animation: {
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
    plugins: [
      require('@tailwindcss/typography')],
}

