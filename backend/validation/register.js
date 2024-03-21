const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we may use validator functions
    data.username = !isEmpty(data.username) ? data.username : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.name = !isEmpty(data.name) ? data.name : "";

    // Username check
    if (Validator.isEmpty(data.username)) {
        errors.username = "Username field is required.";
    } else {
        User.findOne({ username: data.username }).then(existingUser => {
            if (existingUser) {
                errors.username = "Username is already taken.";
            }
        });
    }
    // Password check
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required.";
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "email field is required.";
    } else if (!data.email.includes('@')) {
        errors.email = "Please enter a valid email address.";
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = "name field is required.";
    } 

    // Return our errors object with any and all errors containted as well as an
    // isValid boolean that checks to see if we have any errors
    return {
        errors,
        isValid: isEmpty(errors)
    };
};