const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema({
    title: String,
    issueType: String,
    priority: String,
    description: String,
    location: String,
    imageUrl: String,

    status: {
        type: String,
        enum: ["Pending", "Progress", "Resolved"],
        default: "Pending"
    },

    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true });

module.exports = mongoose.model("Issue", IssueSchema);