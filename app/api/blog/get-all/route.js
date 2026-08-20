import { db } from "@/libs/firebase-admin";
import { NextResponse } from "next/server";

// Replace force-dynamic with revalidate for ISR
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const blog_collection = db.collection("v2_blog");
    const snapshot = await blog_collection
      .where("status", "==", "published")
      .orderBy("createdAt", "desc")
      .get();

    let allItems = snapshot.docs.map((doc) => {
      const doc_data = doc.data();

      return {
        id: doc.id,
        ...doc_data,
        category: doc_data.cate_tax?.category,
        subCategory: doc_data.cate_tax?.subCategory,
        tags: doc_data.cate_tax?.tags,
        metaKeywords: doc_data.seo?.metaKeywords,
        metaKeywords_ai: doc_data.seo?.metaKeywords_ai,
      };
    });

    allItems = allItems.filter((item) => item.website === "ko");

    // Collect categories
    let categoryArray = [];

    const categories_snap = await db
      .collection("v2_category")
      .where("isActive", "==", true)
      .get();

    categories_snap.forEach((doc) => {
      let cate_data = doc.data();

      if (cate_data.website === "ko") {
        categoryArray.push(cate_data);
      }
    });

    // Count occurrences and sort by frequency
    const categories = categoryArray?.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    return NextResponse.json({
      items: allItems,
      category: categories,
      total: allItems.length,
    });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    return NextResponse.json(
      {
        items: [],
        category: [],
        total: 0,
        error: err.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
