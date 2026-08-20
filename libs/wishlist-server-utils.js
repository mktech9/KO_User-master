"use server";

import { GetUserRef } from "@/auth";
import Product from "@/utils/mongo-models/product";
import Wishlist from "@/utils/mongo-models/wishlist";
import connectMongo from "@/utils/mongoose";

export const AddToWishlist = async ({ userId, id }) => {
  try {
    await connectMongo();
    const items = await Wishlist.findOneAndUpdate(
      { userId },
      { $push: { products: id } },
      { upsert: true, new: true }
    ).lean();

    return items;
  } catch (err) {
    console.log(err);
    throw new Error(err?.message);
  }
};

export const RemoveFromWishlist = async ({ userId, id }) => {
  try {
    await connectMongo();
    const items = await Wishlist.findOneAndUpdate(
      { userId },
      { $pull: { products: id } },
      { upsert: true, new: true }
    ).lean();

    return items;
  } catch (err) {
    throw new Error(err?.message);
  }
};

export const GetItems = async () => {
  try {
    const userId = await GetUserRef();

    if (!userId) {
      return [];
    }

    await connectMongo();
    const items = await Wishlist.findOne({ userId }).lean();

    if (items) {
      return items?.products ?? [];
    }
  } catch (err) {
    throw new Error(err?.message);
  }
};

export const GetPopulatedItems = async (wishlist) => {
  try {
    await connectMongo();
    const items = await Product.find({ _id: { $in: wishlist } }).lean();
    return items;
  } catch (err) {
    console.log(err);
    return [];
  }
};
