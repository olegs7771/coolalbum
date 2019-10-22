const express = require("express");
const router = express.Router();
//Bring in Model (models/User.js)
const User = require("../../models/User");
const Album = require("../../models/Album");

const passport = require("passport");
const validateCreateProfileInput = require("../validation/profileCreate");

const isEmpty = require("../validation/isEmpty");

//testing profiles route
router.get("/test", (req, res) => {
  res.status(200).json({ msg: "Test Success" });
});

//Get User Albums@Private Route
router.post(
  "/albums",
  (passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Album.findById(req.user.id)
      .then(albums => {
        res.status(200).json(albums);
      })
      .catch(err => {
        res.status(400).json({ msg: "No Albums" });
      });
  })
);

module.exports = router;
