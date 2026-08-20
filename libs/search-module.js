"use server";

import Category from "@/utils/mongo-models/category";
import SubCategory from "@/utils/mongo-models/subCategory";
import connectMongo from "@/utils/mongoose";
import { getSearchResults } from "./get-paginated-product";

export const SearchFromDatabase = async (search) => {
  try {
    await connectMongo();

    let items = [],
      category = [];

    items = await getSearchResults(search);
    const cate = await Category.find({
      name: { $regex: search, $options: "i" },
    })
      .limit(5)
      .lean();
    const sub = await SubCategory.find({
      name: { $regex: search, $options: "i" },
    })
      .limit(5)
      .lean();

    cate.forEach((doc) => {
      return category.push({ type: "category", category: doc.name });
    });

    sub.forEach((doc) => {
      return category.push({
        type: "subCategory",
        category: doc.parent,
        subCategory: doc.name,
      });
    });

    return { items, category };
  } catch (err) {
    console.log(err);
    return { items: [], category: [] };
  }
};
