const expressAsyncHandler = require('express-async-handler');
const jwt = require ('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateToken= (id)=>{

    const token=jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })


return token;




}


module.exports = {generateToken}