const Validator = require("validator");
const isEmpty = require("is-empty");
const bcrypt = require('bcrypt');
const User = require("../models/userModel");

module.exports = async function validateLoginInput(data) {
    let errors = {};

    data.username = !isEmpty(data.username) ? data.username : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    const existingUser = await User.findOne({ username: data.username });

    if (Validator.isEmpty(data.username)) {
        errors.username = "Username field is required.";
    } else if (!existingUser) {
        errors.username = "Username not found";
    }
    
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    } else if (existingUser) {
        const auth = await bcrypt.compare(data.password, existingUser.password);
        if (!auth) {
            errors.password = "Password incorrect";
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};