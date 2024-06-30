const express = require("express");
const connection = require("./config/db");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());
const port =  8000 ;

const userRouter = require("./routes/user.route")
app.use("/users",userRouter)

const bookRouter = require("./routes/books.route")
app.use("/books",bookRouter)

const reviewRouter = require("./routes/reviews.route")
app.use("./reviews",reviewRouter)

const favouriteRouter = require("./routes/favouite.route")
app.use("./favourite",favouriteRouter)

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