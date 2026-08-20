import { model, models, Schema } from "mongoose";

const schema = new Schema(
  {
    code: { type: String, unique: true, required: true },
    type: { type: String, required: true },
    discountType: { type: String, required: true },
    minCart: Number,
    maxCart: Number,
    minAmt: Number,
    maxAmt: Number,
    amt: Number,
    items: [String],
    qty: { type: Number, default: 0 },
    used: { type: Number, default: 0 },
    isActive: { type: Boolean, default: false },
    for: { type: String, default: "b2c" },
    maxDate: Date,
  },
  { timestamps: true }
);

const Coupon = models.Coupon || model("Coupon", schema);
export default Coupon;
