const express = require("express");
const router = express.Router();
//Bring in Model (models/User.js)
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const jwt = require("jsonwebtoken");
const keys = require("../../config/dev_keys").secredOrKey;
const passport = require("passport");
const validateCreateProfileInput = require("../validation/profileCreate");

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
    //First line of validation
    const { errors, isValid } = validateCreateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          //profile exists
          // we can update current values
          const editedProfile = {
            name: req.body.name,
            email: req.body.email,
            status: req.body.status,
            location: req.body.location,
            avatar: req.user.avatar,
            user: req.user._id
          };
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: editedProfile },
            { new: true }
          )
            .then(profile => {
              if (profile) {
                res.status(200).json({
                  profile,
                  msg: "Profile has been seccefully updated"
                });
              }
            })
            .catch(err => {
              res.status(400).json(err);
            });
        } else {
          // no profile
          const newProfile = new Profile({
            name: req.body.name,
            email: req.body.email,
            avatar: req.user.avatar,
            user: req.user._id,
            status: req.body.status,
            location: req.body.location
          });
          newProfile
            .save()
            .then(user => {
              // return newly saved user
              res
                .status(200)
                .json({ user, msg: "Your Profile was successfully created" });
            })
            .catch(err => {
              res.status(400).json(err);
            });
        }
      })
      //end check if profile exists
      .catch(err => {
        console.log(err);
      });
  }
);

//get current profile
router.post(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.body.id })
      .then(profile => {
        res.status(200).json(profile);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  }
);
//Delete current profile
router.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          return res.status(401).json({ msg: "No Profile for this user" });
        }
        profile
          .remove()
          .then(() => {
            res.status(200).json({ msg: "Profile successefully been deleted" });
          })
          .catch(err => {
            res.status(400).json(err);
          });
      })
      .catch(err => {
        res.status(400).json(err);
      });
  }
);

module.exports = router;
