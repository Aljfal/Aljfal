// Employee.js
import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";

const EmployeeSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: { type: String },
  Resturantid: { type: String, required: true },
});
const Employee = models.Employee || model("Employee", EmployeeSchema);

export default Employee;
