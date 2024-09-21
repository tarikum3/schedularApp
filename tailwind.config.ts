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
        "primary-100": "var(--primary-100)",
        "primary-300": "var(--primary-300)",
        "primary-500": "var(--primary-500)",
        "primary-900": "var(--primary-900)",
        "primary-700": "var(--primary-700)",
      },
      boxShadow: {
        "outline-normal": "0 0 0 2px var(--primary-300)",
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
