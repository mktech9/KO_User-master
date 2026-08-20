import { model, models, Schema } from "mongoose";

const schema = new Schema({
  name: { type: String, unique: true },
  title: String,
  subText: String,
  image: String,
  imageAlt: String,
  content: String,
});

const Category = models.Category || model("Category", schema);
export default Category;
