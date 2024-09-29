import type { AppProps } from "next/app";
import { Providers } from "./providers";
import { motion, AnimatePresence } from "framer-motion";

export default function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Providers>
      <AnimatePresence mode="wait">
        <Component key={router.route} {...pageProps} />
      </AnimatePresence>
    </Providers>
  );
}
