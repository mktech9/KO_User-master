"use client";

import useConfig from "@/store/use-config-store";
import Script from "next/script";
import { useEffect } from "react";

function googleTranslateElementInit() {
  new window.google.translate.TranslateElement(
    {
      pageLanguage: "auto",
      includedLanguages: "en,ru,ae",
    },
    "google_translate_element"
  );
}

const GoogleTranslate = ({ prefLangCookie }) => {
  useEffect(() => {
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  return (
    <>
      <div
        id="google_translate_element"
        style={{ visibility: "hidden", width: "1px", height: "1px" }}
      ></div>
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  );
};

export default GoogleTranslate;
