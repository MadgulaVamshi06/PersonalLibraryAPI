const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt") 
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
require("dotenv").config()

/// register post method
userRouter.post("/register",async(req,res)=>{
    const{username , email , password } = req.body;
    try {
        bcrypt.hash(password,3,async(err,hash)=>{
            if(err){
                return res.status(500).send("Error while hasing password");
            }
            const user = new UserModel({
                username,
                email,
                password : hash ,
            })
        })
        await user.save();
        res.status(200).send("user registered successfully");
    } catch (error) {
        res.status(500).send("Internal Error");
    }
})

module.exports= userRouter ;