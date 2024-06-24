const express =require("express");
const { authenticate } = require("../middlewares/authMiddleware.js");
const {accessChat,fetchChat,createGroupChat,renameGroup,removeFromGroup,addToGroup}= require("../controller/chatController.js")

const router=express.Router();

router.route("/accesschat").post(authenticate, accessChat)
router.route("/fetchChat").get(authenticate, fetchChat)
router.route("/group").post(authenticate, createGroupChat)
router.route("/rename").put(authenticate, renameGroup)
router.route("/groupremove").put(authenticate, removeFromGroup)
router.route("/groupadd").put(authenticate, addToGroup)

module.exports=router;