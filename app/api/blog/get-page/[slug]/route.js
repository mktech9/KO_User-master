import { db } from "@/libs/firebase-admin";
import { NextResponse } from "next/server";

// Replace force-dynamic with revalidate for ISR
export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  try {
    const slug = await params.slug;

    const item = await db
      .collection("v2_page")
      .where("slug", "==", slug)
      .get();

    if (item.empty) {
      throw new Error("Not found!");
    }

    const blog_data = item.docs[0].data();

    if (blog_data.website !== "ko") {
      throw new Error("Not found!");
    }

    if (blog_data.status !== "published") {
      throw new Error("Not published!");
    }

    const blog_item = {
      id: item.docs[0].id,
      ...blog_data,
      metaKeywords: blog_data.seo?.metaKeywords,
    };

    return NextResponse.json(blog_item);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
