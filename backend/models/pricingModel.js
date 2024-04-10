const mongoose = require("mongoose");

const pricingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    gallonsRequested: {
        type: Number,
        required: true,
        min: 1
    },
    suggestedPrice: {
        type: Number,
        required: true,
        min: 0
    },
    address: {
        type: String,
        required: true
    },
    deliveryDate: {
        type: Date, 
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Pricing", pricingSchema);
