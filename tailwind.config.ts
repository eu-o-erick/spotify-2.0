import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "500px",
      },
      colors: {
        main: "var(--background-color)",
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        white: "var(--white)",
      },
      container: {
        center: true,
        screens: {
          sm: "100%",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
        },
      },
      boxShadow: {
        strong: "4px 4px 4px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
} satisfies Config;
