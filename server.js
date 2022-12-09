// const { MongoClient } = require("mongodb");
const app = require("express")();
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("express").json;
const port = process.env.PORT || 3000;
const User = require("./models/User");
const cors = require("cors");
const pageobj=require("./routes/pageapis")
// const db=require("./config/db");

mongoose.set("strictQuery", false);
// const uri=process.env.MONGO_URI;
// const client = new MongoClient(uri);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

app.use(bodyParser());
app.use(cors());
app.get("/", async (req, res) => {
  res.send("asdfffffffff");
});
app.use("/page",pageobj.Router)
app.post("/any", async (req, res) => {
  // console.log("hitterdddd seccess",req.ip);

  console.log("req==============ip", req.ip);
  console.log("res========ip", res.ip);
  // res.send("AA")

  let user = new User({
    name: req.body.name,
    email: req.body.email,
  });
  await user.save();

  // let useq=await User.insertOne({
  //     name:req.body.name,
  //     email:"sec"
  // })
  // res.send(useq,use)
  res.json({ message: "seccess", data: user });
});
// db.connectDB()
// app.listen(port,()=>{
//     console.log(`alive at ${port}`);
// })
connectDB().then(() => {
  app.listen(port, () => {
    console.log("listening for requests");
  });
});
