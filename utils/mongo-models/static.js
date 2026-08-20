import { model, models, Schema } from "mongoose";

const schema = new Schema({
  terms: String,
  about: String,
  shipping: String,
  privacy: String,
  refund: String,
  contact: String,
  meta: {
    terms: {
      title: String,
      description: String,
    },
    about: {
      title: String,
      description: String,
    },
    shipping: {
      title: String,
      description: String,
    },
    privacy: {
      title: String,
      description: String,
    },
    refund: {
      title: String,
      description: String,
    },
    contact: {
      title: String,
      description: String,
    },
  },
  website: { type: String, default: "default" },
});

const Static = models.static || model("static", schema);
export default Static;
