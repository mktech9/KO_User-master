"use server";

import {
  BustBrowseProductsCache,
  BustHomeCache,
  BustProductDetailCache,
  BustBlogCache,
} from "@/cache_helper/buster";

export async function BustAnyCache(type) {
  try {
    let resp;

    if (type === "home") {
      resp = await BustHomeCache();
    } else if (type === "browse") {
      resp = await BustBrowseProductsCache();
    } else if (type === "products") {
      resp = await BustProductDetailCache();
    } else if (type === "blogs") {
      resp = await BustBlogCache();
    } else {
      return { success: false, msg: "Invalid cache type" };
    }

    return resp;
  } catch (err) {
    console.error("❌ BustAnyCache error:", err);
    return { success: false, msg: err?.message ?? "Something went wrong!" };
  }
}
