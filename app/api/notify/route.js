import {
  SendConfirmEmail,
  SendFailedEmail,
} from "@/utils/mail-templates/order";
import Cart from "@/utils/mongo-models/cart";
import Order from "@/utils/mongo-models/order";
import Product from "@/utils/mongo-models/product";
import connectMongo from "@/utils/mongoose";
import moment from "moment";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    let body = await req.json();
    body = body.data;
    const type = body.object.status;

    if (type !== "complete") {
      throw new Error("Stripe payment pending!");
    }

    if (body.object?.payment_status === "paid") {
      await connectMongo();
      let order = await Order.findOne({
        oid: body.object?.client_reference_id,
      });

      if (!order) {
        throw new Error("Order not found!");
      }

      order.isPaid = true;
      order.status = "confirmed";
      order.statusDates.confirmed = moment().toISOString();
      order.paymentGateway = {
        id: body.object?.id,
        date: moment().toISOString(),
        via: "Stripe",
      };
      order.isProcessed = true;
      order.balance = 0;
      order.paid = +order.total;
      order.paymentStatus = "success";

      let error = [];

      //reduce item quantities
      for (let i = 0; i < order?.items?.length; i++) {
        let item = order.items[i];
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
        await prod.save();
      }

      order.error = error;
      await Cart.findOneAndUpdate(
        { userId: order.userId },
        { $set: { products: [] } }
      );
      await order.save();

      await SendConfirmEmail({ _id: order?._id?.toString() });
    } else {
      await connectMongo();
      let order = await Order.findOne({
        oid: body.object?.client_reference_id,
      });

      order.isPaid = false;
      order.status = "failed";
      order.statusDates.rejected = moment().toISOString();
      order.isProcessed = true;
      order.paymentStatus = "failed";
      await order.save();

      await SendFailedEmail({ _id: order?._id?.toString() });
    }

    return NextResponse.json(
      { success: true, msg: "Order processed!" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { success: false, msg: err?.message ?? "Something went wrong!" },
      { status: 200 }
    );
  }
}
