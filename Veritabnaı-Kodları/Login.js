// Login.js
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
