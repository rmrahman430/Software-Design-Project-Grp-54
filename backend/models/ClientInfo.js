const mongoose = require("mongoose");
const { number } = require("yargs");

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
        enum: ['CA', 'TX', 'FL', 'NY', 'PA'],
        required: true,
        minlength: 2,
        maxlength: 2
    },
    zipcode: {
        type: Number,
        min: 5,
        max: 9,
        required: true
    }
});

module.exports = mongoose.model("clientInfo", clientSchema);