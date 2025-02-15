
const express = require("express");
const favouriteRouter = express.Router();
const auth = require("../middleware/auth.middleware");
const BookModel = require("../models/books.model");
const UserModel = require("../models/user.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const favourites =  require("../favourites")

// favourite post route 

favouriteRouter.post("/addfavourite", auth, async (req, res) => {
    const {  userId} = req.params;
    console.log("reqested body", req.body);
  
    try {
      const user = await UserModel.findById({userId});
      if(!user){
        res.status(401).send("user not found");
      }

      if(user.favourites.includes(userId)){
        return res.status(400).send("book already added to favourites")
      }

      user.favourites.push(userId)
      await user.save();
      res.status(200).send("book added to favourites");
    } catch (error) {
      console.log("error", error);
      res.status(500).send("Internal Error");
    }
  } ) ;


  module.exports = favouriteRouter ;