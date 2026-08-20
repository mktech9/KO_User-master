import { model, models, Schema } from "mongoose";

const schema = new Schema({
  name: { type: String, unique: true },
  printing: String,
  colors: { type: Number, default: 1 },
  prices: [Schema.Types.Mixed],
});

const PrintPrice = models.printPrice || model("printPrice", schema);
export default PrintPrice;
