import { model, models, Schema } from "mongoose";

const schema = new Schema({
  name: { type: String, unique: true },
});

const Delivery = models.Delivery || model("Delivery", schema);
export default Delivery;
