const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
    },
    fullname: {
        type: String,
        required: true,
        max: 50
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
        default: "https://partha-s-bucket.s3.ap-south-1.amazonaws.com/social-web-app/public/users/default-avatar-profile.jpg",
    },
    coverPic: {
        type: String,
        default: "https://partha-s-bucket.s3.ap-south-1.amazonaws.com/social-web-app/public/users/default-cover.jpg",
    },
    followers: {
        type: Array,
        default: [],
    },
    followings: {
        type: Array,
        default: [],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    desc: {
        type: String,
        default: "",
        max: 200
    },
    city: {
        type: String,
        max: 50
    },
    from: {
        type: String,
        max: 50
    },
    relationship: {
        type: Number,
        enum: [1, 2, 3]
    },
    gender: {
        type: Number,
        enum: [1, 2, 3]
    },

}, { timestamps: true })

module.exports = mongoose.model("User", UserSchema);