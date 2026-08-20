"use server";

import { revalidatePath } from "next/cache";

export const BustHomeCache = async () => {
  try {
    return { success: true };
  } catch (err) {
    console.log(
      `BustHomeCache: error - ${err?.message ?? "Something went wrong!"}`
    );
    return { success: false, msg: err?.message ?? "Something went wrong!" };
  }
};

export const BustBrowseProductsCache = async () => {
  try {
    return { success: true };
  } catch (err) {
    return { success: false, msg: err?.message ?? "Something went wrong!" };
  }
};

export const BustProductDetailCache = async () => {
  try {
    return { success: true };
  } catch (err) {
    console.log(
      `BustProductDetailCache: error - ${
        err?.message ?? "Something went wrong!"
      }`
    );
    return { success: false, msg: err?.message ?? "Something went wrong!" };
  }
};

export const BustBlogCache = async () => {
  try {
    // revalidate API routes
    revalidatePath("/api/blog");
    revalidatePath("/api/blog", "page");
    revalidatePath("/api/blog", "layout");

    revalidatePath("/api/blog/get-category");
    revalidatePath("/api/blog/get-category", "page");
    revalidatePath("/api/blog/get-category", "layout");

    revalidatePath("/api/blog/get-all");
    revalidatePath("/api/blog/get-all", "page");
    revalidatePath("/api/blog/get-all", "layout");

    revalidatePath("/api/blog/[slug]");
    revalidatePath("/api/blog/[slug]", "page");
    revalidatePath("/api/blog/[slug]", "layout");

    //revalidate pages
    revalidatePath("/blog");
    revalidatePath("/blog", "page");
    revalidatePath("/blog", "layout");

    revalidatePath("/blog/page/[page]");
    revalidatePath("/blog/page/[page]", "page");
    revalidatePath("/blog/page/[page]", "layout");

    revalidatePath("/blog/[category]");
    revalidatePath("/blog/[category]", "page");
    revalidatePath("/blog/[category]", "layout");

    revalidatePath("/blog/[category]/page/[page]");
    revalidatePath("/blog/[category]/page/[page]", "page");
    revalidatePath("/blog/[category]/page/[page]", "layout");

    revalidatePath("/blog/[category]/[slug]");
    revalidatePath("/blog/[category]/[slug]", "page");
    revalidatePath("/blog/[category]/[slug]", "layout");

    console.log("BustBlogCache: done");
    return { success: true };
  } catch (err) {
    console.log(
      `BustBlogCache: error - ${err?.message ?? "Something went wrong!"}`
    );
    return { success: false, msg: err?.message ?? "Something went wrong!" };
  }
};
