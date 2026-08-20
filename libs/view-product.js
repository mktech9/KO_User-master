"use server";

import { GetUserRef } from "@/auth";
import { csActive, rsActive } from "@/config";
import Filter from "@/utils/mongo-models/filters";
import PrintPrice from "@/utils/mongo-models/printPrice";
import Product from "@/utils/mongo-models/product";
import Review from "@/utils/mongo-models/review";
import connectMongo from "@/utils/mongoose";

export const GetSingleProduct = async (id) => {
  try {
    await connectMongo();

    //get product
    let product = await Product.findById(id)
      .populate({
        path: "relatedProducts",
        select: "_id brand name b2bPrice price images",
      })
      .lean();

    if (!product || !product.isActive) {
      return { product: null, colors: [], printOptions: {} };
    }

    product.relatedProducts = product.relatedProducts?.filter(
      (doc) => doc._id?.toString() !== id.toString()
    );

    for (let i = 0; i < product?.relatedProducts?.length; i++) {
      let idz = product.relatedProducts[i];
      product.relatedProducts[i] = await Product.findById(idz)
        .select("_id brand name b2bPrice price images")
        .lean();
    }

    //get color options
    const colors = await Filter.find({ name: { $in: product.fColor } }).lean();

    //get printing options
    const prints = await PrintPrice.find({ _id: { $in: product.priceTag } });

    //assign print data to print options
    if (product.priceObject) {
      prints.forEach((doc) => {
        if (product.priceObject[doc._id]) {
          product.priceObject[doc._id].data = doc;
        }
      });
    }

    return { product, colors, printOptions: product.priceObject ?? {} };
  } catch (err) {
    console.log(err);
    return { product: null, colors: [], printOptions: {} };
  }
};

export const GetSingleProductByCode = async (code, configs, reseller) => {
  try {
    await connectMongo();
    const isActiveField = reseller ? rsActive : csActive;

    let query = { code };

    if (configs?.label && configs.label !== "super") {
      query.disabledFor = { $ne: configs.label };
    }

    //get product
    let product = await Product.findOne(query)
      .populate({
        path: "relatedProducts",
        select: "_id brand name b2bPrice price code images fColor",
      })
      .lean();

    if (!product || !product.active || !product.active[isActiveField]) {
      return { product: null, colors: [], printOptions: {} };
    }

    //get color options
    const colors = await Filter.find({ name: { $in: product.fColor } }).lean();

    //get printing options
    const prints = await PrintPrice.find({ _id: { $in: product.priceTag } });

    //assign print data to print options
    if (product.priceObject) {
      prints.forEach((doc) => {
        if (product.priceObject[doc._id]) {
          product.priceObject[doc._id].data = doc;
        }
      });
    }

    return { product, colors, printOptions: product.priceObject ?? {} };
  } catch (err) {
    console.log(err);
    return { product: null, colors: [], printOptions: {} };
  }
};

export const SubmitReview = async (doc, product) => {
  try {
    await connectMongo();

    const review = {
      prodId: product._id,
      rating: doc.rating,
      review: doc.review,
      userId: {
        name: doc.name,
        email: doc.email,
      },
    };

    await new Review(review).save();
    return true;
  } catch (err) {
    console.log(err);
    throw new Error(err?.message);
  }
};

export const GetReviews = async (id) => {
  try {
    await connectMongo();

    const items = await Review.find({
      prodId: id,
      isActive: true,
      rejected: false,
    })
      .populate("userId")
      .lean();
    let total = 0,
      length = items?.length,
      grouped = {
        five: 0,
        four: 0,
        three: 0,
        two: 0,
        one: 0,
      };

    items.forEach((doc) => {
      if (doc.rating === 1) {
        grouped.one += 1;
      } else if (doc.rating === 2) {
        grouped.two += 1;
      } else if (doc.rating === 3) {
        grouped.three += 1;
      } else if (doc.rating === 4) {
        grouped.four += 1;
      } else {
        grouped.five += 1;
      }

      total += doc.rating;
    });

    const totalRating = (total / length).toFixed(1) ?? 0;
    return {
      items,
      total,
      length,
      grouped,
      totalRating,
    };
  } catch (err) {
    console.log(err);
    throw new Error(err?.message);
  }
};
