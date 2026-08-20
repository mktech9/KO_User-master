import { model, models, Schema } from "mongoose";

const schema = new Schema(
  {
    name: String,
    id: String,
    username: { type: String, unique: true },
    number: String,
    countryCode: String,
    type: { type: String, default: "local" },
    password: String,
    userType: { type: String, default: "customer" },
    isApproved: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
    resellerId: { type: Schema.Types.ObjectId, ref: "Reseller" },
    tag: { type: String, default: "super" },
    token: String,
  },
  { timestamps: true }
);

const User = models.User || model("User", schema);
export default User;
