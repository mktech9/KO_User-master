"use server";

import { SetLabel } from "@/app/labels-async";
import Category from "@/utils/mongo-models/category";
import Filter from "@/utils/mongo-models/filters";
import Marketing from "@/utils/mongo-models/marketing-spot";
import Product from "@/utils/mongo-models/product";
import SubCategory from "@/utils/mongo-models/subCategory";
import SubType from "@/utils/mongo-models/subTypes";
import connectMongo from "@/utils/mongoose";

export const getBrowseFiltersData = async () => {
  try {
    await connectMongo();

    let category = [],
      size = [],
      colors = [],
      labels = [],
      capacity = [],
      type = [],
      material = [],
      basic = [],
      subs = [],
      subTypes = [];

    //get sub & sub types
    subs = await SubCategory.find({}).sort({ _id: 1 }).lean();

    subTypes = await SubType.find({}).sort({ _id: 1 }).lean();

    //get category
    const cate = await Category.find({}).sort({ _id: 1 }).lean();
    cate.forEach((doc) => {
      const item = doc;
      let subItems = subs.filter((dc) => dc.parent === item.name);
      subItems = subItems?.map((dc) => {
        let typeItems = subTypes?.filter((d) => d.parent === dc.name);
        return { ...dc, subTypes: typeItems };
      });

      category.push({ ...item, subCategory: subItems });
    });

    //get filters
    const ftr = await Filter.find({}).sort({ _id: 1 }).lean();
    ftr.forEach((doc) => {
      let item = doc;
      if (item.type === "size") {
        size.push(item);
      } else if (item.type === "color") {
        colors.push(item);
      } else if (item.type === "label") {
        labels.push(item);
      } else if (item.type === "capacity") {
        capacity.push(item);
      } else if (item.type === "type") {
        type.push(item);
      } else if (item.type === "material") {
        material.push(item);
      } else if (item.type === "basic") {
        basic.push(item);
      }
    });

    return {
      category,
      size,
      colors,
      labels,
      capacity,
      type,
      material,
      basic,
    };
  } catch (err) {
    console.log(err);
  }
};

export const GetRelatedProducts = async (
  category,
  subCategory,
  subTypes,
  labels,
  id,
  configs
) => {
  try {
    await connectMongo();

    let related = [],
      label = [];

    let query = {
      isActive: true,
      qty: { $gt: 0 },
      $or: [
        { category: { $in: category } },
        { sub: { $in: subCategory } },
        { subType: { $in: subTypes } },
      ],
      _id: { $ne: id },
    };

    if (configs.label !== "super") {
      query.disabledFor = { $ne: configs.label };
    }

    related = await Product.aggregate([
      { $match: query },
      { $sample: { size: 10 } },
    ]);

    label = await Product.aggregate([
      {
        $match: {
          fLabel: { $in: labels },
          _id: { $ne: id },
        },
      },
      { $sample: { size: 10 } },
    ]);

    return { related, label };
  } catch (err) {
    console.log(err);
  }
};

export const GetMarketingSpot = async () => {
  try {
    const items = await Marketing.findOne({}).lean();
    return items;
  } catch (err) {
    console.log(err);
  }
};
