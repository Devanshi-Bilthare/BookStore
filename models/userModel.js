const mongoose = require('mongoose')
const plm = require('passport-local-mongoose')

const userModel = new mongoose.Schema({
    name:{
       type:String,
       required:[true,"name is Required"],
       minLength:[2,"name must be 2 character long"],
       trim:true 
    },
    username:{
        type:String,
       required:[true,"name is Required"],
       minLength:[2,"name must be 2 character long"],
       unique:true,
       trim:true 
    },
    email:{
        type:String,
        required:[true,"email is Required"],
        trim:true,
        unique:true,
        RegExp:['/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/',"Email must be correct"]
     },
     books:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'book'
     }],
     password:{
        type:String
     }
},{timestamps:true})

userModel.plugin(plm)

const user = mongoose.model('bookuser',userModel)

module.exports = user