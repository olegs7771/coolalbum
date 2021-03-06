const express = require("express");

const router = express.Router();
const passport = require("passport");
const ChatMessage = require("../../models/ChatMessage");

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
//Show All Chat Messages byDate
router.post(
  "/date",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("req.body.date", req.body.date);

    ChatMessage.find({
      date: {
        $gte: req.body.date
      }
    })
      .then(messagesByDate => {
        res.status(200).json({ message: "all messages for this date" });
        req.app.io.emit("bydate", messagesByDate);
      })
      .catch(err => {
        console.log("err", err);
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

module.exports = router;
