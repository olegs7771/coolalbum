const express = require("express");
const router = express.Router();
const passport = require("passport");

//Bring in Models
const User = require("../../models/User");
//Bring compressor
const compressor = require("../../utils/compressor/compressorAvatar");
const compressImg = compressor();

const isEmpty = require("../validation/isEmpty");
//Bring in Multer
const fileUploader = require("../../utils/multer/multerAvatar");
const upload = fileUploader();

//File System
const fse = require("fs-extra");

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
        //No Errors in uploaded image

        console.log("req.file.path", req.file.path);
        //passed multer//new file in /public/img
        if (req.file.filename) {
          //fire up compressor
          compressImg(cb => {
            cb.forEach(element => {});

            if (cb) {
              User.findOne({ _id: req.user.id })
                .then(user => {
                  //if user has no avatar --> avatar === ''
                  // nothing to delete in public/compresse
                  //Check for avatar === https||http

                  const reg = new RegExp("^(http|https|//www)://", "i");
                  if (isEmpty(user.avatar) || reg.test(user.avatar)) {
                    // avatar !=='' in db
                    //update db
                    if (process.env.NODE_ENV === "production") {
                      avatar = req.file.path.replace(
                        "public/upload_img",
                        "/compressed_img"
                      );
                    } else {
                      avatar = req.file.path.replace(
                        "public\\upload_img",
                        "\\compressed_img"
                      );
                    }
                    User.updateOne(
                      { _id: req.user.id },
                      {
                        $set: {
                          avatar: avatar,
                          rotation: req.body.rotation
                        }
                      },
                      { new: true }
                    )
                      .then(() => {
                        res.status(200).json(
                          {
                            avatar: "Avatar was successfully updated https://"
                          },
                          { avatar }
                        );
                      })
                      .catch(err => {});

                    // Delete row file from public/upload_img/
                    fse
                      .remove(req.file.path)
                      .then(() => {
                        console.log("deleted in public/upload_img/");
                      })
                      .catch(err => {
                        console.log(
                          "error to delete in public/upload_img/, err"
                        );
                      });
                  } else {
                    const userAvatar = user.avatar;
                    console.log("userAvatar ", userAvatar);
                    //path to file to be deleted in public/compressed_img
                    const pathAvatar = "public\\" + userAvatar;
                    console.log("pathAvatar :", pathAvatar);
                    //checks if file exists in /uploads
                    fse.pathExists(pathAvatar).then(exists => {
                      if (!exists) {
                        let avatar;

                        if (process.env.NODE_ENV === "production") {
                          avatar = req.file.path.replace(
                            "public/upload_img",
                            "/compressed_img"
                          );
                        } else {
                          avatar = req.file.path.replace(
                            "public\\upload_img",
                            "\\compressed_img"
                          );
                        }

                        User.updateOne(
                          { _id: req.user.id },
                          {
                            $set: {
                              avatar,
                              rotation: req.body.rotation
                            }
                          },
                          { new: true }
                        )
                          .then(() => {
                            res.status(200).json({
                              avatar:
                                "Avatar was successfully updated another avatar",
                              avatarPath: avatar,
                              reqFilePath: req.file.path
                            });
                          })
                          .catch(err => {
                            console.log("error update avatar", err);
                          });
                        // Delete row file from public/upload_img/
                        fse
                          .remove(req.file.path)
                          .then(() => {
                            console.log("deleted in public/upload_img/");
                          })
                          .catch(err => {
                            console.log(
                              "error to delete in public/upload_img/, err"
                            );
                          });
                        // //File exists in public/upload_img
                      } else {
                        console.log("there is file in public/compressed_img/ ");

                        //create new avatar path for db
                        if (process.env.NODE_ENV === "production") {
                          avatar = req.file.path.replace(
                            "public/upload_img",
                            "/compressed_img"
                          );
                        } else {
                          avatar = req.file.path.replace(
                            "public\\upload_img",
                            "\\compressed_img"
                          );
                        }

                        User.updateOne(
                          { _id: req.user.id },
                          {
                            $set: {
                              avatar,
                              rotation: req.body.rotation
                            }
                          },
                          { new: true }
                        )
                          .then(() => {
                            res.status(200).json({
                              avatar:
                                "Avatar was successfully updated anothe file",
                              avatarPath: avatar,
                              reqFilePath: req.file.path
                            });

                            //Delete previous file from public/compressed_img/
                            fse.unlink(pathAvatar, err => {
                              if (err) {
                                console.log("error delete file:", err);
                              }
                              console.log(pathAvatar, "was deleted");
                            });
                          })
                          .catch(err => {
                            console.log("error update avatar", err);
                          });

                        console.log(
                          "current file to delete from public/upload_img",
                          req.file.path
                        );

                        // Delete row file from public/upload_img/
                        fse
                          .remove(req.file.path)
                          .then(() => {
                            console.log("deleted in public/upload_img/");
                          })
                          .catch(err => {
                            console.log(
                              "error to delete in public/upload_img/, err"
                            );
                          });
                      }
                    });
                  }
                })
                .catch(err => {
                  console.log("error to find user: ", err);
                });
            }
          });
        } else {
          res.status(400).json({ msg: "Compressor doest fired" });
        }
      }
    });
  }
);

//Delete Avatar user.avatar === ''

router.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Delete File in public/compressed_img
    User.findById(req.user.id).then(user => {
      console.log("user.avatar", user.avatar);

      // nothing to delete in public/compresse
      //Check for avatar === ""  or  https||http
      const reg = new RegExp("^(http|https|//www)://", "i");

      if (isEmpty(user.avatar) || reg.test(user.avatar)) {
        console.log("avatar empty string or https");
        const _id = req.user.id;
        const set = {
          avatar:
            "//www.gravatar.com/avatar/d415f0e30c471dfdd9bc4f827329ef48?s=200&r=pg&d=mm"
        };
        User.findOneAndUpdate(
          { _id },
          {
            $set: set
          },
          {
            new: true
          }
        )
          .then(upUser => {
            res.status(200).json({
              avatar: "Avatar was deleted"
            });
          })
          .catch(err => {
            res.status(400).json(err);
          });
      } else {
        const userAvatar = user.avatar;
        console.log("userAvatar", userAvatar);

        //path to file to be deleted in public/compressed_img
        const pathAvatar = "public\\" + userAvatar;
        console.log("pathAvatar :", pathAvatar);
        //checks if file exists in /public/compressed_img/
        fse
          .pathExists(pathAvatar)
          .then(exists => {
            fse.unlink(pathAvatar, err => {
              if (err) {
                console.log("error delete file:", err);
              }
              console.log(pathAvatar, "was deleted");
            });
          })
          .catch(err => {
            console.log("no file in public/compressed_img/");
          });

        const _id = req.user.id;
        const set = {
          avatar:
            "//www.gravatar.com/avatar/d415f0e30c471dfdd9bc4f827329ef48?s=200&r=pg&d=mm"
        };
        User.findOneAndUpdate(
          { _id },
          {
            $set: set
          },
          {
            new: true
          }
        )
          .then(upUser => {
            res.status(200).json({
              avatar: "Avatar was deleted"
            });
          })
          .catch(err => {
            res.status(400).json(err);
          });
      }
    });
  }
);

module.exports = router;
