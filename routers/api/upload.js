const express = require("express");
const router = express.Router();
const passport = require("passport");
const path = require("path");
//Bring in Models
const User = require("../../models/User");
const Profile = require("../../models/Profile");

//File System
const fse = require("fs-extra");
//Multer
const multer = require("multer");

// set storage engine
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});
// Init Upload
const upload = multer({
  storage,
  limits: {
    fileSize: 100000
  },
  //file filter
  fileFilter: function(req, file, cb) {
    // we create separate function
    checkFileType(file, cb);
  }
}).single("myImage");

// Check File Type Function
function checkFileType(file, cb) {
  //Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime

  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Images Only");
  }
}

//Routes
router.post(
  "/update",

  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("req.user :", req.user);

    upload(req, res, err => {
      if (req.file === undefined) {
        return res.status(400).json({ error: "Please select file" });
      }

      if (err) {
        console.log("err", err);

        res.status(400).json({ error: err });
      } else {
        console.log("req.file", req.file);

        if (req.file.filename) {
          //Delete previous Avatar in /public/uploads
          User.findOne({ _id: req.user.id }).then(user => {
            const avatar = user.avatar;
            const file = `./public${avatar}`;
            console.log("file", file); //path to file to be deleted
            //check if there file in public/uploads
            if (fse.ensureFile(file)) {
              console.log("true");
              fse.unlink(file, err => {
                if (err) {
                  throw err;
                }
                console.log(file + " success file been deleted!");
              });
            }
          });

          const avatar = req.file.path.replace("public", "");

          User.update(
            { _id: req.user._id },
            {
              $set: {
                avatar
              }
            },
            { new: true }
          ).then(() => {
            console.log("updated");
          });
        }
      }
    });
  }
);

module.exports = router;
