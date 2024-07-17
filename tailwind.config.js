/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,md,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,md,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,md,mdx}",
        "./*.{js,ts,jsx,tsx,md,mdx}",
    ],
    theme: {
        extend: {
            fontSize: {
                'main-title-xl': ['16rem']
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            fontFamily: {
                inter: ['var(--font-inter)'],
                raleway: ["Raleway", "sans-serif"],
            },
            animation: {
                'highlight': 'highlight 0.5s forwards',
                'footer-expand': '0.5s forwards footer-expand'
            },
            keyframes: {
                highlight: {
                    '0%': {filter: 'invert(0)'},
                    '100%': {filter: 'invert(1)'}
                },
                'footer-expand': {
                    '0%': {transform: 'scale(1)'},
                    '100%': {transform: 'scale(1.25)'}
                }
            }
        },
    },
    plugins: [
        require('tailwind-scrollbar')({nocompatible: true, preferredStrategy: "pseudoelements"}),
        require('tailwind-scrollbar-hide'),
        require('@tailwindcss/typography'),
    ],
};
