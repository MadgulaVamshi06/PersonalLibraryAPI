const express = require("express");
const connection = require("./config/db");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());
const port =  8000 ;

app.get("/",(req,res)=>{
    res.send("WELCOME TO PERSONAL LIBRARY")
})


app.listen(port,async()=>{
    try {
        await connection;
        console.log(`Connected to MongoDB and Server is running on port ${port}`)
    } catch (error) {
        console.log("Error in connecting to port ")
    }
})