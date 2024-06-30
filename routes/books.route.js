const express = require("express");
const bookRouter =  express.Router();

const BookModel = require("../models/books.model")
const bcrypt = require("bcrypt") 
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.middleware");
require("dotenv").config()


bookRouter.post("/addBook",auth,async(req,res)=>{
    const {title ,
    author,
    status,
    userId,
    userName,
    userEmail
     } = req.body ;
    console.log("reqested body" , req.body)

    try {
        const book = new BookModel ({title ,
            author,
            status,
            userId,
            userName,
            userEmail
            })
            await book.save();
            res.status(200).send("Book creatde successfully");

    } catch (error) {
        console.log("error",error);
        res.status(500).send("Internal Error");
    }
})



module.exports= bookRouter ;