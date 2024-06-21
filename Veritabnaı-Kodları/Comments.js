// Comments.js
import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";

const CommentsSchema = new Schema({
  Text: {
type: String,
 required: true,
  },
addername: { type: String },
image: { type: String },
Resturantid: { type: String },
Likes: { type: Number },
Likesid: { type: [String], default: [] },});
const Comments = models.Comments || model("Comments", CommentsSchema);

export default Comments;
