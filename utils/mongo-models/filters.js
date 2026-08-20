import { model, models, Schema } from "mongoose";

const schema = new Schema({
  name: String,
  type: String,
  tag: String,
});

const Filter = models.Filter || model("Filter", schema);
export default Filter;
