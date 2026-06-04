/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#0047bb", // primary CTA / links / accents
          navy: "#001489", // dark-section gradient base
          deep: "#0d0d4b", // logo + deepest navy
          cyan: "#16e9d7", // star accent
        },
        ink: "#1c1f2a", // body text
        line: "#dae3ed", // hairline borders / dividers
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        alt: ['"Montserrat"', "system-ui", "sans-serif"],
      },
      fontSize: {
        eyebrow: ["14px", { lineHeight: "30px" }],
        body: ["14px", { lineHeight: "25px" }],
        lead: ["16px", { lineHeight: "30px" }],
      },
      maxWidth: {
        shell: "1200px",
      },
      borderRadius: {
        card: "20px",
        btn: "5px",
      },
      boxShadow: {
        nav: "4px 4px 15px 0px rgba(217,217,217,0.25)",
        card: "0 18px 50px -20px rgba(0,20,137,0.18)",
        lift: "0 28px 60px -24px rgba(0,20,137,0.32)",
      },
      backgroundImage: {
        "navy-grad": "linear-gradient(to bottom, #000000 0%, #001489 100%)",
      },
      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        marqueefloat: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
