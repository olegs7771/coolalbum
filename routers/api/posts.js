const express = require("express");
const router = express.Router();
const passport = require("passport");
const Post = require("../../models/Post");
const User = require("../../models/User");
const app = express();

//Post Message from logged user to another user

router.post(
  "/post",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("req.body", req.body);
    //Create new Post
    const newPost = new Post({
      text: req.body.senderText,
      toID: req.body.toId,
      senderAvatar: req.body.senderAvatar,
      senderEmail: req.body.senderEmail,
      senderName: req.body.senderName,
      toEmail: req.body.toEmail
    });
    newPost
      .save()
      .then(post => {
        res.status(200).json(post);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  }
);

//Get posts by ID (for logged user)

router.post(
  "/get_posts",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.find({ toID: req.user._id }).then(post => {
      if (!post) {
        res.status(200).json({ post: "no posts" });
      } else {
        res.status(200).json(post);
        //emit data to the client
        req.app.io.emit("posts", post);
      }
    });
  }
);

module.exports = router;
