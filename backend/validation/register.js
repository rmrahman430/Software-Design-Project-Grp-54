const Validator = require("validator");
const isEmpty = require("is-empty");
const User = require("../models/userModel");

module.exports = async function validateRegisterInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.name = !isEmpty(data.name) ? data.name : "";

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required.";
  } else {
    const existingUser = await User.findOne({ username: data.username });
    if (existingUser) {
      errors.username = "Username is already taken.";
    }
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required.";
  } else {
    // Add password length check
    if (!Validator.isLength(data.password, { min: 8 })) {
      errors.password = "Password must be at least 8 characters long.";
    }
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required.";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
