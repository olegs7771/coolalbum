const express = require("express");
const router = express.Router();
//Bring in Model (models/User.js)
const User = require("../../models/User");
const Album = require("../../models/Album");

const passport = require("passport");
const validateAlbumCreate = require("../validation/albumCreate");
//Bring compressor
const compressor = require("../../utils/multer/compressor");
const compressImg = compressor();
//Bring in Multer
const fileUploader = require("../../utils/multer/multer");
const upload = fileUploader();

const isEmpty = require("../validation/isEmpty");

//testing profiles route
router.get("/test", (req, res) => {
  res.status(200).json({ msg: "Test Success" });
});

//Get User Albums@Private Route
router.post(
  "/albums",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Album.findById(req.user.id)
      .then(albums => {
        res.status(200).json(albums);
      })
      .catch(empty => {
        res.status(200).json({ msg: "No Albums For this User" });
      });
  }
);

//Update/Create Album

router.post(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("req.body", req.body);
    const { errors, isValid } = validateAlbumCreate(req.body);
    // upload(req,res,err=>{
    //   if (req.file === undefined) {
    //     return res.status(400).json({ error: "Please select file" });
    // })
  }
);

module.exports = router;
