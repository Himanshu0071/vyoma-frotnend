import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: "#F7F8FC",
          dark: "#060816",
        },

        card: {
          light: "#FFFFFF",
          dark: "#0D1324",
        },

        primary: {
          blue: "#7C8CFF",
          purple: "#C084FC",
          orange: "#FFB38A",
        },
      },

      boxShadow: {
        soft: "0 10px 40px rgba(0,0,0,0.08)",
      },

      borderRadius: {
        xl2: "1.5rem",
      },

      backgroundImage: {
        hero:
          "linear-gradient(to right, #7C8CFF, #C084FC, #FFB38A)",
      },
    },
  },
  plugins: [],
};

export default config;