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
        // Primary Colors
        "primary-100": "var(--primary-100)",
        "primary-200": "var(--primary-200)",
        "primary-300": "var(--primary-300)",
        "primary-400": "var(--primary-400)",
        "primary-500": "var(--primary-500)",
        "primary-600": "var(--primary-600)",
        "primary-700": "var(--primary-700)",
        "primary-800": "var(--primary-800)",
        "primary-900": "var(--primary-900)",

        // Accent Colors - Notification
        "accent-notification-500": "var(--accent-notification-500)",
        "accent-notification-600": "var(--accent-notification-600)",
        "accent-notification-700": "var(--accent-notification-700)",
        "accent-notification-800": "var(--accent-notification-800)",
        "accent-notification-900": "var(--accent-notification-900)",

        // Accent Colors - Danger
        "accent-danger-500": "var(--accent-danger-500)",
        "accent-danger-600": "var(--accent-danger-600)",
        "accent-danger-700": "var(--accent-danger-700)",
        "accent-danger-800": "var(--accent-danger-800)",
        "accent-danger-900": "var(--accent-danger-900)",

        // Accent Colors - Warning
        "accent-warning-500": "var(--accent-warning-500)",
        "accent-warning-600": "var(--accent-warning-600)",
        "accent-warning-700": "var(--accent-warning-700)",
        "accent-warning-800": "var(--accent-warning-800)",
        "accent-warning-900": "var(--accent-warning-900)",

        // Accent Colors - Positive
        "accent-positive-500": "var(--accent-positive-500)",
        "accent-positive-600": "var(--accent-positive-600)",
        "accent-positive-700": "var(--accent-positive-700)",
        "accent-positive-800": "var(--accent-positive-800)",
        "accent-positive-900": "var(--accent-positive-900)",
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
