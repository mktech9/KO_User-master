import "./globals.css";
import localFont from "next/font/local";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import ZustandAsync from "./zustand-async";
import Header from "@/components/header";
import NextTopLoader from "nextjs-toploader";
import FooterWrapper from "@/components/footer";
import { SetLabel } from "./labels-async";
import { GetCurrencyFromCookie } from "@/components/currency/libs";
import { GetLanguageFromCookie } from "@/components/localization/libs";
import { GoogleTags, SeoChecklist, TagScripts } from "./seo-checklist";
import { headers } from "next/headers";
import ScrollTop from "@/components/common/scroll-top";
import MobileFloatingButtons from "@/components/common/mobile-floating-buttons";
import Script from "next/script";

const inter = localFont({
  src: [
    {
      path: "../fonts/Satoshi-Variable.ttf",
      style: "normal",
      weight: "100 1000",
    },
    {
      path: "../fonts/Satoshi-VariableItalic.ttf",
      style: "italic",
      weight: "100 1000",
    },
  ],
  variable: "--font-sathoshi",
  display: "swap",
  weight: "100 1000",
});

export async function generateMetadata() {
  const headersList = headers();
  return {
    metadataBase: new URL("https://www.kross-over.net"),
    title: "Kross Over",
    description:
      "Kross Over - Custom branded merchandise platform offering apparel, accessories, and more with your logo/text. Ideal for businesses and organizations.",
    alternates: {
      canonical: headersList.get("x-pathname"),
    },
    robots: { index: true, googleBot: { index: true } },
    viewport: { width: "device-width", initialScale: 1, maximumScale: 1 },
  };
}

export default async function RootLayout({ children }) {
  const [configs, currency, language] = await Promise.all([
    SetLabel(),
    GetCurrencyFromCookie(),
    GetLanguageFromCookie(),
  ]);
  global.configs = configs;

  const themeConfig = {
    defaultRadius: "sm",
    primaryColor: "cyan",
    colors: {
      cyan: configs?.color,
      dark: configs?.secondaryColor,
    },
    autoContrast: true,
  };

  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="31HOgmtOiRrGixcZn9LhHnLB7k-0j9u3eL67-81Omnw"
        />
        <SeoChecklist />
        <ColorSchemeScript />
        <GoogleTags />
        {language !== "en" && language !== "/auto/en" && (
          <Script>
            {`
          function TranslateInit() {
            new google.translate.TranslateElement();

            const excludedDivs = document.querySelectorAll('.exclude-translation');
            excludedDivs.forEach(div => {
            div.setAttribute('translate', 'no');
            });
          }`}
          </Script>
        )}
        {language !== "en" && language !== "/auto/en" && (
          <Script
            src="https://translate.google.com/translate_a/element.js?cb=TranslateInit"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className={inter.className}>
        <h1 style={{ display: "none" }}>Corporate Promotional Gifts Dubai</h1>
        <TagScripts label={configs?.label} />
        <NextTopLoader
          color={configs?.secondaryColor[0]}
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #fd3e49,0 0 5px #fd3e49"
          template={`<div class="bar" role="bar">
                <div class="peg"></div>
              </div>
              <div class="spinner" role="spinner">
                <div class="pill">
                  <div class="spinner-icon"></div>
                  <div class="spinner-text">Loading...</div>
                </div>
              </div>`}
        />
        <MantineProvider theme={themeConfig}>
          <Notifications style={{ zIndex: 1000 }} position="top-right" />
          <Header />
          {children}
          <FooterWrapper />
          <ScrollTop />
          <MobileFloatingButtons />
        </MantineProvider>
        <ZustandAsync log={configs} currency={currency} language={language} />
      </body>
    </html>
  );
}
