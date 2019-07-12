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
const imageminMozjpeg = require("imagemin-mozjpeg");

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
        plugins: [imageminMozjpeg([100]), imageminPngquant()]
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
        console.log("req.file.path", req.file.path);
        //passed multer//new file in /public/img
        if (req.file.filename) {
          //fire up compressor
          compressImg(cb => {
            if (cb) {
              // console.log("cb[0]['path']", cb[0]["path"]);
              //find previous file in db to be deleted
              User.findOne({ _id: req.user.id }).then(user => {
                const toDeleteImg = user.avatar; //"\\uploads\\myImage-000000000000.jpg"
                console.log("toDeleteImg", toDeleteImg);
                const pathToDeleteImg_in_uploads = `./public${toDeleteImg}`;

                //path to file to be deleted in uploads
                console.log(
                  "file delete in /uploads",
                  pathToDeleteImg_in_uploads
                );
                //checks if file exists in /uploads
                fse.pathExists(pathToDeleteImg_in_uploads).then(exists => {
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
                        avatar: "Avatar was successfully created."
                      });
                    });
                  } else {
                    console.log("there file in uploads");

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
                    )
                      .then(() => {
                        res.status(200).json({
                          avatar: "Avatar was successfully updated"
                        });

                        //Delete previouse file from /uploads || remove raw file from public/img
                        fse.unlink(pathToDeleteImg_in_uploads, err => {
                          if (err) throw err;
                          console.log(
                            pathToDeleteImg_in_uploads,
                            "was deleted"
                          );
                        });
                      })
                      .catch(err => {
                        console.log(err);
                      });
                  }
                });
                const pathToDeleteImg_in_img = pathToDeleteImg_in_uploads.replace(
                  "\\uploads\\",
                  "\\img\\"
                );
                console.log(
                  "crrent file to delete from public/img",
                  req.file.path
                );

                console.log("pathToDeleteImg_in_img", pathToDeleteImg_in_img);
                //Delete previouse file from /img
                fse
                  .remove(req.file.path)
                  .then(() => {
                    console.log("deleted in img");
                  })
                  .catch(err => {
                    console.log(err);
                  });
              });
            }
          });

          //Delete previous Avatar in /public/uploads
        }
      }
    });
  }
);

module.exports = router;
