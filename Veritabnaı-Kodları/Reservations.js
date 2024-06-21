// Reservation.js
import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";
const ReservationSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },

  Name: { type: String, required: true },
  Mail: { type: String, required: true },
  Phone: { type: Number, required: true },
  Occasion: { type: String, required: true },
  Time: { type: String, required: true },

  NumberOfHuman: {
    type: Number,
    required: true,
  },

  Resturantid: { type: String, required: true },
  Adderid: { type: String, required: true },
  Approval: { type: Boolean, default: false },
});
const Reservation =
  models.Reservation || model("Reservation", ReservationSchema);

export default Reservation;
