const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validationEmailFormInput(data) {
  let errors = {};

  console.log(data);
  //Checking for empty fields

  if (isEmpty(data.name)) {
    errors.name = "Please Fill the Name";
  }
  if (isEmpty(data.company)) {
    errors.company = "Please Fill the Company";
  }
  if (isEmpty(data.email)) {
    errors.email = "Please Fill the Email";
  } else {
    //Checking for valid fields

    if (!validator.isEmail(data.email)) {
      errors.email = "Wrong Email Format";
    }
  }

  if (isEmpty(data.message)) {
    errors.message = "Please write something..";
  } else {
    if (!(validator.isLength(data.message), { min: 10, max: 500 })) {
      errors.message = "Message too short..";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
