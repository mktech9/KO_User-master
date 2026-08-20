"use server";

import { GetUserRef, checkIsAuthValid } from "@/auth";
import { HandleNotAuthenticated } from "./create-user";
import User from "@/utils/mongo-models/user";
import { CartValidation } from "./cart-validation";
import { generateUniqueString } from "./generate-oid";
import Order from "@/utils/mongo-models/order";
import { GetTax } from "../get-header-data";
import { createPaymentLink } from "./stripe";
import { QtyAdjustment } from "./qty-adjustment";
import Cart from "@/utils/mongo-models/cart";
import Reseller from "@/utils/mongo-models/reseller";
import { SetLabel } from "@/app/labels-async";
import { SendReservedEmail } from "@/utils/mail-templates/order";
const website = process.env.website;

export const PlaceOrder = async (
  items,
  summary,
  userData,
  address,
  orderType,
  orderAddress,
  isReseller,
  payLater
) => {
  try {
    const vendorData = await SetLabel();
    const isAuth = await checkIsAuthValid();
    const { tax, shipping: shipConfigs } = await GetTax();
    let user;

    //if not autenticated
    if (!isAuth) {
      user = await HandleNotAuthenticated(userData, address, vendorData?.label);
    } else {
      let userId = await GetUserRef();
      user = await User.findById(userId);
    }

    const reseller = user?.userType === "reseller" && user.isApproved;

    console.log(reseller);

    //check cart-items validation
    const cartRes = await CartValidation(items, reseller, vendorData.label);

    //cart-validation error messages
    if (!cartRes.success) {
      if (cartRes?.outOfStock?.length > 0) {
        throw new Error(
          "Some products are no longer in stock or is exceeding available quantity!"
        );
      }

      if (cartRes?.tampered?.length > 0) {
        throw new Error("It seems like your cart data is invalid!");
      }

      if (cartRes?.invalid?.length > 0) {
        throw new Error(
          "The printing type selected in some products are no longer in service!"
        );
      }
    }

    let cartItems = cartRes.cartItems;

    //calculate subtotal
    let subtotal = 0,
      discount = summary?.coupon?.discount ?? 0,
      vat = 0,
      total = 0,
      shipping = 0;

    subtotal = cartItems?.reduce((a, b) => a + b?.cartConfig?.total, 0);
    vat = (subtotal * tax) / 100;
    shipping =
      orderType === "pickup"
        ? 0
        : isReseller
        ? 0
        : subtotal < shipConfigs.freeAbove
        ? shipConfigs.charges
        : 0;
    total = (subtotal + +vat + shipping - +discount).toFixed(2);

    let commission = cartItems?.reduce((a, b) => a + b?.commission, 0);
    console.log(commission);

    //generate order id
    const oid = generateUniqueString();

    const orderDoc = {
      userId: user._id,
      date: new Date(),
      items: cartItems,
      oid,
      coupon: summary?.coupon ?? {},
      summary: {
        subTotal: subtotal,
        discount: discount,
        tax: vat,
        total,
        shipping,
      },
      total,
      deliveryType: orderType,
      address: orderAddress,
      forDate: new Date(summary?.date),
      status: "pending",
      isPaid: false,
      isProcessed: false,
      customer: {
        fullName: user?.name,
        email: user?.username,
        mobileNo: user.number,
        mobileCode: user?.countryCode,
      },
      commission: commission,
      tag: vendorData.label,
      isResellerAccount: isReseller,
      balance: Math.ceil(total),
      website,
    };

    if (isReseller) {
      const resellerData = await Reseller.findById(user.resellerId).select(
        "mtc"
      );
      orderDoc.salesPerson = resellerData.mtc;
    }

    //adjust order quantity
    if (payLater) {
      orderDoc.paid = 0;
      orderDoc.payLater = true;

      await QtyAdjustment(cartItems);
    }

    const newOrder = new Order(orderDoc);
    //generate payment address
    await newOrder.save();

    if (payLater) {
      await Cart.findOneAndUpdate(
        { userId: user._id },
        { $set: { products: [] } }
      );

      await SendReservedEmail({ _id: newOrder._id });
      return { success: true, oid: newOrder.oid, user, payLater: true };
    }

    const paymentLink = await createPaymentLink(orderDoc);

    return {
      success: true,
      oid: newOrder.oid,
      user,
      paymentLink,
      payLater: false,
    };
  } catch (err) {
    console.log(err);
    return { success: false, message: err?.message ?? "Something went wrong!" };
  }
};
