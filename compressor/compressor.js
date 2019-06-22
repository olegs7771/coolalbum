const compress_images = require("compress-images");
module.exports = function compressor(input, output, cb) {
  if (input && output) {
    compress_images(
      input,
      output,
      { compress_force: false, statistic: true, autoupdate: true },
      false,
      { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
      { png: { engine: "pngquant", command: ["--quality=20-50"] } },
      { svg: { engine: "svgo", command: "--multipass" } },
      {
        gif: {
          engine: "gifsicle",
          command: ["--colors", "64", "--use-col=web"]
        }
      },
      function(err, completed) {
        if (completed === true) {
          // Doing something.
          return cb(completed);
        }
      }
    );
  }
};
