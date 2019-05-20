const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateCreateProfileInput(data) {
  let errors = {};

  //check for empty fields
  if (validator.isEmpty(data.name)) {
    errors.name = "Name can not be empty";
  }
  if (validator.isEmpty(data.status)) {
    errors.status = "Status can not be empty";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email can not be empty";
  }
  if (validator.isEmpty(data.location)) {
    errors.location = "Location can not be empty";
  }
  //Name Field
  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must contain between 2 and 30 characters";
  }
  //Email Field
  if (!validator.isEmail(data.email)) {
    errors.email = "Wrong email format";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
