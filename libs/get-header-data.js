"use server";

import Header from "@/utils/mongo-models/header";
import connectMongo from "@/utils/mongoose";
import Footer from "@/utils/mongo-models/footer";
const website = process.env.website;

export const GetTax = async () => {
  try {
    await connectMongo();
    const item = await Header.findOne({ website }).lean();

    return {
      tax: item?.tax,
      shipping: {
        freeAbove: item?.freeAbove,
        charges: item?.shipping,
      },
    };
  } catch (err) {
    return {
      tax: 5,
      shipping: {
        freeAbove: 1000,
        charges: 99,
      },
    };
  }
};

export const GetMetadataTags = async () => {
  try {
    await connectMongo();
    const item = await Header.findOne({ website }).lean();

    return {
      title: item.metaTitle,
      description: item.metaDescription,
    };
  } catch (err) {
    return {
      tax: 5,
      shipping: {
        freeAbove: 1000,
        charges: 99,
      },
    };
  }
};

export const GetFooterData = async () => {
  try {
    await connectMongo();
    const item = await Footer.findOne({ website }).lean();

    return item;
  } catch (err) {
    return null;
  }
};

export const GetColor = async () => {
  try {
    await connectMongo();
    const item = await Header.findOne({ website }).lean();
    let color = item?.primaryColor,
      secondaryColor = item?.secondaryColor;
    return {
      primaryColor: [
        color,
        color,
        color,
        color,
        color,
        color,
        color,
        color,
        color,
        color,
      ],
      secondaryColor: [
        secondaryColor,
        secondaryColor,
        secondaryColor,
        secondaryColor,
        secondaryColor,
        secondaryColor,
        secondaryColor,
        secondaryColor,
        secondaryColor,
        secondaryColor,
      ],
    };
  } catch (err) {
    return {
      primaryColor: [
        "#e09258",
        "#e09258",
        "#e09258",
        "#e09258",
        "#e09258",
        "#e09258",
        "#e09258",
        "#e09258",
        "#e09258",
        "#e09258",
      ],
      secondaryColor: [
        "#495abe",
        "#495abe",
        "#495abe",
        "#495abe",
        "#495abe",
        "#495abe",
        "#495abe",
        "#495abe",
        "#495abe",
        "#495abe",
      ],
    };
  }
};

export const GetHeaderData = async () => {
  try {
    await connectMongo(); // Ensure MongoDB connection is established

    // Fetch dropdown data using a single optimized aggregation pipeline
    const [dropdownData, others] = await Promise.all([
      await Header.aggregate([
        { $match: { website } }, // Filter by website
        { $unwind: "$productDropdown" }, // Unwind productDropdown array
        {
          $lookup: {
            from: "categories",
            localField: "productDropdown",
            foreignField: "_id",
            as: "category",
          },
        },
        { $unwind: "$category" }, // Unwind category (assuming 1:1 relationship)
        {
          $lookup: {
            from: "subcategories",
            localField: "category._id",
            foreignField: "parentRef",
            as: "subcategories",
          },
        },
        {
          $unwind: { path: "$subcategories", preserveNullAndEmptyArrays: true },
        }, // Preserve categories without subcategories
        {
          $lookup: {
            from: "subtypes",
            localField: "subcategories._id",
            foreignField: "parentRef",
            as: "subtypes",
          },
        },
        {
          $group: {
            _id: "$category._id",
            name: { $first: "$category.name" },
            title: { $first: "$category.title" },
            subText: { $first: "$category.subText" },
            image: { $first: "$category.image" },
            subcategories: {
              $push: {
                _id: "$subcategories._id",
                name: "$subcategories.name",
                subtypes: "$subtypes",
              },
            },
          },
        },
        { $sort: { _id: 1 } }, // Sort by category ID
      ]),
      await Header.findOne({ website }).select("others").lean(),
    ]);

    return {
      categories: dropdownData,
      others: others?.others || [], // Fallback to empty array if "others" is undefined
    };
  } catch (err) {
    console.error("Error in GetHeaderData:", err);
    return { categories: [], others: [] }; // Return fallback data in case of error
  }
};

export default GetHeaderData;
