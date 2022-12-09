const express = require("express");
const Router = express.Router();

const User = require("../models/User");
const jwt = require("jsonwebtoken");


Router.post("/signup", async (req, res) => {
  const userData = req.body;
  const user = new User(userData);
  await user.save((err, registeruser) => {
    {
      if (err) {
        console.log(err,"signup errr");
      } else {
        let payload = { subject: registeruser._id };
        const token = jwt.sign(payload, "secretKey");

        console.log("Success fully register");
        res.status(200).json({ token });
      }
    }
  });
});
Router.post("/login", (req, res) => {
  const userData = req.body;
  User.findOne({ email: userData.email }, (err, loginuser) => {
    if (err) {
      console.log(err, "adaaaaaddddd");
    } else if (!loginuser) {
      res.status(401).send("invaild email");
    } else if (loginuser.password != userData.password) {
      res.status(401).send("wrong password");
    } else {
      payload = { subject: loginuser._id };
      let token = jwt.sign(payload, "secretKey");

      console.log("Successfully login");
      res.status(200).send({ token });
    }
  });
});

const verifyToken=async (req, res, next)=> {
  console.log("one");
  console.log(req, "req");
  if (!req.headers.authorization) {
    console.log("second");
    return res.status(401).send("unauthorized");
  }

  let token = req.headers.authorization.split(" ")[1];
  // app.use(function(req, res, next) {
  //     const pathUrl = req.url.split('?')[0];
  //     let token;
  //     if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
  //      token = req.headers.authorization.split(' ')[1];
  //     } else if (req.query && req.query.token) {
  //      token = req.query.token;
  console.log(token, "toeknes");
  if (token === "null") {
    console.log("null token");
    res.status(401).send("unauthorized request");
  }
  let payload = jwt.verify(token, "secretKey");
  console.log(payload, "palod");
  if (!payload) {
    return res.status(401).send("Unauthotized req");
  }
  console.log("reqaff=>",req)
  req._id = payload.subject;
  next();
}

module.exports = {Router,verifyToken};
