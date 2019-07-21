const express = require("express");
const router = express.Router();
const passport = require("passport");
const ChatMessage = require("../../models/ChatMessage");

//Add new message
router.post(
  "/message",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("req.user.name", req.user.name);
    //Emit Data to the Client

    const newMessage = new ChatMessage({
      text: req.body.text,
      name: req.user.name
    });

    newMessage.save().then(msg => {
      const data = {
        text: msg.text,
        name: msg.name
      };
      req.app.io.emit("chatMsg", data);
    });
  }
);

//Fetch all chat messages

router.post(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    ChatMessage.find().then(msgs => {
      console.log("msgs", msgs);
    });

    req.app.io.emit("all", data);
  }
);
module.exports = router;
