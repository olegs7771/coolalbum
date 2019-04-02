const express = require("express");
const router = express.Router();
//Bring in Model (models/User.js)
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/dev_keys").secredOrKey;
const passport = require("passport");

// @desc /Register New User
// @route POST /api/users/register
// @access Public

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ msg: "User Exists" });
    } else {
      //user not exists , we can create new one
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      //create hash password with bcrypt
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => res.json(err));
        });
      });
    }
    //end of creating new user
  });
});

// // @desc /Login User
// // @route POST /api/users/register
// // @access Public

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      //user not found
      return res.status(400).json({ msg: "User Not Found" });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //password from form compared to password from db(user matched)
        // user obtains jwt
        //1. create JWT payload with user info
        const payload = {
          id: user._id,
          name: user.name,
          email: user.email
        };
        jwt.sign(payload, keys, { expiresIn: 3600 }, (err, token) => {
          res.json({ success: true, token: "Bearer " + token });
        });
      } else {
        return res.status(400).json({ msg: "passport wrong" });
      }
    });
  });
});

// // @desc /Shows current logged user
// // @route POST /api/users/current
// // @access Private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ msg: "ok" });
  }
);

//auth with facebook

router.post(
  "/auth/facebook",
  passport.authenticate(
    "facebook-token",

    { session: false }
  ),
  (req, res) => {
    //generate token
    // create JWT with user info
    const payload = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    };
    jwt.sign(payload, keys, { expiresIn: 3600 }, (err, token) => {
      res.json({ success: true, token: "Bearer " + token });
    });
  }
);

module.exports = router;
