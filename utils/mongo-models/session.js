import { model, models, Schema, connection } from "mongoose";

const schema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    expires_at: {
      type: Date,
      required: true,
    },
  },
  { timeseries: true }
);

const Session = models?.Session || model("Session", schema);
export default Session;
