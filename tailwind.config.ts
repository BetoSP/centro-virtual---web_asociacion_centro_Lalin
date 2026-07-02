import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta del diseño MVP
        ink: "#1C2321",
        atlantic: "#0E2A38",
        "atlantic-2": "#153447",
        green: "#3F6B4A",
        "green-dark": "#2E5138",
        gold: "#C9A227",
        black: "#141414",
        granite: "#6E6A5E",
        "granite-light": "#B9B3A4",
        paper: "#F6F4EE",
        "paper-2": "#EAE4D4",
        line: "#DCD6C6",
        terracotta: "#B4502E",
        "terracotta-dark": "#8B4A2E",
        "gold-2": "#D9B23C",
        "paper-warm": "#FAF7F0",
        "grey-1": "#4A473E",
        "grey-2": "#9C978A",
        "grey-3": "#E4DECD",
        "grey-4": "#EDE8D9",
        "header-dark": "#081720",
        "portal-blue": "#003B73",
        "portal-blue-bright": "#0066CC",
        "portal-gold": "#C8A96B",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-work-sans)", "sans-serif"],
        mono: ["var(--font-ibm-plex)", "monospace"],
      },
      maxWidth: {
        container: "1180px",
      },
      borderRadius: {
        btn: "8px",
        "card-sm": "10px",
        "card-lg": "12px",
        frame: "16px",
      },
      boxShadow: {
        frame: "0 30px 70px rgba(14,42,56,0.18)",
        card: "0 4px 16px rgba(14,42,56,0.08)",
        "card-lg": "0 10px 26px rgba(14,42,56,0.2)",
        glass: "0 16px 40px rgba(0,0,0,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
