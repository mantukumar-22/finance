import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required : [true, "Enter your name"],
        maxLen : 8,
        minLen : 5
    },
    email: {
        type : String,
        required : [true, "Enter your email"],
        unique : true
    },
    password:{
        type : String ,
        required : [true, "Enter your password"],
        unique : true,
        maxLen : 8,
        minLen : 5,
    },
    role : {
        type : String,
        enum : ["viewer", "analyst", "admin"],
        default : "viewer"
    },
    isActive: { 
        type: Boolean, 
        default: true 
    }

}, {timestamps : true});

const userModel = mongoose.model('user', userSchema);

export default userModel;