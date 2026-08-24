import { NextResponse } from "next/server";
import connectMongo from "@/utils/mongoose";
import Product from "@/utils/mongo-models/product";

export async function GET(request, { params }) {
  try {
    await connectMongo();

    const product = await Product.findOne({
      code: params.code,
    }).lean();

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}