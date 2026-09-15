const User = require("../models/user");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const {
    CreateAccessToken,
    CreateRefreshToken
} = require("../token");

const {
    forgotPasswordEmail,
    resetPasswordEmail,
    signUpEmail
} = require("../services/email");


// ======================================================
// SIGN UP
// ======================================================

const SignUp = async (req, res) => {

    const {
        email,
        password,
        firstname,
        lastname
    } = req.body;

    try {

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        const newUser = new User({
            email,
            password: hashedPassword,
            firstname,
            lastname
        });

        await newUser.save();
        await signUpEmail(newUser);

        return res.status(201).json({
            message: "User created successfully"
        });

    } catch (error) {

        console.error("Signup error:", error);

        return res.status(500).json({
            message: "Server error"
        });

    }
};


// ======================================================
// LOGIN
// ======================================================

const pingServer = async (req, res) => {
    try {

        return res.status(200).json({
            message: "server is awake"
        });


    } catch {
        console.log(error)
    }
}

const Login = async (req, res) => {

    const {
        email,
        password
    } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const accessToken = CreateAccessToken(
            user._id,
            user.role
        );

        const refreshToken = CreateRefreshToken(
            user._id,
            user.role
        );

        // Save refresh token in database
        user.refreshToken = refreshToken;

        await user.save();

        // Send refresh token as cookie
        res.cookie("refreshtoken", refreshToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: false
        });

        // Send access token to frontend
        return res.status(200).json({
            message: "Login successful",

            accessToken,

            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        console.error("Login error:", error);

        return res.status(500).json({
            message: "Server error"
        });

    }
};


// ======================================================
// LOGOUT
// ======================================================

const LogOut = async (req, res) => {

    try {

        res.clearCookie("refreshtoken");

        return res.status(200).json({
            message: "Logout successful"
        });

    } catch (error) {

        console.error("Logout error:", error);

        return res.status(500).json({
            message: "Server error"
        });

    }
};


// ======================================================
// REFRESH TOKEN
// ======================================================

const refreshToken = async (req, res) => {

    try {

        const token = req.cookies.refreshtoken;

        if (!token) {
            return res.status(401).json({
                message: "No refresh token"
            });
        }

        const payload = jwt.verify(
            token,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findOne({
            _id: payload.userID,
            refreshToken: token
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid refresh token"
            });
        }

        const accessToken = CreateAccessToken(
            user._id,
            user.role
        );

        return res.status(200).json({
            accessToken
        });

    } catch (error) {

        console.error("Refresh token error:", error);

        return res.status(401).json({
            message: "Invalid refresh token"
        });

    }
};


// ======================================================
// GET FIRSTNAME
// ======================================================

const getFirstname = async (req, res) => {

    try {

        const user = await User.findById(
            req.user.userID
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json(
            user.firstname
        );

    } catch (error) {

        console.error("Get firstname error:", error);

        return res.status(500).json({
            message: "Server error"
        });

    }
};


// ======================================================
// GET MY PROFILE
// ======================================================

const getMyProfile = async (req, res) => {

    try {

        const user = await User.findById(
            req.user.userID
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json(user);

    } catch (error) {

        console.error("Get profile error:", error);

        return res.status(500).json({
            message: "Server error"
        });

    }
};


// ======================================================
// UPDATE PROFILE
// ======================================================

const updateProfile = async (req, res) => {

    try {

        const {
            firstname,
            lastname,
            email
        } = req.body;

        const updatedUser =
            await User.findByIdAndUpdate(
                req.user.userID,
                {
                    firstname,
                    lastname,
                    email
                },
                {
                    new: true
                }
            );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json(
            updatedUser
        );

    } catch (error) {

        console.error("Update profile error:", error);

        return res.status(500).json({
            message: "Server error"
        });

    }
};


// ======================================================
// FORGOT PASSWORD
// ======================================================

const forgotPassword = async (req, res) => {

    const { email } = req.body;

    try {

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        const user = await User.findOne({
            email
        });

        if (!user) {
            return res.status(200).json({
                message:
                    "No account found. Check your mobile number or email address and try again."
            });
        }

        // Generate random token
        const resetToken =
            crypto.randomBytes(32).toString("hex");

        // Hash token before saving to database
        const hashedToken =
            crypto
                .createHash("sha256")
                .update(resetToken)
                .digest("hex");

        user.resetPasswordToken = hashedToken;

        user.resetPasswordExpire =
            Date.now() + 15 * 60 * 1000;

        await user.save();

        const resetUrl =
            `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        await forgotPasswordEmail(
            user,
            resetUrl
        );

        return res.status(200).json({
            message:
                "Check your email for the reset link."
        });

    } catch (error) {

        console.error(
            "Forgot password error:",
            error
        );

        return res.status(500).json({
            message: "Server error"
        });

    }
};


// ======================================================
// RESET PASSWORD
// ======================================================

const resetPassword = async (req, res) => {

    const { token } = req.params;

    const {
        password,
        confirmPassword
    } = req.body;

    try {

        if (!password || !confirmPassword) {
            return res.status(400).json({
                message:
                    "Password and confirm password are required"
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message:
                    "Password must be at least 6 characters"
            });
        }

        // Hash token from URL
        const hashedToken =
            crypto
                .createHash("sha256")
                .update(token)
                .digest("hex");

        // Find user with valid token
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: {
                $gt: Date.now()
            }
        });

        if (!user) {
            return res.status(400).json({
                message:
                    "Reset link is invalid or has expired"
            });
        }

        // Hash new password
        const hashedPassword =
            await bcrypt.hash(password, 10);

        user.password = hashedPassword;

        // Invalidate reset token
        user.resetPasswordToken = null;
        user.resetPasswordExpire = null;

        await user.save();

        await resetPasswordEmail(user);

        return res.status(200).json({
            message:
                "Password reset successfully"
        });

    } catch (error) {

        console.error(
            "Reset password error:",
            error
        );

        return res.status(500).json({
            message: "Server error"
        });

    }
};




module.exports = {

    SignUp,
    Login,
    LogOut,
    refreshToken,

    getFirstname,
    getMyProfile,
    updateProfile,

    forgotPassword,
    resetPassword,
    pingServer

};