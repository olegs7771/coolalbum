const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateAlbumCreate(data) {
  let errors = {};
  console.log("data in validation", data);

  data.title = !isEmpty(data.title) ? data.title : "";
  data.desc = !isEmpty(data.desc) ? data.desc : "";

  if (!validator.isLength(data.title, { min: 3, max: 20 })) {
    errors.title = " Title between 3-20 chars";
  }
  if (!validator.isLength(data.desc, { min: 10, max: 50 })) {
    errors.desc = " Description between 10-50 chars";
  }
  if (isEmpty(data.title)) {
    errors.title = "Please Fill the Title";
  }
  if (isEmpty(data.desc)) {
    errors.desc = "Add some description";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
