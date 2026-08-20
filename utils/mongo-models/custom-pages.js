import { model, models, Schema } from "mongoose";

const schema = new Schema({
  pages: Schema.Types.Mixed,
  website: { type: String, default: "default" },
});

const CustomPages = models.customPage || model("customPage", schema);
export default CustomPages;
