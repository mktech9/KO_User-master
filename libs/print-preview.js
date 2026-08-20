"use server";

import Catalouge from "@/utils/mongo-models/catalogue";
import connectMongo from "@/utils/mongoose";

function groupByField(array, field) {
  return array.reduce((acc, obj) => {
    const key = obj[field];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

export const GetCatalogue = async () => {
  try {
    await connectMongo();
    let items = await Catalouge.find({}).lean();
    items = groupByField(items, "type");

    return items;
  } catch (err) {
    console.log(err);
    return {};
  }
};
