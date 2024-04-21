const Validator = require("validator");
const isEmpty = require("is-empty");
const clientInfo = require("../models/ClientInfo");

module.exports = async function validateProfileInput(data) {
    let errors = {};

    data.fullname = !isEmpty(data.fullname) ? data.fullname : "";
    data.address1 = !isEmpty(data.address1) ? data.address1 : "";
    data.city = !isEmpty(data.city) ? data.city : "";
    data.state = !isEmpty(data.state) ? data.state : "";
    data.zipcode = !isEmpty(data.zipcode) ? data.zipcode : "";

    if (Validator.isEmpty(data.fullname)) {
        errors.fullname = "Fullname is required.";
    }
    

    if (Validator.isEmpty(data.address1)) {
        errors.address1 = "Address is required";
    }

    if (Validator.isEmpty(data.city)) {
        errors.city = "City is required";
    }

    if (Validator.isEmpty(data.state)) {
        errors.state = "State is required";
    }

    if (Validator.isEmpty(data.zipcode)) {
        errors.zipcode = "Zipcode is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};