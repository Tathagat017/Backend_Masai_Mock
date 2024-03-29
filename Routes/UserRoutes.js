const express = require("express");
const mongoose = require("mongoose");
const { UserModel } = require("../Model/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserRouter = express.Router();

UserRouter.get("/", function (req, res) {
  res.status(200).send("<h1>Welcome to Tathagat's Mock NEM API</h1>");
});

UserRouter.post("/signup", async function (req, res) {
  try {
    let { email, password } = req.body;
    let exist = await UserModel.findOne({ email });
    if (exist) {
      res.status(200).send({ message: "Existing user, please signin" });
    } else {
      bcrypt.hash(password, 5, async function (err, hash) {
        if (err) {
          res.status(401).send("Error while registerating,please try again");
        }
        let user = await new UserModel({ email: email, password: hash });
        await user.save();
        res.status(200).send({ message: "Successfully registered" });
      });
    }
  } catch (err) {
    res.status(500).send("Error in signup,please try again");
  }
});

UserRouter.post("/login", async function (req, res) {
  const { name, email, password } = req.body;
  try {
    let user = await UserModel.findOne({ email: email });
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          var token = jwt.sign({ userId: user._id }, "key");
          res
            .status(200)
            .send({ message: "User login successfull", token: token });
        }
      });
    } else {
      res.status(404).send({ message: "user not registered yet" });
    }
  } catch (err) {
    res.status(401).send({ message: "login not successfull" });
  }
});

module.exports = { UserRouter };
