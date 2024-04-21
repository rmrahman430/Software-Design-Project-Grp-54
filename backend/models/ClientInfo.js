const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fullname: {
        type: String,
        required: true,
        maxlength: 50
    },
    address1: {
        type: String,
        required: true,
        maxlength: 100
    },
    address2: {
        type: String,
        maxlength: 100
    },
    city: {
        type: String,
        required: true,
        maxlength: 100
    },
    state: {
        type: String,
        enum: ['CA', 'TX', 'FL', 'NY', 'PA', 'FL'],
        required: true,
        minlength: 2,
        maxlength: 2
    },
    zipcode: {
        type: String,
        maxlength: 5,
        required: true
    }
});

module.exports = mongoose.model("clientInfo", clientSchema);
