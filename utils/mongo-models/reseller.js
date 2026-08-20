import { model, models, Schema } from "mongoose";

const schema = new Schema(
  {
    shippingAsBilling: { type: Boolean, default: true },
    mtc: { type: Schema.Types.ObjectId, ref: "salesPerson" },
    companyName: String,
    comContact: String,
    purchaseMobileNumber: String,
    purchaseEmail: String,
    purchaseNo: String,
    accPerson: String,
    accMobileNo: String,
    accEmail: String,
    mobileNo: String,
    emailId: String,
    emailId2: String,
    emailIdOptional: String,
    billCountry: String,
    billAddress: String,
    billCity: String,
    shipCountry: String,
    shipAddress: String,
    shipCity: String,
    active: { type: Boolean, default: false },
    approved: { type: Boolean, default: false },
    pass: String,
    date: { type: Date, default: new Date() },
    payLater: { type: Boolean, default: String },
    whatsappOptional: String,
    resetPassword: { type: Boolean, default: true },
    tag: { type: String, default: "super" },
    website: { type: String, default: "default" },
  },
  { timestamps: true }
);

const Reseller = models.Reseller || model("Reseller", schema);
export default Reseller;
