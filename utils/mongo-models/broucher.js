import { model, models, Schema } from "mongoose";

const schema = new Schema(
  {
    name: String,
    image: String,
    link: String,
    type: String,
    flipBookLink: String,
  },
  { timestamps: true }
);

const Broucher = models.Broucher || model("Broucher", schema);
export default Broucher;
