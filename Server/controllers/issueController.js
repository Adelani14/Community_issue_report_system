const Issue = require("../models/issue");


// CREATE ISSUE
const createIssue = async (req, res) => {

    try {

        const userID = req.user.userID;

        const {
            title,
            issueType,
            priority,
            description,
            longlocation,
            latlocation,
            location
        } = req.body;

        const imageUrl = req.file?.path;

        const newIssue = new Issue({
            title,
            issueType,
            priority,
            description,
            location,
            longlocation,
            latlocation,
            imageUrl,
            reportedBy: userID
        });

        await newIssue.save();

        res.status(201).json({
            message: "Issue reported successfully",
            issue: newIssue
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }
};


// GET USER ISSUES
const getMyIssues = async (req, res) => {

    try {

        const userID = req.user.userID;

        const issues = await Issue.find({
            reportedBy: userID
        });

        res.status(200).json(issues);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }
};


// GET LIMITED USER ISSUES
const getMyLimitedIssues = async (req, res) => {

    try {

        const userID = req.user.userID;

        const issues = await Issue.find({
            reportedBy: userID
        })
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json(issues);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }
};


// DASHBOARD STATS
const getDashboardStats = async (req, res) => {

    try {

        const userID = req.user.userID;

        const total = await Issue.countDocuments({
            reportedBy: userID
        });

        const pending = await Issue.countDocuments({
            reportedBy: userID,
            status: "Pending"
        });

        const resolved = await Issue.countDocuments({
            reportedBy: userID,
            status: "Resolved"
        });

        res.status(200).json({
            total,
            pending,
            resolved
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }
};


// DELETE ISSUE
const deleteIssue = async (req, res) => {

    try {

        const issue = await Issue.findByIdAndDelete(
            req.params.id
        );

        if (!issue) {
            return res.status(404).json({
                message: "Issue not found"
            });
        }

        res.status(200).json({
            message: "Issue deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }
};

const getAdminLimitedIssues = async (req, res) => {

    try {

        const issues =
            await Issue.find()
                .populate(
                    "reportedBy",
                    "firstname lastname email profileImage"
                )
                .sort({
                    createdAt: -1
                })
                .limit(5);

        res.json(issues);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


const getAdminDashboardStats = async (req, res) => {

    try {

        const total =
            await Issue.countDocuments();

        const pending =
            await Issue.countDocuments({
                status: "Pending"
            });

        const resolved =
            await Issue.countDocuments({
                status: "Resolved"
            });

        const Progress =
            await Issue.countDocuments({
                status: "Progress"
            });

        res.json({
            total,
            pending,
            resolved,
            Progress
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


const getAllIssues = async (req, res) => {

    try {

        const issues =
            await Issue.find()
                .populate(
                    "reportedBy",
                    "firstname lastname email profileImage"
                );

        res.json(issues);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


const getAdminProfile = async (req, res) => {

    try {

        const userID = req.user.userID;

        const user =
            await User.findById(userID);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};






const updateIssueStatus = async (req, res) => {

    try {

        const { status } = req.body;

        const updatedIssue =
            await Issue.findByIdAndUpdate(

                req.params.id,

                {
                    status
                },

                {
                    new: true
                }
            );

        if (!updatedIssue) {

            return res.status(404).json({
                message: "Issue not found"
            });
        }

        res.json(updatedIssue);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    createIssue,
    getMyIssues,
    getMyLimitedIssues,
    getDashboardStats,
    deleteIssue,
    getAdminLimitedIssues,
    getAdminDashboardStats,
    getAllIssues,
    getAdminProfile,
    updateIssueStatus
};