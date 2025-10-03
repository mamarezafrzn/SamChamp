import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["var(--font-rubik)", ...fontFamily.sans],
        roboto: ['var(--font-roboto)', ...fontFamily.sans],
      },
      colors: {
        "black-rich": "#121212",
        "yellow-sun": "rgba(242, 159, 5, 1)",
        "yellow-sun-dark" : "rgba(227, 147, 0, 1)",
        "yellow-dark" : "rgba(135, 95, 22, 1)",
        "brown-umber" : "rgba(37, 35, 23, 1)",
        "grey-dark" : "rgba(30, 30, 30, 1)",
        "grey-charcoal": "rgba(35, 35, 35, 1)",
        "grey-smoke": "rgba(44, 44, 44, 1)",
        "grey-slate": "rgba(56, 56, 56, 1)",
        "grey-silver": "rgba(116, 116, 116, 1)",
        "grey-onyx" : "rgba(37, 37, 37, 1)",
        "white-ash": "rgba(165, 165, 165, 1)",
        "green-success": "#3B9C00",
        "red-error" : "rgba(194, 55, 55, 1)",
      },
      width: {
        "fill-available": "-webkit-fill-available",
      },
    },
  },
  plugins: [],
} satisfies Config;