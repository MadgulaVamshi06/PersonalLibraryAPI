const express = require("express");
const reviewRouter = express.Router();
const auth = require("../middleware/auth.middleware");
const ReviewModel = require("../models/review.model")
const BookModel = require("../models/books.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

reviewRouter.post("/addReview", auth, async (req, res) => {
    const { text, rating ,userId, userName, userEmail , userBook } = req.body;
    console.log("reqested body", req.body);
  
    try {
      const review = new ReviewModel({
        text, rating ,userId, userName, userEmail , userBook
      });
      await review.save();
      res.status(200).send("Review created successfully");
    } catch (error) {
      console.log("error", error);
      res.status(500).send("Internal Error");
    }
  } ) ;


  module.exports = reviewRouter ;