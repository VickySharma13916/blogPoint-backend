const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file?.originalname);
    cb(null, Date.now() + ext);
  },
});

const fileFilter = function (req, file, cb) {
  const allowedMimeTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
  ]; // Allowed mime types

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // File type is allowed
  } else {
    cb(new Error("Only PNG, WebP and JPEG/JPG formats are supported"), false); // Error for unsupported file types
  }
};

const limits = {
  fileSize: 1024 * 1024 * 2, // Limit file size to 2MB
};

const uploads = multer({ storage, fileFilter, limits });

module.exports = uploads;
