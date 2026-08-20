import { model, models, Schema } from "mongoose";

const schema = new Schema(
  {
    type: String,
    image: String,
  },
  { timestamps: true }
);

const Catalouge = models.Catalouge || model("Catalouge", schema);
export default Catalouge;
