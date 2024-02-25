const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    convId: {
        type: String
    },
    sender: {
        type: String
    },
    text: {
        type: String
    },
    image: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model("Message", MessageSchema);