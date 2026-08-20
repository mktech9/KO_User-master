import { model, models, Schema } from "mongoose";

const schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
  items: [Schema.Types.Mixed],
  oid: { type: String, unique: true },
  coupon: Schema.Types.Mixed,
  summary: {
    subTotal: Number,
    discount: Number,
    tax: Number,
    total: Number,
    shipping: Number,
  },
  total: Number,
  deliveryType: String,
  address: Schema.Types.Mixed,
  forDate: Date,
  status: { type: String, default: "pending" },
  statusDates: {
    confirmed: Date,
    packed: Date,
    dispatched: Date,
    delivered: Date,
    rejected: Date,
  },
  paymentGateway: Schema.Types.Mixed,
  isPaid: { type: Boolean, default: false },
  isProcessed: { type: Boolean, default: false },
  customer: {
    fullName: String,
    email: String,
    mobileNo: String,
    mobileCode: String,
  },
  tracking: Schema.Types.Mixed,
  error: [String],
  tag: { type: String, default: "super" },
  commission: Number,
  payLater: { type: Boolean, default: false },
  balance: { type: Number, default: 0 },
  paid: { type: Number, default: 0 },
  isResellerAccount: { type: Boolean, default: false },
  paymentStatus: { type: String, default: "pending" },
  salesPerson: { type: Schema.Types.ObjectId, ref: "salesPerson" },
  website: { type: String, default: "default" },
});

const Order = models.Order || model("Order", schema);
export default Order;
