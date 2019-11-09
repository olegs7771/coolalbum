const imagemin = require("imagemin");
// const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");
const imageminMozjpeg = require("imagemin-mozjpeg");

module.exports = function compressorTheme() {
  const compressImgTheme = cb => {
    (async () => {
      const files = await imagemin(
        ["public/theme_image_upload/*.{jpg,png}"],
        "public/theme_image_compressed/",
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

  return compressImgTheme;
};
