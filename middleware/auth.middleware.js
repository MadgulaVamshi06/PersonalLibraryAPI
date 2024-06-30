const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
        return res.status(401).send("You are not authorized")
    }

    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        console.log("Decoded Token " , decoded);
        req.body.userId = decoded.id;
        req.body.userEmail = decoded.email;
        req.body.userName = decoded.name;
        if(!decoded){
            return res.status(401).send("Invalid token")
        }
        next()
    } catch (error) {
        console.log(error);
        return res.status(401).send("You are not authenticated")
    }
}

module.exports = auth