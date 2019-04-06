const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  console.log("data.name :", data.name);

  //check for empty fields
  if (validator.isEmpty(data.name)) {
    errors.name = "Name can not be empty";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email can not be empty";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password can not be empty";
  }
  //Name Field
  if (!validator.isLength(data.name, { min: 2, max: 12 })) {
    errors.name = "Name must contain between 2 and 12 characters";
  }
  //Email Field
  if (!validator.isEmail(data.email)) {
    errors.email = "Wrong email format";
  }
  //Email Password
  if (!validator.isAlphanumeric(data.password.toUpperCase())) {
    errors.password = "Password must contain numbers and letters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
