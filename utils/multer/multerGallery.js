const multer = require("multer");
const path = require("path");

module.exports = function fileUploaderGallery() {
  // set storage engine
  const storage = multer.diskStorage({
    destination: "./public/gallery_upload/",
    filename: function(req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    }
  });

  // Init Upload
  const upload_gallery = multer({
    storage,
    limits: {
      fileSize: 10000000
    },
    //file filter
    fileFilter: function(req, file, cb) {
      // we create separate function
      checkFileType(file, cb);
    }
  }).single("gallery_img");
  // Check File Type Function
  function checkFileType(file, cb) {
    //Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    // Check mime

    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Images Only");
    }
  }

  return upload_gallery;
};
