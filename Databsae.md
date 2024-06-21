# NOT:bütün kodlar ekledim

# // Comments.js
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
  Likesid: { type: [String], default: [] },
});
const Comments = models.Comments || model("Comments", CommentsSchema);

export default Comments;
.............................................................................
# // Employee.js
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
.................................................................................
# // Gallary
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
......................................................................................
# // Login.js
import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";

const loginSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    
    Mail: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    Password: {
        type: String,
        required: true,
    },
    PhoneNumber: {
        type: String,
        required: true,
    },
    Adress: {
        type: String,
        required: true,
    },
    Gender: {
        type: String,
        required: true,
    },   
    type: {
        type: String,
        default:"Customer"
    },     
    image: {
        type: String,
    },
    resturant:{
        type: String,
        default:" "
    }
});
const Login = models.Login || model('Login', loginSchema);

export default Login;
..........................................................................................
# // Meals.js
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
.....................................................................................................
# // OwnerRequests.js
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
............................................................................................................
# // Reservation.js
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
.........................................................................................
# // Resturants.js
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
