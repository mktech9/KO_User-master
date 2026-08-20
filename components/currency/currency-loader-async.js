"use client";

import useConfig from "@/store/use-config-store";
import { useEffect } from "react";

const CurrencyLoaderAsync = ({ currency }) => {
  const { setConfig } = useConfig();

  useEffect(() => {
    setConfig(currency, "currency");
  }, []);

  return <></>;
};

export default CurrencyLoaderAsync;
