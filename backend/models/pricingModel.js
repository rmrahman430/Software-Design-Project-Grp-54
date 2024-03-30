const mongoose = require("mongoose");

const pricingSchema = new mongoose.Schema({
    amountOrdered: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
});

module.exports = mongoose.model("pricingModel", pricingSchema);
