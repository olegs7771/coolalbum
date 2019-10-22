const express = require("express");
const router = express.Router();
//Bring in Model (models/User.js)
const User = require("../../models/User");
const Profile = require("../../models/Profile");

const passport = require("passport");
const validateCreateProfileInput = require("../validation/profileCreate");

const isEmpty = require("../validation/isEmpty");

//testing profiles route
router.get("/test", (req, res) => {
  res.status(200).json({ msg: "Test Success" });
});

//post create or update Profile

module.exports = router;
