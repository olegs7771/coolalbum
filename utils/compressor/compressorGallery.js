const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");
const imageminMozjpeg = require("imagemin-mozjpeg");

module.exports = function compressorGallery() {
  const compressImgGallery = cb => {
    (async () => {
      const files = await imagemin(
        ["public/gallery_upload/*.{jpg,png}"],
        "public/compressed_gallery/",
        {
          plugins: [
            imageminMozjpeg({
              quality: [14]
            }),
            imageminPngquant()
          ]
        }
      );

      //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
      return cb(files);
    })();
  };

  return compressImgGallery;
};
