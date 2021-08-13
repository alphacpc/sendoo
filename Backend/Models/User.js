const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstname:{
        type : String,
        required : true
    },
    lastname:{
        type : String,
        required : true
    },
    username:{
        type : String,
        required : true,
        unique : true
    },
    phone:{
        type : String,
        required : false,
        unique : true
    },
    job:{
        type : String,
        required : false
    },
    country:{
        type : String,
        required : false
    },
    fullAdress:{
        type : String,
        required : false
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    profilePic:{
        type : String,
        default : ""
    }
},
{ timestamps : true })

module.exports = mongoose.model("User", UserSchema);