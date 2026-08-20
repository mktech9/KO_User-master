import { model, models, Schema } from "mongoose";

const schema = new Schema(
  {
    userId: { name: String, email: String },
    prodId: { type: Schema.Types.ObjectId, ref: "Product" },
    rating: Number,
    review: String,
    approved: { type: Boolean, default: false },
    rejected: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Review = models.Review || model("Review", schema);
export default Review;
