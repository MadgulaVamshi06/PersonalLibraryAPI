const bcrypt = require("bcrypt") 
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
require("dotenv").config()

exports.register = async(req,res)=>{
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
            await user.save();
        res.status(200).send("user registered successfully");
        })
    } catch (error) {
        res.status(500).send("Internal Error");
    }
};

exports.login =async(req,res)=>{
    const{email , password} = req.body ;
    try {
        const user = await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password , user.password, (err,result)=>{
                if(err){
                    return res.status(500).send("Error in comparing passsword")
                }
                if(result){
                    const token = jwt.sign(
                        {email : user.email, name : user.username , id : user._id},
                        process.env.JWT_SECRET
                    )
                    return res.status(200).send({message : "user logged successfully ", token : token});
                    console.log(token)
                }else{
                    return res.status(401).send("Invalid Credential");
                }
            })
        }else{
            res.status(500).send("User not found")
        }       
    } catch (error) {
        res.status(500).send("Internal Error");
    }
};