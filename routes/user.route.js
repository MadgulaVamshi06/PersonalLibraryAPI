const express = require("express");
const { register , login } = require("../controllers/user.controller");
const userRouter = express.Router();


/// register post method
userRouter.post("/register", register );

//login method
userRouter.post("/login", login ) ;

module.exports= userRouter ;