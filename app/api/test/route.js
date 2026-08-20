import { SendConfirmEmail } from "@/utils/mail-templates/order";
import Cart from "@/utils/mongo-models/cart";
import Order from "@/utils/mongo-models/order";
import Product from "@/utils/mongo-models/product";
import connectMongo from "@/utils/mongoose";
import moment from "moment";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    let body = await req.json();
    let id = body.id;

    await connectMongo();
    const order = await Order.findById(id).lean();

    await SendConfirmEmail(order);
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
