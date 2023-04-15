import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    linearBorderGradients: (theme: (arg0: string) => any) => ({
      colors: theme('colors')
    }),
    extend: {
      zIndex: {
        '-z-10': '-10'
      }
    },
  },
  plugins: [
    require('tailwindcss-border-gradients')()
  ],
} satisfies Config;
