import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(21, 17, 28)",
        lightBlack: "rgb(8, 8, 8)",
        lightGray: "rgba(7, 7, 7,0.9)",
        lightWhite: "rgb(230,213,213)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'spotlight': 'radial-gradient(circle at 64% 90%, rgba(128, 128, 128, 0.4) 15%, rgb(21, 17, 28) 33%)',
      }
      
      
    },
  },
  plugins: [],
};
export default config;
