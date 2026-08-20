import { model, models, Schema } from "mongoose";

const schema = new Schema({
  useHtmlCode: { type: Boolean, default: false },
  contentBox: String,
  htmlCode: String,
  website: { type: String, default: "default" },
});

const Marketing = models.Marketing || model("Marketing", schema);
export default Marketing;
