import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: ["outline-none"],
  theme: {
    extend: {
      maxWidth: {
        "8xl": "1920px",
      },
      colors: {
        primary: "var(--primary)",
        "primary-2": "var(--primary-2)",
        "primary-3": "var(--primary-3)",
        secondary: "var(--secondary)",
        "secondary-2": "var(--secondary-2)",
        "secondary-3": "var(--secondary-3)",
      },
      boxShadow: {
        "outline-normal": "0 0 0 2px var(--primary-2)",
        magical:
          "rgba(0, 0, 0, 0.02) 0px 30px 30px, rgba(0, 0, 0, 0.03) 0px 0px 8px, rgba(0, 0, 0, 0.05) 0px 1px 0px",
      },
      lineHeight: {
        "extra-loose": "2.2",
      },
      scale: {
        120: "1.2",
      },
    },
  },
  plugins: [],
};
export default config;
