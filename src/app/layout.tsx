import type { Metadata } from "next";
import localFont from "next/font/local";
import { helvetica } from "../fonts";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Talking Time Machine",
  description: "App that lets you chat with historical figures",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Talking Time Machine</title>
        <link rel="icon" href="./favicon.ico" />
        </head>
      <body
        className={`${helvetica.className} bg-black text-white antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
