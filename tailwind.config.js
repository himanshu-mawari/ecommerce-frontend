export default {
  theme: {
    extend: {
      keyframes: {
        slideDown: {
          "0%": { opacity: "0", transform: "translate(-50%, -20px)" },
          "100%": { opacity: "1", transform: "translate(-50%, 0)" },
        },
      },
      animation: {
        "slide-down": "slideDown 0.3s ease-out forwards",
      },
    },
  },
};
