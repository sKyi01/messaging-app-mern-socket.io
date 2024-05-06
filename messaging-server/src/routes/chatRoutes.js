const express =require("express");
const { authenticate } = require("../middlewares/authMiddleware.js");
const {accessChat,fetchChat}= require("../controller/chatController.js")

const router=express.Router();

router.route("/accesschat").post(authenticate, accessChat)
router.route("/fetchchat").get(authenticate, fetchChat)
//router.route("/group").post(authenticate, createChatGroup)
//router.route("/rename").put(authenticate, renameGroup)
//router.route("/groupremove").put(authenticate, removeGroup)
//router.route("/groupadd").put(authenticate, addToGroup)

module.exports=router;