"use server";

import { GetUserRef } from "@/auth";
import Cart from "@/utils/mongo-models/cart";
import PrintPrice from "@/utils/mongo-models/printPrice";
import Product from "@/utils/mongo-models/product";
import connectMongo from "@/utils/mongoose";

export const AddtoCart = async ({ item }) => {
  try {
    const _id = await GetUserRef();

    console.log(item);

    await connectMongo();
    let items = await Cart.findOneAndUpdate(
      { userId: _id },
      { $push: { products: item } },
      { upsert: true, new: true }
    )
      .populate("products.product products.print")
      .lean();

    items = items.products?.filter((doc) => {
      return doc.product?._id;
    });

    return items;
  } catch (err) {
    console.log(err);
  }
};

export const RemoveFromCart = async (id) => {
  try {
    const _id = await GetUserRef();

    await connectMongo();
    let items = await Cart.findOneAndUpdate(
      { userId: _id },
      { $pull: { products: { _id: id } } },
      { new: true }
    )
      .populate("products.product products.print")
      .lean();

    items = items.products?.filter((doc) => {
      return doc.product?._id;
    });

    return items;
  } catch (err) {
    console.log(err);
  }
};

export const GetItems = async () => {
  try {
    const _id = await GetUserRef();

    await connectMongo();
    let items = await Cart.findOne({ userId: _id })
      .populate("products.product products.print")
      .lean();

    items = items.products?.filter((doc) => {
      return doc.product?._id;
    });

    return items;
  } catch (err) {
    console.log(err);
  }
};

export const PopulateLocalCart = async (item) => {
  try {
    await connectMongo();
    let items = item;

    for (let i = 0; i < items?.length; i++) {
      let productId = items[i]?.product;
      items[i].product = await Product.findById(productId).lean();
      items[i].print = await PrintPrice.findById(items[i]?.print).lean();
    }

    items = items.filter((doc) => {
      return doc.product?._id;
    });

    return items;
  } catch (err) {
    console.log(err);
  }
};

export const ChangeQuantity = async (inc, itemId, v) => {
  try {
    const _id = await GetUserRef();
    await connectMongo();

    let query = { $inc: { "products.$.config.qty": inc ? 1 : -1 } };
    if (v > 0) {
      query = { $set: { "products.$.config.qty": v } };
    }

    let items = await Cart.findOneAndUpdate(
      { userId: _id, "products._id": itemId },
      query,
      { new: true }
    )
      .populate("products.product products.print")
      .lean();

    items = items.products?.filter((doc) => {
      return doc.product?._id;
    });

    return items;
  } catch (err) {
    console.log(err);
  }
};
