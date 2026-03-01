import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        luxury: "#111111",
        gold: "#C9A227",
        stone: "#E5E5E5",
      },
    },
  },
  plugins: [],
};

export default config;
