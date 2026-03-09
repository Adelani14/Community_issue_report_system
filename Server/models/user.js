const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    firstname: String,
    lastname: String,
    email: String,
    password: String,

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

    profileImage: {
        type: String,
        default: ""
    }

})

module.exports = mongoose.model("User", userSchema)