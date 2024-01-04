/** @type {import('tailwindcss').Config} */
/* eslint no-undef: 0 */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        purple: {
          light: "#A8A4FF",
          DEFAULT: "#635FC7",
        },
        red: {
          light: "#FF9898",
          DEFAULT: "#EA5555",
        },
        black: "#000112",
        gray: {
          "very-light": "#F4F7FD",
          light: "#E4EBFA",
          DEFAULT: "#828FA3",
          dark: "#3E3F4E",
          "very-dark": "#2B2C37",
          "super-dark": "#20212C",
        },
      },
      fontSize: {
        "b-md": [
          "0.75rem",
          {
            fontWeight: "700",
          },
        ],
        "b-lg": [
          "0.8125rem",
          {
            lineHeight: "1.4375rem",
            fontWeight: "500",
          },
        ],
        "h-sm": [
          "0.75rem",
          {
            letterSpacing: "2.4px",
            fontWeight: "700",
          },
        ],
        "h-md": [
          "0.9375rem",
          {
            lineHeight: "1.1875rem",
            fontWeight: "700",
          },
        ],
        "h-lg": [
          "1.125rem",
          {
            lineHeight: "1.4375rem",
            fontWeight: "700",
          },
        ],
        "h-xl": [
          "1.5rem",
          {
            lineHeight: "1.875rem",
            fontWeight: "700",
          },
        ],
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
      transitionDuration: {
        250: "250ms",
      },
      transitionDelay: {
        310: "310ms",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-in": {
          from: {
            transform: `translateX(-100%)`,
          },
          to: {
            transform: `translateX(0px)`,
          },
        },
        "slide-out": {
          from: {
            transform: `translateX(0px)`,
          },
          to: {
            transform: `translateX(-100%)`,
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in": "slide-in 0.5s ease-out forwards",
        "slide-out": "slide-out 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
