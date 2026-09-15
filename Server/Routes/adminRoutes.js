const express = require("express");

const router = express.Router();

const isAuth = require("../isAuth");
const isAdmin = require("../isadmin.js");

const {
    getAdminDashboardStats,
    getAllIssues,
    getAdminLimitedIssues,
    getAdminProfile
} = require("../controllers/adminController");


// Admin dashboard statistics
router.get(
    "/admindashboardstats",
    isAuth,
    isAdmin,
    getAdminDashboardStats
);


// Get all issues
router.get(
    "/adminallissues",
    isAuth,
    isAdmin,
    getAllIssues
);


// Get limited issues
router.get(
    "/adminallissueslimit",
    isAuth,
    isAdmin,
    getAdminLimitedIssues
);


// Admin profile
router.get(
    "/adminprofile",
    isAuth,
    isAdmin,
    getAdminProfile
);


module.exports = router;