const express = require("express");

const router = express.Router();

const upload = require("../multer.js")

const isAuth = require("../isAuth");
const isAdmin = require("../isadmin.js");

const {
    createIssue,
    getMyIssues,
    getMyLimitedIssues,
    getDashboardStats,
    deleteIssue,
    getAdminLimitedIssues
} = require("../controllers/issueController");


router.post(
    "/upload",
    isAuth,
    upload.single("image"),
    createIssue
);


router.get(
    "/myissues",
    isAuth,
    getMyIssues
);


router.get(
    "/mylimitedissues",
    isAuth,
    getMyLimitedIssues
);

router.get(
    "/AdminLimitedIssues",
    isAuth,
    isAdmin,
    getAdminLimitedIssues
);


router.get(
    "/dashboardstats",
    isAuth,
    getDashboardStats
);


router.delete(
    "/deleteIssue/:id",
    isAuth,
    deleteIssue
);


module.exports = router;