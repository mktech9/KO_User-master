import { model, models, Schema } from "mongoose";
import "./user";
import "./product";
import "./printPrice";

const schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        print: { type: Schema.Types.ObjectId, ref: "printPrice" },
        config: Schema.Types.Mixed,
      },
    ],
  },
  { timeseries: true }
);

const Cart = models.Cart || model("Cart", schema);
export default Cart;
