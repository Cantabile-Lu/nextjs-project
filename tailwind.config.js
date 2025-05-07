/** @type {import('tailwindcss').Config} */
const { heroui } = require("@heroui/react");
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}",

        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            bg: "var(--background)",
            fore: "var(--foreground)",
            "shadow-md": "0px 4px 10px 0px rgba(0, 0, 0, 0.3)",
        },
    },
    plugins: [heroui({})],
};
