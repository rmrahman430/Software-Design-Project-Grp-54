const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        maxlength: 50
    },
    addressOne: {
        type: String,
        required: true,
        maxlength: 100
    },
    addressTwo: {
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

module.exports = Client = mongoose.model("clientInfo", clientSchema);