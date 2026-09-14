const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    firstname: String,
    lastname: String,
    email: String,
    password: String,


    resetPasswordToken: {
        type: String,
        default: null
    },

    resetPasswordExpire: {
        type: Date,
        default: null
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

    profileImage: {
        type: String,
        default: ""
    },

    refreshToken: {
        type: String,
        default: null
    }

})

module.exports = mongoose.model("User", userSchema)