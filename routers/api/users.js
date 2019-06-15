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

const validator = require("validator");

if (process.env.NODE_ENV !== "production") {
  console.log("not production");
}
// @desc /Register New User
// @route POST /api/users/register
// @access Public
console.log("process.env.NODE_ENV", process.env.NODE_ENV);
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  console.log("req.body", req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;

  User.findOne({ email }).then(user => {
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
        bio: req.body.bio,
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

          const urlConfirm = `https://localhost:3000/confirm_registration/${
            user.token
          }/${user._id}`;
          const register = "Register";
          const data = {
            token: user.token,
            name: user.name,
            email: user.email,
            register,

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
            bio: user.bio,
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
            bio: user.bio,
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
    //set location

    const payload = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
      date: req.user.date,
      location: req.user.location,
      bio: req.user.location
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
    )
      .then(() => {
        console.log("updated");
      })
      .catch(err => {
        console.log(err);
      });
    res.json({ user: "User has been updated" });
  }
);

//check if Email exists for login form

router.post("/email", (req, res) => {
  if (process.env.NODE_ENV !== "production") {
    console.log("not production");
  } else {
    res.status(200).json({ env: "production" });
  }
  // console.log("req.body", req.body);
  const email = req.body.email;
  User.findOne({ email }).then(user => {
    // if (!user) {
    //   return res.status(400).json({ loginEmail: "Email not exists" });
    // } else {
    //   res.status(200).json({ loginEmail: "Email is valid" });
    // }
  });
});
//check if Email not exists for register form

router.post("/email_register", (req, res) => {
  console.log("req.body", req.body);
  const email = req.body.email;
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(200).json({ regEmail: "good!" });
    } else {
      res.status(400).json({ regEmail: "User with such email already exists" });
    }
  });
});

//send user email with password recovery instructions
router.post("/recover", (req, res) => {
  console.log("req.body", req.body);
  if (!req.body.email) {
    return res.status(400).json({ loginEmail: "Please fill in Email address" });
  }
  const email = req.body.email;
  User.findOne({ email }).then(user => {
    if (user) {
      //creating body for email
      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        location: user.location,
        avatar: user.avatar,
        date: user.date,
        location: user.location,
        bio: user.location
      };
      jwt.sign(payload, keys, { expiresIn: 3600 }, (err, token) => {
        // res.json({ success: true, token: "bearer  " + token });

        const URL = `https://localhost:3000/recover_newPass/${token}/${
          user._id
        }`;
        const name = user.name;
        const recover = "Recover";

        const data = {
          URL,
          name,
          recover
        };
        sendMail(data, response => {
          console.log(response.messageId);
          if (response.messageId) {
            console.log("response from mailer", response);

            res.status(200).json({
              loginEmail: `Message with a recovery instructions has been sent to ${
                response.envelope.to
              }. Please check Email`
            });
          }
        });
      });
    }
  });
});

//check if password1 valid onChange
router.post("/password", (req, res) => {
  console.log("req.body", req.body);
  const passport1 = req.body.password1;
  if (req.body.password1) {
    if (req.body.password1.length < 6) {
      return res.status(400).json({ password1: "Too short" });
    }
    if (req.body.password1.length > 8) {
      return res.status(400).json({ password1: "Too long" });
    }
    res.status(200).json({ password1: "Valid" });
  }
});

//matching passwords
router.post("/match", (req, res) => {
  if (req.body.password1.length === 0) {
    return res.status(400).json({ password1: "empty field" });
  }
  if (req.body.password2.length === 0) {
    return res.status(400).json({ password2: "empty field" });
  }

  if (req.body.password1 !== req.body.password2) {
    return res
      .status(400)
      .json({ password1: "No match", password2: "No match" });
  } else {
    // both passwords had been matched
    const email = req.body.email;
    //hash new password before $set in db
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(req.body.password2, salt, (err, hash) => {
        if (err) {
          console.log("err", err);
        }
        console.log("hash", hash);
        console.log("email", email);

        const password = hash;
        const set = {
          password
        };

        User.findOneAndUpdate(
          { email },
          {
            $set: set
          },
          { new: true }
        ).then(upUser => {
          console.log("upUser", upUser);
          res.status(200).json({
            message:
              "Your password been successfully updated. You can log in with your new password"
          });
        });
      });
    });
  }
});

module.exports = router;
