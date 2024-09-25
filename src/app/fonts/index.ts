import localFont from "next/font/local";

import { Onest, Gabarito, Fira_Code, Roboto_Condensed, Old_Standard_TT, Oswald } from "next/font/google";

export const onest = Onest({subsets: ['latin']})
export const gabarito = Gabarito({subsets: ['latin']})
export const firaCode = Fira_Code({subsets: ['latin']})
export const robotoCondensed = Roboto_Condensed({subsets: ['latin']})
export const oldStandardTT = Old_Standard_TT({
    subsets: ['latin'],
    weight: "400"
})
export const helveticaBlack = localFont({
    src: "./HelveticaNeueBlack.otf",
    variable: "--font-helvetica",
    weight: "100 900",
  });
  export const helveticaThin = localFont({
    src: "./HelveticaNeueThin.otf",
    variable: "--font-helvetica",
    weight: "100 900",
  });

  export const helveticaThinItalic = localFont({
    src: "./HelveticaNeueThinItalic.otf",
    variable: "--font-helvetica",
    weight: "100 900",
  });

  export const helvetica = localFont({
    src: "./HelveticaNeueRoman.otf",
    variable: "--font-helvetica",
    weight: "100 900",
  });

export const helveticaLight = localFont({
    src: "./HelveticaNeueLight.otf",
    variable: "--font-helvetica",
    weight: "100 900",
    });

export const helveticaLightItalic = localFont({
      src: "./HelveticaNeueLightItalic.otf",
      variable: "--font-helvetica",
      weight: "100 900",
      });

export const helveticaBold = localFont({
        src: "./HelveticaNeueBold.otf",
        variable: "--font-helvetica",
        weight: "100 900",
        });

export const helveticaBoldItalic = localFont({
          src: "./HelveticaNeueBoldItalic.otf",
          variable: "--font-helvetica",
          weight: "100 900",
          });

export const helveticaUltraLight = localFont({
            src: "./HelveticaNeueUltraLight.otf",
            variable: "--font-helvetica",
            weight: "100 900",
            });

export const helveticaUltraLightItalic = localFont({
              src: "./HelveticaNeueUltraLightItalic.otf",
              variable: "--font-helvetica",
              weight: "100 900",
              });

export const oswald = Oswald({subsets: ['latin']})