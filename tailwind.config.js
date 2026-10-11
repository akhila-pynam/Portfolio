/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "midnight": "var(--midnight)",
        "charcoal": "var(--charcoal)",
        "yellow-street": "var(--yellow-street)",
        "yellow-gold": "var(--yellow-gold)",
        "soft-white": "var(--soft-white)",
        "muted-gray": "var(--muted-gray)",
        "border-gray": "var(--border-gray)",
      },
      fontFamily: {
        grotesk: ["Space Grotesk", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 8s linear infinite",
        "grain": "grain 8s steps(1) infinite",
      },
      keyframes: {
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "20%": { transform: "translate(-15%, 5%)" },
          "30%": { transform: "translate(7%, -25%)" },
          "40%": { transform: "translate(-5%, 25%)" },
          "50%": { transform: "translate(-15%, 10%)" },
          "60%": { transform: "translate(15%, 0%)" },
          "70%": { transform: "translate(0%, 15%)" },
          "80%": { transform: "translate(3%, 35%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
      },
      backgroundImage: {
        "yellow-glow": "radial-gradient(circle at center, rgba(255, 212, 0, 0.12) 0%, transparent 70%)",
        "hero-gradient": "radial-gradient(ellipse at 50% 50%, rgba(255, 212, 0, 0.08) 0%, transparent 60%)",
      },
    },
  },
  plugins: [],
};
