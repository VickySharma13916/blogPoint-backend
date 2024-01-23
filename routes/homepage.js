const express = require("express");
const {
  postImage,
  gethomepage,
  gethomepageById,
  updateHomepageById,
  deleteHomepageById,
  postData,
} = require("../controllers/homepage");
const uploads = require("../middleware/uploadfile"); // Import the uploads middleware
const router = express.Router();

// Use the uploads middleware to handle file uploads
router.post("/uploads", uploads.single("bannerImage"), postImage);
router.post("/", postData);
router.get("/", gethomepage);
router.get("/:id", gethomepageById);
router.put("/:id", uploads.single("bannerImage"), updateHomepageById);
router.delete("/:id", deleteHomepageById);

module.exports = router;
