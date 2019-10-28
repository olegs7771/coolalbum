const express = require("express");
const router = express.Router();
const path = require("path");
//Bring in Model (models/User.js)
const User = require("../../models/User");
const Album = require("../../models/Album");

const passport = require("passport");
const validateAlbumCreate = require("../validation/albumCreate");
//Bring compressor
const compressor = require("../../utils/compressor/compressorAlbumTheme");
const compressImg = compressor();
//Bring in Multer
const fileUploader = require("../../utils/multer/multerAlbumTheme");
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
        if (!albums) {
          res.status(401).json({ Msg: "No Albums" });
        } else {
          res.status(200).json({ Msg: "Albums" });
        }
      })
      .catch(err => {
        res.status(400).json(err);
      });
  }
);

//Update/Create Album

router.post(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("req.body", req.body);

    upload(req, res, err => {
      // console.log("req.file", req.file);
      // console.log("req.body.title", req.body.title);
      // console.log("req.body.desc", req.body.desc);

      if (req.file === undefined) {
        return res.status(200).json({ error: "Please select file" });
      }
      if (err) {
        res.status(400).json({ error: err });
      } else {
        //No Errors in uploadin image
        if (req.file.filename) {
          compressImg(cb => {
            cb.forEach(elem => {
              console.log("elem", elem);
            });
            if (cb) {
              //Compression succided!
              //Create new Album
              console.log("req.user.id", req.user.id);

              const newAlbum = new Album({
                uid: req.user.id,
                title: "some album",
                text: "some text",
                location: "some location",
                image: "some image"
              });
              newAlbum
                .save()
                .then(album => {
                  console.log("album saved", album);
                })
                .catch(err => {
                  console.log("err to save albim :", err);
                });
            }
          });
        }
      }
    });
  }
);

module.exports = router;
