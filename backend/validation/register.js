const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = async function validateLoginInput(data) {
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
        isValid: isEmpty(errors)
    };
};
