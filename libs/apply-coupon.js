"use server";

import Coupon from "@/utils/mongo-models/coupons";
import Product from "@/utils/mongo-models/product";
import connectMongo from "@/utils/mongoose";
import moment from "moment";

export const CheckCoupon = async (code, items, isAuth, reseller) => {
  try {
    await connectMongo();

    const products = [];
    for (let i = 0; i < items.length; i++) {
      let item = {
        _id: isAuth ? items[i]._id : items[i].id,
        qty: items[i]?.config?.qty,
        total: items[i]?.cartConfig.total,
      };

      item.data = await Product.findById(items[i]?.product?._id).lean();
      products.push(item);
    }

    const coupon = await Coupon.findOne({
      code,
      qty: { $gte: 0 },
      isActive: true,
      for: reseller ? "b2b" : "b2c",
      maxDate: { $gte: moment().endOf("day") },
    }).lean();

    if (!coupon) {
      throw new Error("Invalid Coupon!");
    }

    let valid = false,
      validOn = [];

    products.forEach((d) => {
      let doc = d.data;

      let isValid = false;
      if (coupon.type === "all") {
        isValid = true;
      } else if (coupon.type === "products") {
        isValid = coupon?.items?.includes(doc._id?.toString());
      } else if (coupon.type === "categories") {
        isValid = doc.category.some((doc) => coupon.items?.includes(doc));
      } else if (coupon.type === "sub-category") {
        isValid = doc.sub.some((doc) => coupon.items?.includes(doc));
      } else if (coupon.type === "sub-type") {
        isValid = doc.subType.some((doc) => coupon.items?.includes(doc));
      } else if (coupon.type === "filter") {
        isValid = doc.fBasic.some((doc) => coupon.items?.includes(doc));
      } else if (coupon.type === "color") {
        isValid = doc.fColor.some((doc) => coupon.items?.includes(doc));
      } else if (coupon.type === "label") {
        isValid = doc.fLabel.some((doc) => coupon.items?.includes(doc));
      } else if (coupon.type === "size") {
        isValid = doc.fSize.some((doc) => coupon.items?.includes(doc));
      } else if (coupon.type === "printing") {
        isValid = doc.fType.some((doc) => coupon.items?.includes(doc));
      }

      if (isValid) {
        validOn.push(d);
      }
    });

    if (validOn?.length > 0) {
      valid = true;
      let total = validOn?.reduce((a, b) => a + b?.total, 0);
      let discount = 0;

      if (total < coupon?.minCart) {
        throw new Error(
          `Shop for AED ${coupon?.minCart - total} more to avail this coupon!`
        );
      }

      if (total > coupon?.maxCart) {
        throw new Error(
          `Shop for under AED ${coupon?.maxCart} to avail this coupon!`
        );
      }

      if (coupon?.discountType === "amount") {
        discount = coupon?.amt;
      } else {
        discount = (total * coupon?.amt) / 100;

        if (discount < coupon?.minAmt) {
          discount = coupon?.minAmt;
        }

        if (discount > coupon?.maxAmt) {
          discount = coupon?.maxAmt;
        }
      }

      return {
        valid,
        discount,
        validOn,
        code,
        couponDetails:
          coupon?.discountType === "amount"
            ? `Flat AED ${coupon?.amt} OFF on select products.`
            : `Flat ${coupon?.amt}% OFF upto AED ${coupon?.maxAmt} on select products.`,
        discountType: coupon.discountType,
        amt: coupon?.amt,
      };
    } else {
      throw new Error("Invalid coupon!");
    }
  } catch (err) {
    console.log(err);
    return { valid: false, err: err?.message };
  }
};
