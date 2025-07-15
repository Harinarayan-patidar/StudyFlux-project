const { heroui } = require('@heroui/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@heroui/theme/dist/components/(card|ripple).js"
  ],
  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      "edu-sa": ["Edu SA Beginner", "cursive"],
      mono: ["Roboto Mono", "monospace"],
    },
    colors: {
      white: "#FFFFFF",
      black: "#000000",
      transparent: "transparent",

      gray: {
        50: "#F9FAFB", 100: "#F3F4F6", 200: "#E5E7EB", 300: "#D1D5DB", 400: "#9CA3AF", 500: "#6B7280", 600: "#4B5563", 700: "#374151", 800: "#1F2937", 900: "#111827"
      },
      red: {
        50: "#FEF2F2", 100: "#FEE2E2", 200: "#FECACA", 300: "#FCA5A5", 400: "#F87171", 500: "#EF4444", 600: "#DC2626", 700: "#B91C1C", 800: "#991B1B", 900: "#7F1D1D"
      },
      yellow: {
        50: "#FFFBEB", 100: "#FEF3C7", 200: "#FDE68A", 300: "#FCD34D", 400: "#FBBF24", 500: "#F59E0B", 600: "#D97706", 700: "#B45309", 800: "#92400E", 900: "#78350F"
      },
      green: {
        50: "#ECFDF5", 100: "#D1FAE5", 200: "#A7F3D0", 300: "#6EE7B7", 400: "#34D399", 500: "#10B981", 600: "#059669", 700: "#047857", 800: "#065F46", 900: "#064E3B"
      },
      blue: {
        5: "#EBF8FF", 25: "#BEE3F8", 50: "#7ED2F6", 100: "#4F9AE3", 200: "#2C80D3", 300: "#0064B1", 400: "#00559A", 500: "#004082", 600: "#00316B", 700: "#002256", 800: "#001144", 900: "#000A29"
      },
      indigo: {
        50: "#EEF2FF", 100: "#E0E7FF", 200: "#C7D2FE", 300: "#A5B4FC", 400: "#818CF8", 500: "#6366F1", 600: "#4F46E5", 700: "#4338CA", 800: "#3730A3", 900: "#312E81"
      },
      purple: {
        50: "#F5F3FF", 100: "#EDE9FE", 200: "#D8B4FE", 300: "#C084FC", 400: "#A855F7", 500: "#9333EA", 600: "#7E22CE", 700: "#6B21A8", 800: "#581C87", 900: "#4C1D6E"
      },
      pink: {
        50: "#FDF2F8", 100: "#FCE7F3", 200: "#FBCFE8", 300: "#F9A8D4", 400: "#F472B6", 500: "#EC4899", 600: "#DB2777", 700: "#BE185D", 800: "#9D174D", 900: "#831843"
      },

      richblack: {
        5: "#F5F5F5", 25: "#D9D9D9", 50: "#B3B3B3", 100: "#808080", 200: "#4D4D4D",
        300: "#262626", 400: "#1A1A1A", 500: "#0A0A0A", 600: "#080808",
        700: "#060606", 800: "#030303", 900: "#000000"
      },

      richblue: {
        5: "#E1F1FF", 25: "#B3D1FF", 50: "#80B2FF", 100: "#4D93FF", 200: "#1A74FF",
        300: "#0061E0", 400: "#0049B3", 500: "#003366", 600: "#00274D",
        700: "#001A40", 800: "#000F33", 900: "#000726"
      },

      // Custom flat colors
      richblue: "#003366",
      caribbeangreen: "#00B5B8",
      brown: "#A52A2A",
      deepblue: "#003366",
      sunsetorange: "#FF4500",
      lightcyan: "#E0FFFF",
      warmyellow: "#FFD700",
      pastelpurple: "#C9A0DC",
      mintgreen: "#98FF98"
    },

    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-out",
        scaleIn: "scaleIn 0.3s ease-out",
      },
    },
  },

  plugins: [
    heroui(),

    // ✅ Useful Tailwind Plugins
    require("@tailwindcss/forms"),         // For better input/form control styling
    require("@tailwindcss/typography"),    // For prose (e.g. course descriptions)
    require("@tailwindcss/aspect-ratio"),  // For image thumbnails/aspect control
    require("@tailwindcss/line-clamp"),    // For truncating long text cleanly
          // Optional: style/hide scrollbars
    require("tailwindcss-safe-area"),      // Safe area padding for mobile UI
    require("tailwindcss-animate"),        // Smooth transition animations
     // Container-based breakpoints
  ],
};
