const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

require("./Connection");

const userRoutes = require("./Routes/userRoutes");
const issueRoutes = require("./Routes/issueRoutes");

const app = express();

const PORT = process.env.PORT || 5000;


// =======================
// MIDDLEWARE
// =======================

app.use(
    cors({
        origin: [
            "https://communityissuereportsystem.vercel.app",
            "http://localhost:5173"
        ],
        credentials: true
    })
);

app.use(cookieParser());

app.use(express.json());

app.use("/uploads", express.static("uploads"));


// =======================
// ROUTES
// =======================


app.use("/", userRoutes);

app.use("/", issueRoutes);



// =======================
// SERVER
// =======================

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});