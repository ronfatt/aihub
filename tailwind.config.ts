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
        bg: {
          warm: "#F7F5F0",
          card: "#FFFFFF",
          subtle: "#EFECE4",
        },
        brand: {
          green: "#173D35",
          "green-hover": "#1E4D43",
          "green-light": "#E9EFEA",
          gold: "#B49761",
          "gold-light": "#F5EFE3",
          "gold-hover": "#9E824F",
          text: "#252925",
          muted: "#666B66",
          border: "#E2DDD3",
          "border-subtle": "#ECE7DC",
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
          "SimSun",
          "STSong",
          "Georgia",
          "serif",
        ],
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(23, 61, 53, 0.04)",
        card: "0 4px 20px -2px rgba(23, 61, 53, 0.06), 0 2px 6px -1px rgba(23, 61, 53, 0.03)",
        hover: "0 12px 30px -4px rgba(23, 61, 53, 0.1), 0 4px 12px -2px rgba(23, 61, 53, 0.05)",
        modal: "0 20px 40px -8px rgba(23, 61, 53, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
