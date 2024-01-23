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
    "application/pdf", // PDF files
    "application/msword", // MS Word files
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // MS Word files (docx)
    "application/vnd.ms-powerpoint", // PPT files
    "application/vnd.openxmlformats-officedocument.presentationml.presentation", // PPTX files
  ];

  if (allowedMimeTypes.includes(file?.mimetype)) {
    cb(null, true); // File type is allowed
  } else {
    cb(
      new Error("Only PDF, Image, PPT and Word document formats are supported"),
      false
    ); // Error for unsupported file types
  }
};

const limits = {
  fileSize: 1024 * 1024 * 5, // Limit file size to 5MB
};

const uploadRequestFile = multer({ storage, fileFilter, limits });

module.exports = uploadRequestFile;
