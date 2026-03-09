const Issue = require("./models/issue");

const uploadmedia = async (req, res) => {
    try {

        const imageUrl = req.file.path; // Cloudinary URL

        const { title, issueType, priority, description, location } = req.body;

        const newIssue = new Issue({
            title,
            issueType,
            priority,
            description,
            location,
            imageUrl
        });

        await newIssue.save();
        console.log("issue reported successfully");

        res.status(200).json({
            message: "Issue reported successfully",
            data: newIssue
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Upload failed" });
    }
};

module.exports = { uploadmedia };