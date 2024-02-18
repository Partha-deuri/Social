const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
    },
    email: {
        type: String,
        require: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        min: 6,
    },
    profilePic: {
        type: String,
        default: "",
    },
    coverPic: {
        type: String,
        default: "",
    },
    follwers: {
        type: Array,
        default: [],
    },
    follwings: {
        type: Array,
        default: [],
    },
    isAdmin: { 
        type: Boolean,
        default: false,
    },

}, { timestamps: true })

module.exports = mongoose.model("User", UserSchema);