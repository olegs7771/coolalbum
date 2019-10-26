const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateAlbumCreate(data) {
  let errors = {};

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
