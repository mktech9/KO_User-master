"use server";

import Product from "@/utils/mongo-models/product";
import connectMongo from "@/utils/mongoose";

export const QtyAdjustment = async (items) => {
  try {
    await connectMongo();

    for (let i = 0; i < items?.length; i++) {
      let item = items[i];
      let prod = await Product.findById(item?.product);

      if (!prod) {
        error.push(
          `${item?.productData?.brand} (${item?.productData?.code}) ${item?.productData?.name} is no longer in sale.`
        );
        continue;
      }

      if (prod?.qty < item?.config?.qty) {
        error.push(
          `${item?.productData?.brand} (${item?.productData?.code}) ${item?.productData?.name} does not have required quantity.`
        );
        continue;
      }

      prod.qty = prod.qty - item?.config?.qty;
      prod.reserved = (prod.reserved ?? 0) + item?.config?.qty;
      await prod.save();
    }
  } catch (err) {
    console.log(err);
    throw new Error(err?.message);
  }
};
