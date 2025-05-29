/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      8: "8px",
    },

    // changed the line height
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.75rem",
      "4xl": "2rem",
      "5xl": "2.5rem",
      "6xl": "3rem",
      "7xl": "3.5rem",
    },

    // amend these values to suit the chosen font
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      black: "800",
    },

    screens: {
      "2xs": "320px",
      xs: "420px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1536px",
      "4xl": "1920px",
    },
    extend: {
      colors: {
        transparent: "transparent", // leave this…
        current: "currentColor", // and this…
        white: colors.white, // tenant's white colour
        black: "#000000", // tenant's darkest grey
        // warning: "#C64242", // tenant's warning colour
        gray: {
          50: "#FFFFFF",
          100: "#F5F6F7",
          150: "#DCE0E5",
          200: "#BDC5D1",
          250: "#2E2E38",
          300: "#7F8C9F",
          400: "#414F62",
          500: "#17171C",
          600: "#0E0E11",
        },
        primary: {
          50: "#1B1737",
          100: "#2A188B",
          200: "#5A42DE",
          300: "#8674E7",
          400: "#C2BAF3",
          500: "#E8E5FA",
        },
        secondary: "#A42600",
        success: {
          500: "#26902B",
          400: "#173719",
          300: "#EDFEEC",
        },

        error: {
          500: "#C64242",
          400: "#FEECEC",
          300: "#371717",
        },

        warning: {
          500: "#E79A23",
          400: "#372A17",
          300: "#FEF7EB",
        },

        info: {
          500: "#EBF2FF",
          400: "#172337",
          300: "#387DF4",
        },
      },
      lineHeight: {
        DEFAULT: "1.5",
      },
      fontFamily: {
        hk: ["Hanken Grotesk", "serif"], // Ensure fallback font
      },

      zIndex: {
        "-1": "-1",
        100: 100,
        1000: 1000,
      },
      spacing: {
        // change 863 to whatever half of the max content width you want for wide screens is
        contained: "calc(50vw - 863px)",
        fullheight: "calc(var(--vh, 1vh) * 100)", // --vh var set on html tag by setDocHeight() in app.js
        gutter: "5vw",
        13: "3.125rem",
        15: "3.75rem",
        18: "4.5rem",
        19: "4.75rem",
        22: "5.5rem",
        25: "6.25rem",
        75: "18.75rem",
        114: "28.5rem",
        125: "31.25rem",
      },
      boxShadow: {
        rectangle: "-32.5195px 32.5195px 54.1992px rgba(0, 0, 0, 0.25)",
      },
      backgroundImage: {
        gradientRectangle:
          "linear-gradient(247.18deg,rgba(17, 2, 101, 0.4) 0%,rgba(3, 33, 81, 0) 99.4%)",
      },
    },
  },
  plugins: [],
};
