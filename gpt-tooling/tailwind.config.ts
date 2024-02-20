import { type Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js'
  ],
  safelist: [{
    pattern: /hljs+/
  }],
  theme: {
    hljs: {
      theme: 'night-owl'
    },
    extend: {
      zIndex: {
        '-z-10': '-10'
      }
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui"), require("tailwind-highlightjs")],
  daisyui: {
    styled: true,
    themes: [
      "night",
      "dracula",
      "retro", 
      "forest", 
      "sunset", 
      "halloween"
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: 'dark'
  }
} satisfies Config;
