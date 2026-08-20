"use server";

import { decrypt } from "./encrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const setAuthCookies = async (tokenObject) => {
  const cookie = cookies();

  //set cookie age
  const date = new Date();
  date.setMonth(date.getMonth() + 6);

  const options = {
    path: "/",
    expires: date,
    httpOnly: true,
    sameSite: "strict",
  };

  cookie.set("auth-token", tokenObject.access, options);
  cookie.set("auth-ref", tokenObject.ref, options);
  cookie.set("auth-id", tokenObject.id, options);
};

export const destroyAuthCookies = async () => {
  const cookie = cookies();
  cookie.delete("auth-token", { path: "/" });
  cookie.delete("auth-ref", { path: "/" });
  cookie.delete("auth-id", { path: "/" });
  redirect("/auth", "replace");
};

export const checkIsAuthValid = async () => {
  const cookie = cookies();
  let token = cookie.get("auth-token")?.value ?? "",
    ref = cookie.get("auth-ref")?.value ?? "";

  const tkn = decrypt(token, "mysecret");

  if (token === "" || ref === "") {
    return false;
  }

  if (tkn === ref) {
    return true;
  } else {
    return false;
  }
};

export const GetUserRef = async () => {
  const cookie = cookies();
  const ref = cookie.get("auth-ref")?.value ?? null;
  return ref;
};
