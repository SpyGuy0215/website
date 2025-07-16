// tailwind.config.js
import {heroui} from "@heroui/react";

/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,md,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,md,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,md,mdx}",
        "./*.{js,ts,jsx,tsx,md,mdx}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
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
            colors: {
                'quasar-dark': '#1a1a1a',
                'quasar-dark-border': '#333333',
            },
            fontFamily: {
                inter: ['var(--font-inter)'],
                raleway: ["Raleway", "sans-serif"],
                poppins: ['var(--font-poppins)'],
                ubuntu: ['var(--font-ubuntu)'],
            },
            animation: {
                highlight: 'highlight 0.5s forwards',
                'footer-expand': '0.5s forwards footer-expand',
                shine: 'shine 5s linear infinite',
            },
            keyframes: {
                highlight: {
                    '0%': {filter: 'invert(0)'},
                    '100%': {filter: 'invert(1)'}
                },
                'footer-expand': {
                    '0%': {transform: 'scale(1)'},
                    '100%': {transform: 'scale(1.25)'}
                },
                shine: {
                    '0%': {'background-position': '100%'},
                    '100%': {'background-position': '-100%'},
                },
            },
            transition: {
                width: 'width'
            }
        },
    },
    darkMode: "class",
    plugins: [heroui({})]
}

export default config;