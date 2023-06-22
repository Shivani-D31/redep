const express = require("express");
const userRoute = express.Router();
const { UserModel } = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRoute.get("/", (req, res) => {
  res.send("User Registration");
});

userRoute.post("/register", async (req, res) => {
  const { name, email, gender, pass } = req.body;
  try {
    const findUser = await UserModel.find({ email });
    if (findUser.length === 0) {
      bcrypt.hash(pass, 3, async (err, hashed_pass) => {
        if (err) {
          res.send({ msg: "error occured", err });
        } else {
          let user = new UserModel({ name, email, gender, pass: hashed_pass });
          await user.save();
          res.send({ msg: "User Registered Successfully" });
        }
      });
    } else {
      res.send({ msg: "User is already Registered" });
    }
  } catch (err) {
    res.send({ msg: err });
  }
});

userRoute.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const findUser = await UserModel.findOne({ email });
    if (findUser) {
      bcrypt.compare(pass, findUser.pass, (err, hashed) => {
        if (hashed) {
          const token = jwt.sign({ userID: findUser._id }, "sarunnani");
          res.send({ msg: "Successfully Logged In", token: token });
        } else {
          res.send({ msg: "wrong credentials" });
        }
      });
    } else {
      res.send({ msg: "There was a problem logging in" });
    }
  } catch (error) {
    res.send({ msg: error });
  }
});

module.exports = { userRoute };
