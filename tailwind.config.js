import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

module.exports = {
  content: [
    './app/**/*.{ts,tsx}', 
    './content/**/*.mdx',
    './public/**/*.svg', 
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
    theme: {
      extend: {
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
    plugins: [typography],
}

