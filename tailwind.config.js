/** @type {import('tailwindcss').Config} */
export default {
  content: {
    sources: [
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    negated: []
  },
  theme: {
    extend: {},
  },
  plugins: [],
} 