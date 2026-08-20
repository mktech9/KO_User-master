"use server";

import Broucher from "@/utils/mongo-models/broucher";
import HomeLayout from "@/utils/mongo-models/home-layout";
import Product from "@/utils/mongo-models/product";
import connectMongo from "@/utils/mongoose";
const website = process.env.website ?? "default";

export const GetHomeLayout = async () => {
  try {
    await connectMongo();

    let data = await HomeLayout.findOne({ website })
      .populate("desktop.products mobile.products")
      .lean();

    return data;
  } catch (err) {
    console.log(err);
    return {
      desktop: [],
      mobile: [],
    };
  }
};

export const GetCatalouges = async () => {
  try {
    await connectMongo();

    const main = await Broucher.find({ type: "main" }).sort({ _id: -1 }).lean();
    const sections = await Broucher.find({ type: "section" })
      .sort({ _id: -1 })
      .lean();

    return { main, sections };
  } catch (err) {
    console.log(err);
  }
};
