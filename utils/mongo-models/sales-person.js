import { model, models, Schema } from "mongoose";

const schema = new Schema(
  {
    name: String,
    email: { type: String, unique: true },
  },
  { timestamps: true }
);

const SalesPerson = models.salesPerson || model("salesPerson", schema);
export default SalesPerson;
