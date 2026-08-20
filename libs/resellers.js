"use server";

import Reseller from "@/utils/mongo-models/reseller";
import SalesPerson from "@/utils/mongo-models/sales-person";
import User from "@/utils/mongo-models/user";
import connectMongo from "@/utils/mongoose";

export const GetSalesPersonList = async () => {
  try {
    await connectMongo();
    const items = await SalesPerson.find({}).lean();
    return items;
  } catch (err) {
    console.log(err);
  }
};

export const GetResellerById = async (_id) => {
  try {
    await connectMongo();
    const item = await Reseller.findById(_id).lean();
    return item;
  } catch (err) {
    throw new Error("Not found!");
  }
};

export const UpdateReseller = async (_id, doc) => {
  try {
    await connectMongo();

    await Reseller.findByIdAndUpdate(_id, { $set: doc });
    await User.findOneAndUpdate(
      { resellerId: _id },
      {
        $set: {
          name: doc.companyName,
          number: doc.mobileNo,
        },
      }
    );

    return { success: true };
  } catch (err) {
    throw new Error(err?.message);
  }
};
