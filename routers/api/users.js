const express = require("express");
const router = express.Router();
//Bring in Model (models/User.js)
const User = require("../../models/User");
const bcrypt = require("bcryptjs");

router.post("/test", (req, res) => res.json({ msg: "response from users" }));

// @desc /Register New User
// @route POST /api/users/register
// @access Public

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      res.status(400).json({ msg: "User Exists" });
    } else {
      //user not exists , we can create new one
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password1
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

  User.findOne({ email })
    .then(user => {
      if (user) {
        //user found! check for valid password

        bcrypt.compare(password, user.password).then(isMatch => {
          res.json(user.password);
        });
      } else {
        //user not found
        res.status(400).json({ msg: "User Not Found" });
      }
    })
    .catch(err => res.status(400).json(err));
});

module.exports = router;
