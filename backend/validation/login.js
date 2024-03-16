const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we may use validator functions
    data.username = !isEmpty(data.username) ? data.username : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    // Username check
    if (Validator.isEmpty(data.username)) {
        errors.username = "Username field is required.";
    }
    
    // Password check
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    // Return our errors object with any and all errors containted as well as an
    // isValid boolean that checks to see if we have any errors
    return {
        errors,
        isValid: isEmpty(errors)
    };
};