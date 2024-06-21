// OwnerRequests.js
import { Schema, model, models } from "mongoose";
const OwnerRequestsSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  Name: { type: String, required: true },
  Mail: { type: String, required: true, unique: true, trim: true },
  Phone: { type: Number, required: true, },
  Message: { type: String, required: true },
});
const OwnerRequests =
  models.OwnerRequests || model("OwnerRequests", OwnerRequestsSchema);

export default OwnerRequests;
