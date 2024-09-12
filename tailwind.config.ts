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
