import { Schema, model, models } from "mongoose";

const GallarySchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  image: { type: String },
  Resturantid:{ type: String ,required:true},
});
const Gallary = models.Gallary || model("Gallary", GallarySchema);

export default Gallary;
