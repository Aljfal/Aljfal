// Meals.js
import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";

const MealsSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  Rate: {
    type: Number,
    default:0,
  },
  Price: {
    type: Number,
    required: true,
  },
  image: { type: String },
  Resturantid: { type: String, required: true },
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
const Meals = models.Meals || model("Meals", MealsSchema);

export default Meals;
