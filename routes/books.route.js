const express = require("express");
const bookRouter = express.Router();
const auth = require("../middleware/auth.middleware");
const BookModel = require("../models/books.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// book post method

bookRouter.post("/addBook", auth, async (req, res) => {
    const { title, author, status, userId, userName, userEmail } = req.body;
    console.log("reqested body", req.body);
  
    try {
      const book = new BookModel({
        title,
        author,
        status,
        userId,
        userName,
        userEmail,
      });
      await book.save();
      res.status(200).send("Book created successfully");
    } catch (error) {
      console.log("error", error);
      res.status(500).send("Internal Error");
    }
  } ) ;

// book get method
bookRouter.get("/getBooks", auth, async (req, res) => {
  const { userId } = req.body;
  console.log("reqested body", req.body);

  try {
    const book = await BookModel.find({ userId });
    res.status(200).json(book);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal Error");
  }
});

// patch method
bookRouter.patch("/editBook/:bookId", auth, async (req, res) => {
  const { title, author, status, userId } = req.body;
  console.log("reqested body", req.body);

  const { bookId } = req.params;

  try {
    const book = await BookModel.findById(bookId);

    if(!book){
        return res.status(500).send(" Book not found");
    }
    if(book.userId !== userId){
        res.status(403).send("You are not authorized");
    }
    await BookModel.updateOne(
      {_id :bookId },
      {$set : {title , author, status}}
    )
    res.status(200).send("Book updated successfully");
  } catch (error) {
    console.log("error", error);
    res.status(500).send(" Error in updating ");
  }
});


// delete method 
bookRouter.delete("/deleteBook/:bookId", auth, async (req, res) => {
    const { bookId } = req.params;
    const {userId} = req.body;
    try {
      const book = await BookModel.findById(bookId);
  
      if(!book){
          return res.status(500).send(" Book not found");
      }
      if(book.userId !== userId){
          res.status(403).send("You are not authorized");
      }
      await BookModel.deleteOne(
        {_id :bookId },
      )
      res.status(200).send("Book deleted successfully");
    } catch (error) {
      console.log("error", error);
      res.status(500).send(" Error in deleting ");
    }
  });


module.exports = bookRouter;
