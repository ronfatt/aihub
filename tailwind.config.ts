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
        atelier: {
          bg: "#0A0C0E",        // Deep obsidian gallery space
          surface: "#111418",   // Subtle elevated surface
          card: "#15191E",      // Elevated showcase card
          cardHover: "#1A2026",
          border: "rgba(255, 255, 255, 0.08)",
          borderLight: "rgba(255, 255, 255, 0.16)",
          emerald: "#10B981",   // Modern digital emerald
          emeraldGlow: "rgba(16, 185, 129, 0.15)",
          gold: "#D4AF37",      // Haute couture gold accent
          goldLight: "rgba(212, 175, 55, 0.12)",
          text: "#F8FAFC",      // Pure optic white for headings
          secondary: "#94A3B8", // Cool slate
          muted: "#64748B",     // Subtle monospaced slate
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Plus Jakarta Sans"',
          '"Space Grotesk"',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          "system-ui",
          "sans-serif",
        ],
        mono: [
          '"SF Mono"',
          '"JetBrains Mono"',
          '"Fira Code"',
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
        serif: [
          '"Cinzel"',
          '"Songti SC"',
          '"Noto Serif SC"',
          "Georgia",
          "serif",
        ],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        widest: "0.2em",
        extreme: "0.3em",
      },
      boxShadow: {
        atelier: "0 0 0 1px rgba(255, 255, 255, 0.08), 0 20px 40px -15px rgba(0, 0, 0, 0.7)",
        glow: "0 0 30px -5px rgba(16, 185, 129, 0.25)",
        goldGlow: "0 0 30px -5px rgba(212, 175, 55, 0.2)",
      },
      maxWidth: {
        exhibition: "1380px",
      },
    },
  },
  plugins: [],
};

export default config;
