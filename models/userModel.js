const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    isAdmin:{type:Boolean,default:false},
    loginCount:{type:Number,default:0},
    isActive:{type:Boolean, default:false}
},{timestamps:true})

const User = mongoose.model("user",userSchema)
module.exports = User