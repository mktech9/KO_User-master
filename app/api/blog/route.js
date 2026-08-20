import { db } from "@/libs/firebase-admin";
import moment from "moment";
import { NextResponse } from "next/server";

// Replace force-dynamic with revalidate for ISR
export const dynamic = "force-dynamic";

const cleanTag = (tag) => tag?.trim().replace(/^"+|"+$/g, "");

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

    // Helper function to count occurrences and sort
    const countAndSort = (arr) => {
      const countMap = {};
      arr.forEach((item) => {
        if (item) countMap[item] = (countMap[item] || 0) + 1;
      });
      return Object.entries(countMap)
        .sort((a, b) => b[1] - a[1])
        .map(([key]) => key);
    };

    // Collect tags from seo.metaKeywords & seo.metaKeywords_ai
    let tagsArray = [];
    allItems.forEach((item) => {
      if (Array.isArray(item.seo?.metaKeywords)) {
        tagsArray.push(...item.seo.metaKeywords);
      }
      if (typeof item.seo?.metaKeywords_ai === "string") {
        const aiKeywords = item.seo.metaKeywords_ai
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t);
        tagsArray.push(...aiKeywords);
      }
    });
    const tags = countAndSort(tagsArray);

    // Collect additional tags from cate_tax?.tags (separate array)
    let addTagsArray = [];
    allItems.forEach((item) => {
      if (Array.isArray(item.cate_tax?.tags)) {
        const cleanedTags = item.cate_tax?.tags
          .map((t) => cleanTag(t))
          .filter((t) => t);
        addTagsArray.push(...cleanedTags);
      }
    });
    const add_tags = countAndSort(addTagsArray);

    // Collect categories from cate_tax?.category (single string)
    let categoryArray = [];
    allItems.forEach((item) => {
      if (item.cate_tax?.category) {
        categoryArray.push(item.cate_tax.category);
      }
    });
    const categories = countAndSort(categoryArray);

    // Collect schema from seo?.schemaType (array or comma-separated string)
    let schemaArray = [];
    allItems.forEach((item) => {
      if (Array.isArray(item.seo?.schemaType)) {
        schemaArray.push(...item.seo.schemaType);
      } else if (typeof item.seo?.schemaType === "string") {
        const schemas = item.seo.schemaType
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t);
        schemaArray.push(...schemas);
      }
    });
    const schema = countAndSort(schemaArray);

    // Build monthly date archives (YYYY-MM)
    const dateArchivesSet = new Set();
    allItems.forEach((item) => {
      const date = item.createdAt?.toDate?.() || new Date(item.createdAt);
      const key = moment(date).format("YYYY-MM");
      dateArchivesSet.add(key);
    });

    return NextResponse.json({
      items: allItems,
      tags,
      add_tags,
      categories,
      schema,
      date_archives: Array.from(dateArchivesSet).sort((a, b) =>
        b.localeCompare(a)
      ),
      total: allItems.length,
    });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    return NextResponse.json(
      {
        items: [],
        tags: [],
        add_tags: [],
        categories: [],
        schema: [],
        date_archives: [],
        error: err.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
