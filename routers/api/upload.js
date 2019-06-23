const express = require("express");
const router = express.Router();
const passport = require("passport");
const path = require("path");
//Bring in Models
const User = require("../../models/User");
//Bring compressor
// const compressor = require("../../compressor/compressor");
const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");

//File System
const fse = require("fs-extra");
//Multer
const multer = require("multer");

// set storage engine
const storage = multer.diskStorage({
  destination: "./public/img/",
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
    fileSize: 10000000
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

//Firing Compressor
function compressImg(cb) {
  (async () => {
    const files = await imagemin(
      ["public/img/*.{jpg,png}"],
      "public/uploads/",
      {
        plugins: [imageminJpegtran(), imageminPngquant({ quality: "65-80" })]
      }
    );

    //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
    return cb(files);
  })();
}

//Route Private
//Updating Avatar in User
router.post(
  "/update",

  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    upload(req, res, err => {
      if (req.file === undefined) {
        return res.status(400).json({ error: "Please select file" });
      }

      if (err) {
        console.log("err", err);

        res.status(400).json({ error: err });
      } else {
        // console.log("req.file", req.file);
        //passed multer

        if (req.file.filename) {
          //Delete previous Avatar in /public/uploads
          User.findOne({ _id: req.user.id }).then(user => {
            const avatar = user.avatar;
            console.log("avatar", avatar);

            const file = `./public${avatar}`;

            //path to file to be deleted.
            console.log("file delete in /uploads", file);
            if (file) {
              //file passed multer and ready for compressor
              compressImg(cb => {
                if (cb) {
                  console.log("cb[0]['path']", cb[0]["path"]);
                  const fileToDelete = file.replace("\\uploads\\", "\\img\\");
                  console.log("fileToDelete", fileToDelete);
                  //Delete previouse file from /img
                  fse
                    .remove(fileToDelete)
                    .then(() => {
                      console.log("deleted");
                    })
                    .catch(err => {
                      console.log(err);
                    });
                  //delete in uploads
                }
              });
            }

            //check if there file in public/uploads
            fse.pathExists(file).then(exists => {
              if (!exists) {
                console.log("no file in uploads");

                //There is no such file in /public/uploads
                const avatar = req.file.path.replace(
                  "public\\img",
                  "\\uploads"
                );

                User.update(
                  { _id: req.user.id },
                  {
                    $set: {
                      avatar
                    }
                  },
                  { new: true }
                ).then(() => {
                  res.status(200).json({
                    avatar:
                      "Avatar has been successfully updated.Please Login again."
                  });
                });
              } else {
                console.log("there file in uploads");

                const avatar = req.file.path.replace(
                  "public\\img",
                  "\\uploads"
                );
                console.log(avatar, "---> to delete in uploads");
                User.update(
                  { _id: req.user.id },
                  {
                    $set: {
                      avatar
                    }
                  },
                  { new: true }
                )
                  .then(() => {
                    res.status(200).json({
                      avatar: "Avatar was successfully updated"
                    });

                    //Delete previouse file from /uploads
                    fse.unlink(file, err => {
                      if (err) throw err;
                      console.log(file, "was deleted");
                    });
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }
            });
          });
        }
      }
    });
  }
);

module.exports = router;
