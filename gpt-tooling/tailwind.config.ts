import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      zIndex: {
        '-z-10': '-10'
      }
    },
  },
  plugins: [],
} satisfies Config;
