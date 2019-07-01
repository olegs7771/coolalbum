const express = require("express");
const router = express.Router();
const passport = require("passport");
const Post = require("../../models/Post");
const User = require("../../models/User");

//Post Message from logged user to another user

router.post(
  "/post",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("req.body", req.body);
    //Create new Post
    const newPost = new Post({
      text: req.body.text,
      toID: req.body.toID,
      avatar: req.body.avatar
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

module.exports = router;
