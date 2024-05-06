const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const {generateToken}=require('../config/generateToken.js');

const registerUser = expressAsyncHandler(async (req, res) => {

  console.log("request is coming")
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ messsage: "Please Enter all the fields" });
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400).json({ messsage: "User already exists" });
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "failed to create user" });
  }
});


const login = expressAsyncHandler(async(req,res)=>{
    const {email, password}=req.body;

    const user = await User.findOne({email});

    if(user &&  (await user.matchPassword(password))){

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
          });


    }




})


const allUsers= expressAsyncHandler(async(req,res)=>{

  const keyword= req.query.search ? {

    $or:[
      {name:{$regex: req.query.search,$options:"i"}},
      {email:{$regex: req.query.search,$options:"i"}}



    ]
  }:{};

  const users= await User.find(keyword).find({_id:{$ne:req.user._id}});
  res.send(users);

})

module.exports = { registerUser,login,allUsers };
