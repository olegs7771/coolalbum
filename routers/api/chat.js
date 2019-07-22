const express = require("express");
require("dotenv").config();
const app = express();

const router = express.Router();
const passport = require("passport");
const ChatMessage = require("../../models/ChatMessage");

//Add new message
router.post(
  "/message",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("req.user.name", req.user.name);
    console.log("req.body", req.body);
    //Emit Data to the Client

    const newMessage = new ChatMessage({
      text: req.body.text,
      name: req.user.name
    });

    newMessage.save().then(() => {
      ChatMessage.find().then(chatMsgs => {
        req.app.io.emit("all", chatMsgs);
      });
    });
  }
);

//Show All Chat Messages
router.get(
  "/get_all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    ChatMessage.find().then(chatMsgs => {
      req.app.io.emit("all", chatMsgs);
    });
  }
);

module.exports = router;
