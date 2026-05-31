/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Chakra Petch"', "sans-serif"],
        body: ["Nunito", "sans-serif"],
      },
      colors: {
        "cf-green": "#00D632",
        "cf-amber": "#F5A623",
        "cf-red": "#E74C3C",
        "cf-blue": "#58A6FF",
        "cf-dark": "#0D1117",
        "cf-card": "#161B22",
      },
      animation: {
        "slide-left": "slideInLeft  0.5s ease-out forwards",
        "slide-right": "slideInRight 0.5s ease-out forwards",
        "slide-up": "slideInUp    0.45s ease-out forwards",
        "scale-in": "scaleIn      0.4s  ease-out forwards",
        "live-pulse": "livePulse    1.5s  ease-in-out infinite",
        "bounce-ball": "bounceBall   0.9s  ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
