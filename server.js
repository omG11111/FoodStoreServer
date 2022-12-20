// const { MongoClient } = require("mongodb");
require("./routes/socketapi");
const app = require("express")();
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("express").json;
const port = process.env.PORT || 3000;
const User = require("./models/User");
const cors = require("cors");
const pageobj = require("./routes/pageapis");
const mailer = require("express-mailer");
const gamesRouter = require("./routes/gameslist");
// const db=require("./config/db");
app.use(cors());
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

mailer.extend(app, {
  from: "no-reply@example.com",
  host: "smtp.gmail.com",
  secureConnection: true,
  port: 465,
  transportMethod: "SMTP",
  auth: {
    user: "gamestore.app.mk@gmail.com",
    pass: "zgqfdmkkblmgiuqd",
  },
});
app.set("email", "/views");
app.set("view engine", "jade");
app.get("/", async (req, res) => {
  res.send("asdfffffffff");
});
app.use("/games", gamesRouter);
app.post("/sendSignupMail", async (req, res, next) => {
  let email = req.body.email;

  app.mailer.send(
    "email",
    {
      to: email, // REQUIRED. This can be a comma delimited string just like a normal email to field.
      subject: "Test Email", // REQUIRED.
      name:req.body.name,
      password:req.body.password,
      otherProperty: "heloooooooooooaaaaaaaaaaaaaaaaaaaaaaaaaaa", // All additional properties are also passed to the template as local variables.
    },
    function (err) {
      if (err) {
        // handle error
        // console.log(err);
        res.json("There was an error sending the email");
        // res.send('There was an error sending the email');
        return;
      }
      res.json("Email Sent");
      console.log(
        "adaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa======>>>>>>>>>>>>>>>>>>>>>>>>.",
        email
      );
    }
  );

  //res.send("emailnotyet")
});

app.use("/page", pageobj.Router);
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
    console.log("listening for requests",port);
  });
});
// connectDB().then(() => {
//   app.listen(3001, () => {
//     console.log("listening for requests");
//   });
// });
