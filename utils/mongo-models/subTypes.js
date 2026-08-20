import { model, models, Schema } from "mongoose";

const schema = new Schema({
  name: String,
  title: String,
  subText: String,
  parent: String,
  parentRef: { type: Schema.Types.ObjectId, ref: "subCategory" },
  content: String,
});

const SubType = models.subType || model("subType", schema);
export default SubType;
