import { model, models, Schema } from "mongoose";

const schema = new Schema(
  {
    name: String,
    email: String,
    mobile: String,
    message: String,

    enquiryNo: {
      type: String,
      unique: true,
      index: true,
    },

    isResolved: {
      type: Boolean,
      default: false,
    },

    tag: {
      type: String,
      default: "super",
    },

    website: {
      type: String,
      default: "default",
    },
  },
  { timestamps: true },
);

const Contact = models.Contact || model("Contact", schema);

export default Contact;
