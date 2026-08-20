import { model, models, Schema } from "mongoose";

const schema = new Schema(
  {
    name: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    tag: { type: String, unique: true },
    mobileNo: String,
    contactEmail: String,
    contactNumber: String,
    color: String,
    secondaryColor: String,
    url: String,
    date: Date,
    logo: Schema.Types.Mixed,
    isActive: { type: Boolean, default: false },
    commission: { type: Number, default: 0 },
    commissionType: { type: String, default: "percent" },
    favicon: Schema.Types.Mixed,
    about: String,
    socialMedia: {
      fb: String,
      ig: String,
      yt: String,
      tw: String,
    },
    footerText: String,
    address: String,
    increment: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Vendor = models.vendor || model("vendor", schema);
export default Vendor;
