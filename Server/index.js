const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer')
const { uploadmedia } = require('./Cloud')
// const cloudinary = require("./cloudinary.js");
const cloudinary = require("./cloudinary.js");
const upload = require("./multer.js");
const Issue = require("./models/issue");

require('./Connection');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const { CreateAccessToken, CreateRefreshToken } = require('./token');
const isAuth = require('./isAuth');
const isAdmin = require('./isadmin.js');
const uploadimg = require("./upload.js");


// MIDDLEWARE

app.use(cookieParser());

// app.use("/uploads", express.static("uploads"))
app.use("/uploads", express.static("uploads"))
app.use(cors({
    origin: ["http://localhost:5173",
        "https://communityissuereportsystem.vercel.app/"
    ],
    credentials: true
}));

app.use(express.json());


// SIGNUP

app.post('/signup', async (req, res) => {
    const { email, password, firstname, lastname } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            firstname,
            lastname
        });

        await newUser.save();

        res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


// LOGIN

app.post('/login', async (req, res) => {
    const { email, password, } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        //else if all matches
        // const accessToken = CreateAccessToken(user._id);
        // const refreshToken = CreateRefreshToken(user._id);
        const accessToken = CreateAccessToken(user._id, user.role)
        const refreshToken = CreateRefreshToken(user._id, user.role)


        // Save refresh token in DB
        user.refreshToken = refreshToken;
        await user.save();

        // Send refresh token as cookie
        res.cookie('refreshtoken', refreshToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: false
        });

        // Send access token in response
        res.status(200).json({
            message: "Login successful",
            accessToken,
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


// LOGOUT

app.post('/logout', async (req, res) => {
    res.clearCookie('refreshtoken');
    return res.status(200).json({ message: "Logout successful" });
});


// REFRESH TOKEN

app.post('/refresh_token', async (req, res) => {
    const token = req.cookies.refreshtoken;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    let payload;
    try {
        payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(payload.userID);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    if (user.refreshToken !== token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const newAccessToken = CreateAccessToken(user._id);
    const newRefreshToken = CreateRefreshToken(user._id);

    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie('refreshtoken', newRefreshToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: false
    });

    res.status(200).json({ accessToken: newAccessToken });
});


// PROTECTED ROUTE

app.get('/protected', (req, res) => {
    try {
        const userID = isAuth(req);
        if (!userID) return res.status(401).json({ message: "Unauthorized" });

        res.status(200).json({
            message: "Protected data accessed successfully",
            userID
        });

    } catch (err) {
        res.status(401).json({ message: "Unauthorized" });
    }
});




app.post("/upload", isAuth, upload.single("image"), async (req, res) => {

    try {

        const userID = req.user.userID; // get from middleware

        const {
            title,
            issueType,
            priority,
            description,
            location
        } = req.body;

        const imageUrl = req.file.path;

        const newIssue = new Issue({
            title,
            issueType,
            priority,
            description,
            location,
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
        res.status(500).json({ message: "Server error" });
    }
});


// UPLOAD PROFILE PICTURE
app.post("/uploadProfile", isAuth, uploadimg.single("profileImage"), async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" })
        }

        const userID = req.user.userID

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "profile_images"
        })

        const updatedUser = await User.findByIdAndUpdate(
            userID,
            { profileImage: result.secure_url },
            { returnDocument: "after" }
        )

        res.json(updatedUser)

    } catch (err) {

        console.log(err)
        res.status(500).json({ message: "Upload failed" })

    }

})

// GET USER FIRSTNAME
app.get("/firstname", isAuth, async (req, res) => {

    const userID = req.user.userID; // because payload contains userID

    const user = await User.findById(userID);

    res.json(user.firstname);
});

// GET USER PROFILE INFO
app.get("/myprofile", isAuth, async (req, res) => {

    const user = await User.findById(req.user.userID);

    res.json(user);

});

// UPDATE USER PROFILE

app.put("/updateprofile", isAuth, async (req, res) => {

    try {

        const { firstname, lastname, email } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.user.userID,
            {
                firstname,
                lastname,
                email
            },
            { returnDocument: "after" }
        );

        res.json(updatedUser);

    } catch (error) {

        console.log(error);
        res.status(500).json({ message: "Server error" });

    }

});


// GET USER'S ISSUES

app.get("/myissues", isAuth, async (req, res) => {

    const userID = req.user.userID;

    const issues = await Issue.find({ reportedBy: userID });

    res.json(issues);
});
// GET USER'S ISSUES - LIMITED TO 3 FOR DASHBOARD PREVIEW
app.get("/mylimitedissues", isAuth, async (req, res) => {

    try {

        const userID = req.user.userID;

        const issues = await Issue.find({ reportedBy: userID })
            .sort({ createdAt: -1 })
            .limit(2);

        res.json(issues);

    } catch (error) {

        console.log(error);
        res.status(500).json({ message: "Server error" });

    }

});

// DASHBOARD STATS
app.get("/dashboardstats", isAuth, async (req, res) => {

    try {

        const userID = req.user.userID; // from JWT middleware

        const total = await Issue.countDocuments({ reportedBy: userID });

        const pending = await Issue.countDocuments({
            reportedBy: userID,
            status: "Pending"
        });

        const resolved = await Issue.countDocuments({
            reportedBy: userID,
            status: "Resolved"
        });

        res.json({
            total,
            pending,
            resolved
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({ message: "Server error" });

    }

});

// ADMIN ROUTE TO GET ALL ISSUES

app.get("/admindashboardstats", isAuth, isAdmin, async (req, res) => {

    const total = await Issue.countDocuments();
    const pending = await Issue.countDocuments({ status: "Pending" });
    const resolved = await Issue.countDocuments({ status: "Resolved" });
    const Progress = await Issue.countDocuments({ status: "Progress" });

    res.json({
        total,
        pending,
        resolved,
        Progress
    });
});

// ADMIN ROUTE TO GET ALL ISSUES

app.get("/adminallissues", isAuth, isAdmin, async (req, res) => {
    const issues = await Issue.find().populate("reportedBy", "firstname lastname email profileImage")


    res.json(issues);
});


app.get("/adminallissueslimit", isAuth, isAdmin, async (req, res) => {
    const issues = await Issue.find().populate("reportedBy", "firstname lastname email profileImage")

        .sort({ createdAt: -1 })
        .limit(3);
    res.json(issues);
});

// ADMIN ROUTE TO UPDATE ISSUE STATUS

app.put("/updateStatus/:id", isAuth, isAdmin, async (req, res) => {

    try {

        const { status } = req.body

        const updatedIssue = await Issue.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        )

        res.json(updatedIssue)

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }

})

// ADMIN ROUTE TO DELETE ISSUE
app.delete("/deleteIssue/:id", isAuth, isAdmin, async (req, res) => {

    try {

        const issue = await Issue.findByIdAndDelete(req.params.id)

        if (!issue) {
            return res.status(404).json({ message: "Issue not found" })
        }

        res.json({ message: "Issue deleted successfully" })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }

});

// ADMIN ROUTE TO GET PROFILE INFO
app.get("/adminprofile", isAuth, isAdmin, async (req, res) => {

    const userID = req.user.userID;

    const user = await User.findById(userID);

    res.json(user);
});

// USER ROUTE TO GET PROFILE INFO
app.get("/myprofile", isAuth, async (req, res) => {

    const user = await User.findById(req.user.id);

    res.json(user);

});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});