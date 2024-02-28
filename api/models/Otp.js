const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true,
        max:6,
        min:6,
    },
    time: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true })

module.exports = mongoose.model("Otp", OtpSchema);