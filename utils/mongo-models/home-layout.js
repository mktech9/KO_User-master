import { model, models, Schema } from "mongoose";
import "./product";

const schema = new Schema({
  meta: {
    title: String,
    description: String,
  },
  desktop: [
    {
      order: Number,
      type: { type: String },
      fullscreen: Boolean,
      height: Number,
      title: String,
      subText: String,
      image: String,
      imageAlt: String,
      images: [Schema.Types.Mixed],
      products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
      link: String,
    },
  ],
  mobile: [
    {
      order: Number,
      type: { type: String },
      fullscreen: Boolean,
      height: Number,
      title: String,
      subText: String,
      link: String,
      image: String,
      imageAlt: String,
      images: [Schema.Types.Mixed],
      products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    },
  ],
  popup: String,
  showPopup: { type: Boolean, default: false },
  website: { type: String, default: "default" },
  layoutType: String,
});

const HomeLayout = models.HomeLayout || model("HomeLayout", schema);
export default HomeLayout;
