// Resturants.js
import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";

const ResturantsSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Ownername: {
    type: String,
    required: true,
  },
  Ownerid: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  Adress: {
    type: String,
    required: true,
  },
  Mail: {
    type: String,
    required: true,
  },
  Logo:{
    type: String,
    required: true,
  },
  image:{
    type: String,
    required: true,
  },
  Rate:{
    type: Number,
    default:0,
  },
  items: [
    {
      Rate:{
        type: Number,
        default:0,
      },
      RateAdderid:{
        type: String,
        default:0,
      },
    },
  ],
});
const Resturants = models.Resturants || model("Resturants", ResturantsSchema);

export default Resturants;