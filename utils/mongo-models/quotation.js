import { model, models, Schema } from "mongoose";

const schema = new Schema(
  {
    no: String,
    reseller: { type: Schema.Types.ObjectId, ref: "Reseller" },
    items: [Schema.Types.Mixed],
    summary: Schema.Types.Mixed,
    website: { type: String, default: "default" },
    tag: { type: String, default: "super" },
  },
  { timestamps: true }
);

const Quotation = models.Quotation || model("Quotation", schema);
export default Quotation;
