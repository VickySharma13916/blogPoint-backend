const express = require("express");
const {
  getheaderAddpage,
  getheaderAddPageById,
  updateheaderAddpageById,
  postheaderAddImage,
  postheaderAddData,
  deleteHeaderAddById,
} = require("../controllers/headerAdd");
const uploads = require("../middleware/uploadfile"); // Import the uploads middleware
const router = express.Router();

// Use the uploads middleware to handle file uploads
router.post("/uploads", uploads.single("headerAddImage"), postheaderAddImage);
router.post("/", postheaderAddData);
router.get("/", getheaderAddpage);
router.get("/:id", getheaderAddPageById);
router.put("/:id", uploads.single("headerAddImage"), updateheaderAddpageById);
router.delete("/:id", deleteHeaderAddById);

module.exports = router;
