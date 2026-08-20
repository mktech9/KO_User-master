import { model, models, Schema } from "mongoose";

const schema = new Schema({
  name: String,
  title: String,
  subText: String,
  parent: String,
  parentRef: { type: Schema.Types.ObjectId, ref: "Category" },
  content: String,
});

const SubCategory = models.subCategory || model("subCategory", schema);
export default SubCategory;
