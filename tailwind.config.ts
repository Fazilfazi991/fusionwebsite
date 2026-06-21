import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
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
        coal: "#0a0a0a"
      },
      boxShadow: {
        header: "0 10px 30px rgba(0, 0, 0, 0.06)"
      }
    }
  },
  plugins: []
};

export default config;
