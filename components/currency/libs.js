"use server";

import { cookies } from "next/headers";

const defaultCurrency = "aed";

export const GetCurrencyFromCookie = async () => {
  try {
    const cookiez = cookies();
    let currency = cookiez.get("currency")?.value;

    if (!currency) {
      cookiez.set("currency", "aed", {
        path: "/",
      });
      currency = defaultCurrency;
    }

    return currency;
  } catch (err) {
    console.log(err);
    return defaultCurrency;
  }
};

export const SetCurrency = async (value) => {
  return new Promise((resolve, reject) => {
    try {
      const cookiez = cookies();

      cookiez.getAll().forEach((doc) => {
        if (doc.name === "currency") {
          cookiez.delete(doc.name);
        }
      });

      cookiez.set("currency", value, {
        path: "/",
      });
      resolve(true);
    } catch (err) {
      console.log(err);
      reject(err?.message);
    }
  });
};
