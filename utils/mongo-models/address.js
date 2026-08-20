import { model, models, Schema } from "mongoose";

const schema = new Schema({
  fName: String,
  lName: String,
  address: String,
  landmark: String,
  country: String,
  state: String,
  area: String,
  zip: String,
  mobile: String,
  mobileCode: String,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const Address = models.Address || model("Address", schema);
export default Address;
