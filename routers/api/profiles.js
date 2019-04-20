const express = require("express");
const router = express.Router();
//Bring in Model (models/User.js)
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const jwt = require("jsonwebtoken");
const keys = require("../../config/dev_keys").secredOrKey;
const passport = require("passport");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const isEmpty = require("../validation/isEmpty");

//testing profiles route
router.get("/test", (req, res) => {
  res.status(200).json({ msg: "Test Success" });
});

//post or update Profile

router.post(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("req.user", req.user);
    console.log("req.body", req.body);

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //check if profile exists
        if (!profile) {
          // here no profile found than create one:
          return res.json({ error: "No profile for this user" });
        } else {
          res.json(profile);
        }
      })
      //end check if profile exists
      .catch(err => {
        console.log(err);
      });
  }
);

module.exports = router;
