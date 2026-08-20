import localFont from "next/font/local";

export const inter = localFont({
  src: [
    {
      path: "../../fonts/Satoshi-Variable.ttf",
      style: "normal",
      weight: "100 1000",
    },
    {
      path: "../../fonts/Satoshi-VariableItalic.ttf",
      style: "italic",
      weight: "100 1000",
    },
  ],
  variable: "--font-sathoshi",
  display: "swap",
  weight: "100 1000",
});
