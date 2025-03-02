/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      8: "8px",
    },
    colors: {
      transparent: "transparent", // leave this…
      current: "currentColor", // and this…
      white: colors.white, // tenant's white colour
      black: "#000000", // tenant's darkest grey
      grey: colors.gray,

      primary: {
        25: "#f5f8ff",
        50: "#eaf1fe",
        100: "#bfd3fb",
        200: "#a0bdf9",
        300: "#759ff7",
        400: "#5a8df5",
        500: "#3170f3",
        600: "#2d66dd",
        700: "#2350ad",
        800: "#1b3e86",
        900: "#152f66",
        950: "#0b1833",
      },
      purple: {
        25: "#FAFAFF",
        50: "#F4F3FF",
        100: "#EBE9FE",
        200: "#D9D6FE",
        300: "#BDB4FE",
        400: "#9B8AFB",
        500: "#7A5AF8",
        600: "#6938EF",
        700: "#5925DC",
        800: "#4A1FB8",
        900: "#3E1C96",
        950: "#27115F",
      },
      yellow: {
        25: "#FEFDF0",
        50: "#FEFBE8",
        100: "#FEF7C3",
        200: "#FEEE95",
        300: "#FDE272",
        400: "#FAC515",
        500: "#EAAA08",
        600: "#CA8504",
        700: "#A15C07",
        800: "#854A0E",
        900: "#713B12",
        950: "#542C0D",
      },
      grayBlue: {
        25: "#F9FAFC",
        50: "#F8F9FC",
        100: "#EAECF5",
        200: "#D5D9EB",
        300: "#B3B8DB",
        400: "#717BBC",
        500: "#4E58A6",
        600: "#3E4784",
        700: "#363F72",
        800: "#293056",
        900: "#101323",
        950: "#0D0F1C",
      },
      gray: {
        25: "#FCFCFD",
        50: "#F9FAFB",
        100: "#F2F4F7",
        200: "#EAECF0",
        300: "#D0D5DD",
        400: "#98A2B3",
        500: "#667085",
        600: "#475467",
        700: "#344054",
        800: "#1D2939",
        900: "#101828",
        950: "#0C111D",
      },
      orange: {
        25: "#FEFAF5",
        50: "#FEF6EE",
        100: "#FDEAD7",
        200: "#F9DBAF",
        300: "#F7B27A",
        400: "#F38744",
        500: "#EF6820",
        600: "#E04F16",
        700: "#B93815",
        800: "#932F19",
        900: "#772917",
        950: "#5F1D14",
      },
      green: {
        500: "#008000",
      },
    },

    // changed the line height
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1.05rem" }],
      sm: ["0.875rem", { lineHeight: "1.225rem" }],
      base: ["1rem", { lineHeight: "1.4rem" }],
      lg: ["1.125rem", { lineHeight: "1.575rem" }],
      xl: ["1.25rem", { lineHeight: "1.75rem" }],
      "2xl": ["1.5rem", { lineHeight: "1.8rem" }],
      "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      "4xl": ["2.25rem", { lineHeight: "2.7rem" }],
      "5xl": ["3rem", { lineHeight: "3.6rem" }],
      "6xl": ["3.75rem", { lineHeight: "4.5rem" }],
      "7xl": ["4.5rem", { lineHeight: "1" }],
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
      fontFamily: {
        openrunde: ["Hanken Grotesk", "serif"], // Ensure fallback font

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
    },
  },
  plugins: [],
};
