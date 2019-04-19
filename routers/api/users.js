const express = require("express");
const router = express.Router();
//Bring in Model (models/User.js)
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/dev_keys").secredOrKey;
const passport = require("passport");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const sendMail = require("../../mailer/transporter");
const isEmpty = require("../validation/isEmpty");

// @desc /Register New User
// @route POST /api/users/register
// @access Public

router.post("/register", (req, res) => {
  //First line of validation

  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  console.log("passed first validation");

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ msg: "User Exists" });
    } else {
      //user not exists , we can create new one

      //Create Token to send to newTempUser email
      const payload = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      };

      jwt.sign(payload, keys, { expiresIn: 43200 }, (err, token) => {
        if (err) {
          throw err;
        }

        console.log("token", token);

        // here we got tempToken ready to send to new user
        //create data object for mailer trasporter
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          token
        });

        newUser.save().then(user => {
          const text = ` Dear ${
            req.body.name
          } Please confirm your registration in 12 hours period from now by click on following URL`;
          const urlConfirm = `https://polar-savannah-70702.herokuapp.com/confirm_registration/${
            user.token
          }`;
          const data = {
            token: user.token,
            name: user.name,
            email: user.email,
            text,
            URL: urlConfirm
          };
          sendMail(data, response => {
            console.log(response.messageId);
            if (response.messageId) {
              res.console.log("mail been sent");
            }
          });
          res.status(200).json({ msg: "Success! Please check your Email" });
        });
      });
    }
    //end of creating new user
  });
});

// @desc /Confirmation of New User
// @route POST /api/users/confirm_registration/:token
// @access Public
router.post("/confirmRegistration", (req, res) => {
  User.findOne({ token: req.body.token })
    .then(user => {
      if (!user) {
        return res.status(400).json({ error: "Registration has expired" });
      }

      //user been found. hashing password and creating confirmed user in db
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          const password = hash;
          const isAuthenticateUser = new User({
            name: user.name,
            email: user.email,
            confirmed: true,
            password
          });
          //here isAuthenticateUser ready

          isAuthenticateUser.save().then(user => {
            if (user) {
              User.findOneAndRemove({ confirmed: false }).then(() => {
                console.log("false been removed");
              });
            }
          });
        });
      });
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// // @desc /Login User
// // @route POST /api/users/register
// // @access Public

router.post("/login", (req, res) => {
  //First line of validation

  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  console.log("passed first validation");

  //check if user confirmed:true

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      //user not found
      return res.status(400).json({ email: "User Not Found" });
    }
    if (user.confirmed !== true) {
      return res.status(400).json({ email: "something wrong.." });
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
        return res.status(400).json({ password: "passport wrong" });
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
      email: req.user.email,
      avatar: req.user.avatar
    };
    jwt.sign(payload, keys, { expiresIn: 3600 }, (err, token) => {
      res.json({ success: true, token: "Bearer " + token });
    });
  }
);

module.exports = router;
