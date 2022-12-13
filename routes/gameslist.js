const express = require("express");
const pageRouter=require('./pageapis');


// const mongoose=require("mongoose")
const Router = express.Router();
const Game = require("../models/gameslist");


// db.collection.find( { field: value }, { array: {$slice: count| [skip, limit] } } );
Router.get("",pageRouter.verifyToken,async(req,res)=>{
  try {
    const type=req.query.type ?  req.query.type :  "";
    let games;
    if(type!=""){
      games= await Game.find({type:req.query.type});
      
    }else{
      games= await Game.find();

    }
    const limit=req.query.limit;
    const total=games.length;
    if(limit && limit!=0){
      games=games.slice(0,limit);
    }else{
      games=games.slice(0,0);
      
    }
    res.json({data:games,totalRecords:total});
    
  } catch (error) {
    res.send(error);

    
  }
})

Router.post("/add", async(req,res) => {
  const game =new Game({
    name: req.body.name,
    type:req.body.type,
    category:req.body.category
  });

  try {
    const gameres = await game.save();

    res.json(gameres);
    
  } catch (error) {
    res.send(error);
  }
});
Router.get("/:id",async(req,res)=>{
  try {
    const game =await Game.findById(req.params.id);
    res.json(game);
    
  } catch (error) {
    res.send(error)
    
  }
});
Router.patch("/:id",async(req,res)=>{
  try {
    const game=await Game.findById(req.params.id);
    game.name=req.body.name;
    game.type=req.body.type,
    game.category=req.body.category
    res.json(game.name);
    
    const g=await game.save();
   
    
  } catch (error) {
    res.send(error);
    
  }
});
Router.delete("/:id",async(req,res)=>{
  try {
    const game=await Game.findByIdAndDelete(req.params.id);
    res.json(game)
    
    
  } catch (error) {
    res.send(error)
    
  }
})

module.exports = Router;
