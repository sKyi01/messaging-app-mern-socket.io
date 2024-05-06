const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/userModel.js");

dotenv.config();

const authenticate = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("user ID in auth",decoded)
      req.user = await User.findById(decoded.id).select("-password");
      console.log("user request body", req.user)

      next();
    } catch (error) {
      res.status(401).json({ message: "not authorized, token failed" });
    }
  }


  if(!token){
    res.status(401).json({message: "not authorized, token failed"})
  }

});

module.exports ={authenticate}
