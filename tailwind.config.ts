import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "var(--background-color)",
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        white: "var(--white)",
      },
      container: {
        center: true,
        padding: "10px",
        screens: {
          sm: "100%",
          md: "808px",
          lg: "1064px",
          xl: "1320px",
        },
      },
      boxShadow: {
        strong: "4px 4px 4px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
} satisfies Config;
