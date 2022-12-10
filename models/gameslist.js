
const mongoose=require("mongoose");
const Games=new mongoose.Schema({
    name:{type:String},
    type:{type:String},
    category:{type:String}

})
const Game =new mongoose.model("Games",Games)
module.exports=Game;
