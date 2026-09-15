const Issue = require("../models/issue");
const User = require("../models/user");


// ===============================
// ADMIN DASHBOARD STATS
// ===============================

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


// ===============================
// GET ALL ISSUES
// ===============================

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


// ===============================
// GET LIMITED ISSUES
// ===============================

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


// ===============================
// ADMIN PROFILE
// ===============================

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


module.exports = {
    getAdminDashboardStats,
    getAllIssues,
    getAdminLimitedIssues,
    getAdminProfile
};