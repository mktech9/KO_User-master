"use server";

import { cookies } from "next/headers";

const defaultLanguage = "/auto/en";
const cookieName = "googtrans";

export const GetLanguageFromCookie = async () => {
  try {
    const cookiez = cookies();
    let currency = cookiez.get(cookieName)?.value;

    if (currency) {
      currency = decodeURIComponent(currency); // Decode the cookie value
    }

    if (!currency) {
      ["www.kross-over.net", "kross-over.net"].forEach((domain) => {
        cookiez.getAll().forEach((doc) => {
          if (doc.name === cookieName) {
            cookiez.delete(doc.name, { domain });
          }
        });
      });

      currency = defaultLanguage;
    }

    return currency;
  } catch (err) {
    console.log(err);
    return defaultLanguage;
  }
};

export const SetLanguage = async (value) => {
  try {
    const cookiez = cookies();

    // Delete cookies from both www and root domains
    ["www.kross-over.net", "kross-over.net"].forEach((domain) => {
      cookiez.getAll().forEach((doc) => {
        if (doc.name === cookieName) {
          cookiez.delete(doc.name, { domain });
        }
      });
    });

    // cookiez.set(cookieName, value, {
    //   path: "/",
    //   // sameSite: "Lax",
    //   // secure: true, // Ensures it is only transmitted over HTTPS
    //   // httpOnly: true, // Prevents client-side scripts from modifying
    // });

    // cookiez.set(cookieName, value, {
    //   path: "/",
    //   domain: ".kross-over.net",
    //   // sameSite: "Lax",
    //   // secure: true, // Ensures it is only transmitted over HTTPS
    //   // httpOnly: true, // Prevents client-side scripts from modifying
    // });

    return true;
  } catch (err) {
    console.log(err);
    throw new Error(err?.message);
  }
};
