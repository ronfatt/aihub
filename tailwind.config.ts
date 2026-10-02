import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#F5F6F8", // Light cool gray background
        surface: "#FFFFFF", // Clean white card surface
        heading: "#17212B", // Primary text
        muted: "#5E6977", // Secondary text
        brand: {
          green: "#173D35", // Deep ink green
          "green-hover": "#1F4E44",
          "green-light": "#E9EFEA",
          gold: "#9E824F", // Subtle restrained gold
          border: "#E2E5EB", // Clean subtle border
          "border-subtle": "#ECEEF2",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          '"Noto Sans SC"',
          "system-ui",
          "sans-serif",
        ],
        serif: [
          '"Songti SC"',
          '"Noto Serif SC"',
          '"Source Han Serif SC"',
          "Georgia",
          "serif",
        ],
      },
      boxShadow: {
        card: "0 1px 3px rgba(15, 23, 42, 0.05), 0 1px 2px rgba(15, 23, 42, 0.03)",
        hover: "0 8px 24px -4px rgba(15, 23, 42, 0.08), 0 2px 6px -1px rgba(15, 23, 42, 0.04)",
        modal: "0 24px 48px -12px rgba(15, 23, 42, 0.18)",
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
