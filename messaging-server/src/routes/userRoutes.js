const express = require('express');
const {registerUser,login, allUsers} = require('../controller/userController.js');
const { authenticate } = require('../middlewares/authMiddleware.js');


const router=express.Router();



router.route('/register').post(registerUser)
router.route('/login').post(login)
router.route('/alluser').get(authenticate ,allUsers)


module.exports= router;