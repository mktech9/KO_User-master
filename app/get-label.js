"use server";

import { headers } from "next/headers";

export const GetHeaders = async () => {
  const nextHeaders = headers();

  let label = nextHeaders.get("host");
  return label;
};
