import { model, models, Schema } from "mongoose";

const schema = new Schema({
  productDropdown: [Schema.Types.ObjectId],
  others: [Schema.Types.Mixed],
  primaryColor: String,
  tax: Number,
  shipping: Number,
  freeAbove: Number,
  metaTitle: String,
  metaDescription: String,
  website: { type: String, default: "default" },
});

const Header = models.header || model("header", schema);
export default Header;
