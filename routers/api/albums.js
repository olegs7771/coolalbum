const express = require("express");
const router = express.Router();
const path = require("path");
//File System
const fse = require("fs-extra");

//Bring in Model (models/User.js)
const User = require("../../models/User");
const Album = require("../../models/Album");

const passport = require("passport");
const validateAlbumCreate = require("../validation/albumCreate");

//Bring compressor  Album Theme
const compressorTheme = require("../../utils/compressor/compressorAlbumTheme");
const compressImgTheme = compressorTheme();

//Bring compressor Album Gallery
const compressorGallery = require("../../utils/compressor/compressorGallery");
const compressImgGallery = compressorGallery();

//Bring in Multer Album Theme
const fileUploader = require("../../utils/multer/multerAlbumTheme");
const upload = fileUploader();
//Bring in Multer Album Gallery
const fileUploaderGallery = require("../../utils/multer/multerGallery");
const upload_gallery = fileUploaderGallery();

const isEmpty = require("../validation/isEmpty");

//testing profiles route
router.get("/test", (req, res) => {
  res.status(200).json({ msg: "Test Success" });
});

//Get User Albums by req.user.id
//@Private Route
router.post(
  "/albums",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Album.find({ uid: req.user.id })
      .then(albums => {
        if (!albums) {
          res.status(401).json({ Msg: "No Albums" });
        } else {
          res.status(200).json(albums);
        }
      })
      .catch(err => {
        res.status(400).json(err);
      });
  }
);
//Get Album by id
//@Private Route
router.post(
  "/fetchAlbum",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Album.findById(req.body.id)
      .then(album => {
        if (!album) {
          res.status(200).json({ Msg: "No Albums" });
        } else {
          res.status(200).json(album);
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
      const { isValid, errors } = validateAlbumCreate(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }

      console.log("req.file", req.file);
      console.log("req.body.title", req.body.title);
      console.log("req.body.desc", req.body.desc);

      if (req.file === undefined) {
        return res.status(200).json({ error: "Please select file" });
      }
      if (err) {
        res.status(400).json({ error: err });
      } else {
        //No Errors in uploading image
        if (req.file.filename) {
          compressImgTheme(cb => {
            cb.forEach(elem => {
              console.log("elem", elem);
              if (cb) {
                //Compression succided!
                //Create new Album
                const themeImagePath = elem.path.substring(6);

                const newAlbum = new Album({
                  uid: req.user.id,
                  title: req.body.title,
                  desc: req.body.desc,
                  image: themeImagePath
                });
                newAlbum
                  .save()
                  .then(() => {
                    res.status(200).json({
                      album: ` Album ${req.body.title} was seccessfuly created`
                    });

                    //New Album has been created then delete in
                    // public/theme_image_upload
                    fse
                      .remove(req.file.path)
                      .then(() => {
                        console.log("deleted in uploads");
                      })
                      .catch(err => {
                        console.log("error to delete in uploads", err);
                      });
                  })
                  .catch(err => {
                    console.log("err to save album! :", err);
                  });
              }
            });
          });
        }
      }
    });
  }
);

router.post(
  "/add_gallery_img",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("req.body", req.body);

    upload_gallery(req, res, err => {
      console.log("req.file", req.file);

      if (req.file === undefined) {
        return res.status(200).json({ error: "Please select file" });
      }
      if (err) {
        res.status(400).json({ error: err });
      } else {
        //no errors
        if (req.file.filename) {
          //fire up compressor
          compressImgGallery(cb => {
            cb.forEach(elem => {
              console.log("elem", elem);
              //Remove row file from /upload
              fse
                .remove(req.file.path)
                .then(() => {
                  console.log("deleted in uploads");
                })
                .catch(err => {
                  console.log("error to delete in uploads", err);
                });
              console.log("req.body", req.body);
              Album.findById(req.body.id)
                .then(album => {
                  console.log("album", album);
                  //Album has been found
                  // we can add to gallery
                  const imagePath = elem.path.substring(6);
                  const newGalleryItem = {
                    comments: req.body.comments,
                    img_title: req.body.img_title,
                    img: imagePath,
                    rotation: req.body.rotation
                  };
                  if (album) {
                    album.gallery.unshift(newGalleryItem);
                    album.save().then(() => {
                      res.status(200).json({ gallery: "Image was added " });
                    });
                  }
                })
                .catch(err => {
                  console.log("error to find album", err);
                });
            });
          });
        }
      }
    });
  }
);

//Get all gallery images from Album by id

router.post(
  "/get_gallery_all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Album.findById(req.body.id)
      .then(album => {
        res.status(200).json(album.gallery);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  }
);

//Delete Album By id
//Private route

router.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Album.findById(req.body.id).then(album => {
      album.gallery.forEach(elem => {
        const fileToDeleteGallery = "public\\" + elem.img;
        fse.pathExists(fileToDeleteGallery).then(exists => {
          if (!exists) {
            console.log("no files to delete");
          }
          fse.unlink(fileToDeleteGallery, err => {
            console.log("error to delete gallery", err);
          });
        });
      });

      //theme album to delete
      const albumThemePath = "public" + album.image;
      console.log("albumThemePath", albumThemePath);
      //Delete in theme_img_compressed
      fse.pathExists(albumThemePath).then(path => {
        if (!path) {
          console.log("no file");
        } else {
          console.log("file exists");
          fse.unlink(albumThemePath, err => {
            if (err) {
              return console.log("error to delete theme", err);
            }
            console.log("deleted successfully in public");
            album.deleteOne().then(() => {
              res.status(200).json({ msg: "Deleted" });
            });
          });
        }
      });
      //Delete all gallery images in compressed_gallery
      console.log("album.gallery", album.gallery);
    });
  }
);
router.post(
  "/delete_image",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("req.body", req.body);
    Album.findById(req.body.album_id).then(album => {
      if (album) {
        console.log("album.gallery", album.gallery);
        //create filter method
        //Remove file from public/compressed_gallery
        const obj = album.gallery.find(elem => {
          return elem._id == req.body.image_id;
        });
        console.log("obj", obj);
        //From obtained object we get path to file
        const fileToDelete = "public\\" + obj.img;
        console.log("fileToDelete", fileToDelete);
        fse.pathExists(fileToDelete).then(exists => {
          if (!exists) {
            console.log(" not exists");
          }
          //file exists hence we can delete
          fse.remove(fileToDelete);
        });

        album.gallery = album.gallery.filter(elem => {
          console.log("elem", elem);

          return elem._id != req.body.image_id;
        });
        album.save().then(() => {
          res.status(200).json({ message: "Deleted " });
        });
      }
    });
  }
);

module.exports = router;
