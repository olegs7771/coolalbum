const express = require("express");
const router = express.Router();

//Bring in Model (models/User.js)
const User = require("../../models/User");

router.post("/test", (req, res) => res.json({ msg: "response from users" }));

// @desc /Register New User
// @route POST /api/users/register
// @access Public

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      res.status(400).json({ msg: "email already exists" });
    } else {
      const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
      });
      newUser
        .save()
        .then(user => status(200).json(user))
        .catch(err => status(400).console.log(err));
    }
  });
});
// @desc /Login User
// @route POST /api/users/register
// @access Public

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => res.status(400).json(err));
});

module.exports = router;
