const express = require("express");

const router = express.Router();

const upload = require("../multer");

const isAuth = require("../isAuth");

const {
    createIssue,
    getMyIssues,
    getMyLimitedIssues,
    getDashboardStats,
    deleteIssue
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