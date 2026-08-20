import { model, models, Schema } from "mongoose";

const schema = new Schema({
  items: [
    {
      order: Number,
      title: String,
      items: [Schema.Types.Mixed],
    },
  ],
  website: { type: String, default: "default" },
});

const Footer = models.Footer || model("Footer", schema);
export default Footer;
