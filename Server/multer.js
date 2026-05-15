const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
 CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
 CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
 CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "png", "jpeg"]
  }
});

const upload = multer({ storage });

module.exports = upload;