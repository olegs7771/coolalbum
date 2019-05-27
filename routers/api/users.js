const express = require("express");
const router = express.Router();
//Bring in Model (models/User.js)
const User = require("../../models/User");

const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
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

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ msg: "User Exists" });
    } else {
      //user not exists , we can create new one

      //Create Token to send to newTempUser email .expiration in 12h
      const payload = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        location: req.body.location,
        password: req.body.password
      };

      jwt.sign(payload, keys, { expiresIn: 43200 }, (err, token) => {
        if (err) {
          throw err;
        }

        // here we got tempToken  exp in 12h ,ready to send to new user
        //creating still not confirmed user
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          location: req.body.location,
          password: req.body.password,
          token
        });

        newUser.save().then(user => {
          //create data object for mailer trasporter

          const text = ` Dear ${
            req.body.name
          } Please confirm your registration in 12 hours period from now by click on following URL`;
          const urlConfirm = `https://localhost:3000/confirm_registration/${
            user.token
          }/${user._id}`;
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
  //req.body.token
  //req.body.id

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
          //gravatar
          const avatar = gravatar.url(req.body.email, {
            s: "200",
            r: "pg",
            d: "mm"
          });
          // create token with pre-confirmed user id!
          const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            location: user.location,
            password, //hashed
            avatar,
            password,
            date: user.date
          };

          jwt.sign(payload, keys, { expiresIn: 43200 }, (err, token) => {
            const newToken = "bearer  " + token;
            const resData = {
              token: newToken,
              id: user._id
            };

            User.updateMany(
              { email: user.email },
              {
                $set: {
                  confirmed: true,
                  password,
                  avatar
                }
              }
            ).then(update => {
              res.status(200).json(resData);
            });
          });
        });
      });
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
    //user found , we can delete tempToken form db
    User.update({ email }, { $unset: { token: "" } }).then(() => {
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          //password from form compared to password from db(user matched)
          // user obtains jwt
          //1. create JWT payload with user info
          const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            avatar: user.avatar,
            location: user.location,
            date: user.date
          };
          //creating token for exp 10h
          jwt.sign(payload, keys, { expiresIn: 36000 }, (err, token) => {
            res.json({ success: true, token: "bearer  " + token });
          });
        } else {
          return res.status(400).json({ password: "passport wrong" });
        }
      });
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
      location: "",

      avatar: req.user.avatar,
      date: req.user.date
    };
    jwt.sign(payload, keys, { expiresIn: 3600 }, (err, token) => {
      res.json({ success: true, token: "bearer  " + token });
    });
  }
);

//Update Current User
router.post(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("req.body", req.body);
    console.log("req.user", req.user);
    const upUser = {
      name: req.body.name,
      email: req.body.email,
      location: req.body.location,
      bio: req.body.bio
    };
    User.findOneAndUpdate(
      {
        _id: req.user._id
      },
      {
        $set: upUser
      },
      { new: true }
    );
    res.json({ msg: "ok" });
  }
);

module.exports = router;
