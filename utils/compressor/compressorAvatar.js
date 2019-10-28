const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");
const imageminMozjpeg = require("imagemin-mozjpeg");

module.exports = function compressor() {
  const compressImg = cb => {
    (async () => {
      const files = await imagemin(
        ["public/upload_img/*.{jpg,png}"],
        "public/compressed_img/",
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

  return compressImg;
};
