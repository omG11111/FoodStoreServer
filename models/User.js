
const mongoose=require("mongoose");
const Users=new mongoose.Schema({
    email:{type:String},
    password:{type:String},
    

})
const User =new mongoose.model("user",Users,"Users")
module.exports=User;
