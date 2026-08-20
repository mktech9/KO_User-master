"use client";

import useConfig from "@/store/use-config-store";

const config = {
  inr: 0.04398,
  usd: 3.66,
  aed: 1,
  sar: 1.02,
};

const signs = {
  inr: "INR",
  usd: "USD",
  aed: "AED",
  sar: "SAR",
};

const CurrencyReadOnly = ({
  value,
  currency: wishlistCurrency,
  prefix,
  initialCurrency = "aed",
}) => {
  const { currency } = useConfig();

  const prefixCurrency = prefix ?? true;

  // Use Zustand currency after hydration,
  // otherwise use the server-provided currency.
  const selectedCurrency = currency || initialCurrency;

  if (!selectedCurrency || !config[selectedCurrency]) {
    return null;
  }

  const conversionRate =
    config[wishlistCurrency] / config[selectedCurrency];

  const convertedValue = value * conversionRate;

  return (
    <>
      {`${prefixCurrency ? signs[selectedCurrency] : ""} ${convertedValue.toFixed(
        2
      )}`}
    </>
  );
};

export default CurrencyReadOnly;