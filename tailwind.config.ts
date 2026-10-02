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
        palette: {
          // Deep Charcoal Dark Grays
          bg: "#111215",        // Smoked Charcoal Canvas
          surface: "#181A20",   // Elevated Dark Gray
          card: "#1E2129",      // Dark Gray Card
          cardHover: "#262A34",
          border: "rgba(255, 255, 255, 0.09)",
          borderLight: "rgba(255, 255, 255, 0.18)",
          muted: "#88909D",     // Secondary Cool Slate Gray
          subtle: "#5A6270",

          // Imperial Cinnabar Red
          red: "#D92638",       // Haute Couture Crimson Red
          redHover: "#B91C2D",
          redGlow: "rgba(217, 38, 56, 0.22)",

          // Haute Burnished Gold
          gold: "#D4AF37",      // Antique Champagne Gold
          goldHover: "#C49E28",
          goldLight: "rgba(212, 175, 55, 0.14)",
          goldGlow: "rgba(212, 175, 55, 0.25)",

          // Pure Optical White (a touch of white for accents & punchy contrast)
          white: "#FFFFFF",
          whiteSoft: "#F3F4F6",
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
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        widest: "0.2em",
        extreme: "0.3em",
      },
      boxShadow: {
        atelier: "0 0 0 1px rgba(255, 255, 255, 0.08), 0 20px 40px -15px rgba(0, 0, 0, 0.7)",
        redGlow: "0 0 35px -5px rgba(217, 38, 56, 0.35)",
        goldGlow: "0 0 35px -5px rgba(212, 175, 55, 0.3)",
      },
      maxWidth: {
        exhibition: "1380px",
      },
    },
  },
  plugins: [],
};

export default config;
