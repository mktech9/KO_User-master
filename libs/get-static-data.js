"use server";

import CustomPages from "@/utils/mongo-models/custom-pages";
import Static from "@/utils/mongo-models/static";
const website = process.env.website;

export const GetStaticData = async (page) => {
  try {
    const data = await Static.findOne({ website }).select(`${page}`).lean();
    return data[page];
  } catch (err) {
    console.log(err);
    return "";
  }
};

export const GetStaticDataTags = async (page) => {
  try {
    const data = await Static.findOne({ website }).select(`meta`).lean();
    return data?.meta[page];
  } catch (err) {
    console.log(err);
    return "";
  }
};

export const GetCustomData = async (page) => {
  try {
    const data = await CustomPages.findOne({ website }).lean();
    return data?.pages?.[page] ?? { title: "Something went wrong", value: "" };
  } catch (err) {
    console.log(err);
    return "";
  }
};
