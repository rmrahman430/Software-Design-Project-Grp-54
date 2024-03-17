const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we may use validator functions
    data.fullname = !isEmpty(data.fullname) ? data.fullname : "";
    data.address1 = !isEmpty(data.address1) ? data.address1 : "";
    data.city = !isEmpty(data.city) ? data.city : "";
    data.state = !isEmpty(data.state) ? data.state : "";
    data.zipcode = !isEmpty(data.zipcode) ? data.zipcode : "";


    // Fullname check
    if (Validator.isEmpty(data.fullname)) {
        errors.fullname = "Fullname is required.";
    }
    
    // Address check
    if (Validator.isEmpty(data.address1)) {
        errors.address1 = "Address is required";
    }

    // City check
    if (Validator.isEmpty(data.city)) {
        errors.city = "City is required";
    }

    // State check
    if (Validator.isEmpty(data.state)) {
        errors.state = "State is required";
    }

    // Zipcode check
    if (Validator.isEmpty(data.zipcode)) {
        errors.zipcode = "Zipcode is required";
    }
    // Return our errors object with any and all errors containted as well as an
    // isValid boolean that checks to see if we have any errors
    return {
        errors,
        isValid: isEmpty(errors)
    };
};