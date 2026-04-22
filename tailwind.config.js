// tailwind.config.js
export default {
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        // 1.5s is usually smoother than 1s for large areas like a Hero section
        shimmer: "shimmer 2s infinite linear",
      },
    },
  },
};