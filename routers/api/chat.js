const express = require("express");

const router = express.Router();
const passport = require("passport");
const ChatMessage = require("../../models/ChatMessage");
const moment = require("moment");

//Add new message
router.post(
  "/message",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Emit Data to the Client

    const newMessage = new ChatMessage({
      text: req.body.text,
      name: req.user.name,
      uid: req.user._id
    });

    newMessage.save().then(() => {
      ChatMessage.find().then(chatMsgs => {
        res.status(200).json({ all: "Chat messages all" });
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
    ChatMessage.find().then(messages => {
      req.app.io.emit("all", messages);

      res.status(200).json({
        all: "All chat messages"
      });
    });
  }
);

//delete Chat Message by ID
router.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("req.body", req.body);
    const _id = req.body.id;

    ChatMessage.findOneAndRemove({ _id })
      .then(chatMsg => {
        res.status(200).json({ message: "Deleted" });
        ChatMessage.find().then(chatMsgs => {
          req.app.io.emit("all", chatMsgs);
        });
      })
      .catch(err => {
        res.status(400).json(err);
      });
  }
);
//show all online users
let sess;

router.get("/online", passport.authenticate("jwt"), (req, res) => {
  sess = req.session;
  console.log("sess", sess);
});

module.exports = router;
