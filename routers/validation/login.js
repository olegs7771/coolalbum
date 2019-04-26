const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  //check for empty fields
  if (validator.isEmpty(data.email)) {
    errors.email = "Email can not be empty";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password can not be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
