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
        'spotlight': 'radial-gradient(circle at 40% 80%, rgba(128, 128, 128, 0.4) 10%, rgb(21, 17, 28) 50%)',
        'spotlight-mini': 'radial-gradient(circle at 25% 70%, rgba(128, 128, 128, 0.4) 10%, rgb(21, 17, 28) 27%)',
      },
      screens: {  
        '3xl': '1600px',
        '1.5xl': '1350px',
        '0.5xl': '1180px',
      },
      
      
    },
  },
  plugins: [],
};
export default config;
