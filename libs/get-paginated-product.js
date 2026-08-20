"use server";
import { SetLabel } from "@/app/labels-async";
import { csActive, rsActive } from "@/config";
import Product from "@/utils/mongo-models/product";
import connectMongo from "@/utils/mongoose";

export const getQueryParameters = async (searchParams) => {
  const category = searchParams?.category
      ? searchParams?.category?.split(",")
      : [],
    subCategory = searchParams?.subCategory
      ? searchParams?.subCategory?.split(",")
      : [],
    subTypes = searchParams?.subTypes ? searchParams?.subTypes?.split(",") : [],
    stock = +searchParams?.stock ?? 0,
    basic = searchParams?.filterBy ? searchParams?.filterBy?.split(",") : [],
    size = searchParams?.size ? searchParams?.size?.split(",") : [],
    label = searchParams?.label ? searchParams?.label?.split(",") : [],
    color = searchParams?.color ? searchParams?.color?.split(",") : [],
    capacity = searchParams?.capacity ? searchParams?.capacity?.split(",") : [],
    material = searchParams?.material ? searchParams?.material?.split(",") : [],
    type = searchParams?.type ? searchParams?.type?.split(",") : [],
    sortBy =
      searchParams?.sortBy !== "" && searchParams?.sortBy
        ? searchParams?.sortBy
        : "latest",
    page = +searchParams?.page ?? 1,
    cursor1 = searchParams?.cursor1 ?? "",
    cursor2 = searchParams?.cursor2 ?? "",
    cursor3 = searchParams?.cursor3 ?? "",
    next = searchParams?.next === "true" ? true : false,
    search = searchParams?.search ?? "",
    priceMin = searchParams?.priceMin ? +searchParams?.priceMin : 0,
    priceMax = searchParams?.priceMax ? +searchParams?.priceMax : 10000;

  let isSingleCategory = false;

  if (
    category?.length === 1 &&
    subTypes?.length <= 1 &&
    subCategory?.length <= 1
  ) {
    isSingleCategory = true;
  }

  return {
    category,
    subCategory,
    subTypes,
    stock,
    size,
    basic,
    label,
    color,
    capacity,
    material,
    type,
    isSingleCategory,
    sortBy,
    page,
    cursor3,
    next,
    cursor1,
    cursor2,
    search,
    priceMin,
    priceMax,
  };
};

const filterParameters = (filters, parameters) => {
  // Function to remove subCategory from parameters.subCategory
  const removeSubCategory = (subCategoryName) => {
    parameters.subCategory = parameters.subCategory.filter(
      (subCategory) => subCategory !== subCategoryName
    );
  };

  // Function to remove category from parameters.category
  const removeCategory = (categoryName) => {
    parameters.category = parameters.category.filter(
      (category) => category !== categoryName
    );
  };

  // Iterate through each category in parameters.category
  parameters.category.forEach((category) => {
    // Find the corresponding filter in filters
    const filter = filters.find((filter) => filter.name === category);
    if (filter) {
      const removeCate = filter?.subCategory?.some((doc) =>
        parameters?.subCategory?.includes(doc.name)
      );

      if (removeCate) {
        removeCategory(filter?.name);
      }

      // Check if any subCategory of this category is present in parameters.subCategory
      const subCategoriesToRemove = filter.subCategory
        .filter((subCategory) => {
          const subTypesToRemove = subCategory.subTypes.map(
            (subType) => subType.name
          );
          return parameters.subTypes.some((subType) =>
            subTypesToRemove.includes(subType)
          );
        })
        .map((subCategory) => subCategory.name);

      if (subCategoriesToRemove.length > 0) {
        // Remove subCategories of this category from parameters.subCategory
        subCategoriesToRemove.forEach((subCategory) => {
          removeSubCategory(subCategory);
        });
      }
    }
  });

  return parameters;
};

export const getSearchResults = async (search, reseller) => {
  try {
    await connectMongo();
    const labels = await SetLabel();
    const isActiveField = reseller ? rsActive : csActive;

    const searchConditions = [];
    // If search is not empty, add search conditions to the $and operator
    if (search !== "") {
      searchConditions.push({
        name: { $regex: search, $options: "i" },
      });
      searchConditions.push({
        brand: { $regex: search, $options: "i" },
      });
      searchConditions.push({
        code: { $regex: search, $options: "i" },
      });
      searchConditions.push({
        fColor: {
          $elemMatch: { $regex: search, $options: "i" },
        },
      });
      searchConditions.push({
        fLabel: {
          $elemMatch: { $regex: search, $options: "i" },
        },
      });

      searchConditions.push({
        category: {
          $elemMatch: { $regex: search, $options: "i" },
        },
      });

      searchConditions.push({
        sub: {
          $elemMatch: { $regex: search, $options: "i" },
        },
      });

      searchConditions.push({
        subType: {
          $elemMatch: { $regex: search, $options: "i" },
        },
      });
    }

    let query = { [`active.${isActiveField}`]: true, $or: searchConditions };

    if (labels.label !== "super") {
      query.disabledFor = { $ne: labels.label };
    }

    const items = await Product.find(query).limit(15).lean();

    return items;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getPaginatedCount = async (params, filters, reseller) => {
  try {
    await connectMongo();

    const labels = await SetLabel();

    const priceField = reseller ? "b2bPrice" : "price";
    const isActiveField = reseller ? rsActive : csActive;

    let query = {
      [`active.${isActiveField}`]: true,
      [priceField]: { $gte: params.priceMin, $lte: params.priceMax },
    };

    if (labels.label !== "super") {
      query.disabledFor = { $ne: labels.label };
    }

    const searchConditions = [];
    const otherConditions = [];

    let parameters = filterParameters(filters.category, params);

    if (parameters?.category?.length > 0) {
      otherConditions.push({ category: { $in: parameters.category } });
    }

    if (parameters?.subCategory?.length > 0) {
      otherConditions.push({ sub: { $in: parameters.subCategory } });
    }

    if (parameters?.subTypes?.length > 0) {
      otherConditions.push({ subType: { $in: parameters.subTypes } });
    }

    if (parameters?.search !== "") {
      searchConditions.push({
        name: { $regex: parameters.search, $options: "i" },
      });
      searchConditions.push({
        brand: { $regex: parameters.search, $options: "i" },
      });
      searchConditions.push({
        code: { $regex: parameters.search, $options: "i" },
      });
      searchConditions.push({
        fColor: { $elemMatch: { $regex: parameters.search, $options: "i" } },
      });
      searchConditions.push({
        fLabel: { $elemMatch: { $regex: parameters.search, $options: "i" } },
      });
    }

    if (parameters?.stock > 0) {
      query.qty = { $gte: parameters?.stock };
    }

    if (parameters?.basic?.length > 0) {
      query.fBasic = { $in: parameters?.basic };
    }

    if (parameters?.size?.length > 0) {
      query.fSize = { $in: parameters?.size };
    }

    if (parameters?.label?.length > 0) {
      query.fLabel = { $in: parameters?.label };
    }

    if (parameters?.color?.length > 0) {
      query.fColor = { $in: parameters?.color };
    }

    if (parameters?.capacity?.length > 0) {
      query.fCapacity = { $in: parameters?.capacity };
    }

    if (parameters?.material?.length > 0) {
      query.fMaterial = { $in: parameters?.material };
    }

    if (parameters?.type?.length > 0) {
      query.fType = { $in: parameters?.type };
    }

    if (otherConditions.length > 0) {
      query.$or = otherConditions;
    }

    if (searchConditions.length > 0) {
      query.$and = [query.$and || {}, { $or: searchConditions }];
    }

    const count = await Product.find(query).countDocuments();
    console.log(count);
    return count;
  } catch (err) {
    console.log(err);
  }
};

export const getPaginatedProducts = async (params, filters, reseller) => {
  try {
    await connectMongo();
    const priceField = reseller ? "b2bPrice" : "price";
    const isActiveField = reseller ? rsActive : csActive;

    const labels = await SetLabel();

    let query = {
      [`active.${isActiveField}`]: true,
      [priceField]: { $gte: params.priceMin, $lte: params.priceMax },
    };

    if (labels.label !== "super") {
      query.disabledFor = { $ne: labels.label };
    }

    const searchConditions = [];
    const otherConditions = [];

    let parameters = filterParameters(filters.category, params);

    if (parameters?.category?.length > 0) {
      otherConditions.push({ category: { $in: parameters.category } });
    }

    if (parameters?.subCategory?.length > 0) {
      otherConditions.push({ sub: { $in: parameters.subCategory } });
    }

    if (parameters?.subTypes?.length > 0) {
      otherConditions.push({ subType: { $in: parameters.subTypes } });
    }

    if (parameters?.search !== "") {
      searchConditions.push({
        name: { $regex: parameters.search, $options: "i" },
      });
      searchConditions.push({
        brand: { $regex: parameters.search, $options: "i" },
      });
      searchConditions.push({
        code: { $regex: parameters.search, $options: "i" },
      });
      searchConditions.push({
        fColor: { $elemMatch: { $regex: parameters.search, $options: "i" } },
      });
      searchConditions.push({
        fLabel: { $elemMatch: { $regex: parameters.search, $options: "i" } },
      });
    }

    if (parameters?.stock > 0) {
      query.qty = { $gte: parameters?.stock };
    }

    if (parameters?.basic?.length > 0) {
      query.fBasic = { $in: parameters?.basic };
    }

    if (parameters?.size?.length > 0) {
      query.fSize = { $in: parameters?.size };
    }

    if (parameters?.label?.length > 0) {
      query.fLabel = { $in: parameters?.label };
    }

    if (parameters?.color?.length > 0) {
      query.fColor = { $in: parameters?.color };
    }

    if (parameters?.capacity?.length > 0) {
      query.fCapacity = { $in: parameters?.capacity };
    }

    if (parameters?.material?.length > 0) {
      query.fMaterial = { $in: parameters?.material };
    }

    if (parameters?.type?.length > 0) {
      query.fType = { $in: parameters?.type };
    }

    if (otherConditions.length > 0) {
      query.$or = otherConditions;
    }

    if (searchConditions.length > 0) {
      query.$and = [query.$and || {}, { $or: searchConditions }];
    }

    let sort =
      parameters?.sortBy === "price-low"
        ? { field: "price", asc: true }
        : parameters?.sortBy === "latest"
        ? { field: "_id", asc: false }
        : parameters?.sortBy === "oldest"
        ? { field: "_id", asc: true }
        : { field: "price", asc: false };
    let sortEquation =
      sort.field === "price" ? (reseller ? "b2bPrice" : "price") : sort.field;

    let items = [];
    if (parameters?.page > 1) {
      items = await Product.find(query)
        .sort(
          sort.field === "_id"
            ? { [sortEquation]: sort.asc ? 1 : -1 }
            : { [sortEquation]: sort.asc ? 1 : -1, _id: 1 }
        )
        .skip((parameters?.page - 1) * 20)
        .limit(20)
        .lean();
    } else {
      items = await Product.find(query)
        .sort(
          sort.field === "_id"
            ? { [sortEquation]: sort.asc ? 1 : -1 }
            : { [sortEquation]: sort.asc ? 1 : -1, _id: 1 }
        )
        .limit(20)
        .lean();
    }

    items = items.map((doc) => {
      const colors = filters?.colors?.filter((d) =>
        doc.fColor?.includes(d?.name)
      );
      return { ...doc, colors };
    });

    console.log("ITEMS => ", items?.length);
    return items;
  } catch (err) {
    console.log(err);
  }
};
