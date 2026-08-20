import { db } from "@/libs/firebase-admin";
import { NextResponse } from "next/server";

// Replace force-dynamic with revalidate for ISR
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Fetch all blog items from /api/blog/get-all
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

    return NextResponse.json({
      categories: categoryArray?.sort((a, b) => a.name.localeCompare(b.name)),
    });
  } catch (err) {
    console.error("Error fetching categories:", err);
    return NextResponse.json(
      { categories: [], error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
