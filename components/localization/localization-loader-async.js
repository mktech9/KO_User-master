"use client";

import useConfig from "@/store/use-config-store";
import { useEffect } from "react";

const LanguageLoaderAsync = ({ currency }) => {
  const { setConfig } = useConfig();

  useEffect(() => {
    setConfig(currency, "language");
  }, []);

  return <></>;
};

export default LanguageLoaderAsync;
