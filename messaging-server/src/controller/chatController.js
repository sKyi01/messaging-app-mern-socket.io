const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const Chat = require("../models/chatModel.js");
const Message = require("../models/messageModel.js");

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  console.log("accesschat req body", req.user.id);

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { user: { $elemMatch: { $eq: req.user._id } } },
      { user: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("user", "-password")
    .populate("latestMessages");

  isChat = await User.populate(isChat, {
    path: "latestMessages.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      user: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "user",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

const fetchChat = asyncHandler(async (req, res) => {
  try {
    await Chat.find({ user: { $elemMatch: { $eq: req.user._id } } })
      .populate("user", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessages")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessages.sender",
          select: "name pic email",
        });
        res.status(200).send(results);

      });

  } catch (error) {

    res.status(400).json({message:`${error.message}`});
  }
});

module.exports = { accessChat, fetchChat };
