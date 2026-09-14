
const express = require("express");

const router = express.Router();

const isAuth = require("../isAuth");

const {
    SignUp,
    Login,
    LogOut,
    refreshToken,

    getFirstname,
    getMyProfile,
    updateProfile,

    forgotPassword,
    resetPassword
} = require("../controllers/allUserController")


// ==============================
// AUTH
// ==============================

router.post("/signup", SignUp);

router.post("/login", Login);

router.post("/logout", LogOut);

router.post("/refresh_token", refreshToken);


// ==============================
// PASSWORD
// ==============================

router.post(
    "/forgot-password",
    forgotPassword
);

router.post(
    "/reset-password/:token",
    resetPassword
);


// ==============================
// USER PROFILE
// ==============================

router.get(
    "/firstname",
    isAuth,
    getFirstname
);

router.get(
    "/myprofile",
    isAuth,
    getMyProfile
);

router.put(
    "/updateprofile",
    isAuth,
    updateProfile
);


module.exports = router;
