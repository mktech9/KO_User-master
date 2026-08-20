"use client";

import { SetLanguage } from "@/components/localization/libs";
import Script from "next/script";
import { useEffect, useState } from "react";

const LanguageLocalStorage = () => {
  const [lang, setLang] = useState("/auto/en");

  useEffect(() => {
    let language = localStorage.getItem("googtrans") ?? "/auto/en";
    SetLanguage(language).then(() => setLang(language));
  }, []);

  return (
    <>
      {lang !== "/auto/en" && (
        <Script>
          {`
          function TranslateInit() {
            new google.translate.TranslateElement();
          }`}
        </Script>
      )}
      {lang !== "/auto/en" && (
        <Script src="https://translate.google.com/translate_a/element.js?cb=TranslateInit" />
      )}
    </>
  );
};

export default LanguageLocalStorage;
