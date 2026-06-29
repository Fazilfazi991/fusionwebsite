import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
        display: ["var(--font-roboto)", "Arial", "sans-serif"]
      },
      colors: {
        ink: "#050505",
        paper: "#ffffff",
        mist: "#f6f6f6",
        line: "#e5e5e5",
        coal: "#0a0a0a",
        muted: "#637083",
        cloud: "#f6f8fb",
        brand: "#2563eb",
        mint: "#0f9f7a",
        amber: "#d97706",
        rose: "#e11d48"
      },
      boxShadow: {
        header: "0 10px 30px rgba(0, 0, 0, 0.06)",
        soft: "0 10px 30px rgba(23, 33, 43, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
