import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: 'none', // Allow text to take up container width
                        color: '#374151', // gray-700
                        p: {
                            marginTop: '1.5em',
                            marginBottom: '1.5em',
                            lineHeight: '1.8', // Comfortable reading for CJK
                            fontSize: '1.125rem', // 18px
                        },
                        h1: {
                            marginTop: '2em',
                            marginBottom: '1em',
                            fontWeight: '700',
                        },
                        h2: {
                            marginTop: '1.5em',
                            marginBottom: '0.75em',
                            fontWeight: '600',
                        },
                        li: {
                            marginTop: '0.5em',
                            marginBottom: '0.5em',
                        },
                    },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
};
export default config;
