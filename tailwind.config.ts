import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["var(--font-rubik)", ...defaultTheme.fontFamily.sans],
        roboto: ["var(--font-roboto)", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        heading: "24px",
      },
      borderRadius: {
        card: "2rem",
      },
      // Named by purpose, so components never pick a raw shade.
      colors: {
        background: "#121212", // page background
        foreground: {
          DEFAULT: "#ededed", // default text
          soft: "#e5e7eb", // birthday input text; not yet confirmed in Figma
        },
        surface: "#232323", // cards
        chip: "#252525", // small pill buttons (e.g. "Skip")
        tile: "#383838", // icon tile buttons (social login)
        field: {
          DEFAULT: "#2c2c2c", // input background
          alt: "#1e1e1e", // search input background
        },
        subtle: "#747474", // field borders, dividers, quiet text
        muted: "#a5a5a5", // secondary text
        hint: "#6b7280", // birthday placeholders and separators; not yet confirmed in Figma
        focus: "rgba(255, 255, 255, 0.87)", // focused input border
        primary: {
          DEFAULT: "#f29f05",
          hover: "#e39300",
          foreground: "#232323",
        },
        secondary: {
          DEFAULT: "#252317",
          border: "#875f16",
          foreground: "#f29f05",
        },
        danger: "#c23737",
        success: "#3b9c00",
      },
    },
  },
  plugins: [],
} satisfies Config;
