import { model, models, Schema } from "mongoose";

const schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    products: [String],
  },
  { timestamps: true }
);

const Wishlist = models.Wishlist || model("Wishlist", schema);
export default Wishlist;
