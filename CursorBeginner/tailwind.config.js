/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'stock-up': '#10b981', // green-500
        'stock-down': '#ef4444', // red-500
        'dark-bg': '#0f172a', // slate-900
        'dark-card': '#1e293b', // slate-800
        'dark-border': '#334155', // slate-700
      },
    },
  },
  plugins: [],
}

