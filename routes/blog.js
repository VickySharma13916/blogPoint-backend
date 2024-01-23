const express = require("express");
const {
  postBlogImage,
  getblogpage,
  getBlogPageById,
  updateBlogpageById,
  postBlogData,
  deleteBlogById,
} = require("../controllers/blog");
const uploads = require("../middleware/uploadfile"); // Import the uploads middleware
const router = express.Router();

// Use the uploads middleware to handle file uploads
router.post("/uploads", uploads.single("blogImage"), postBlogImage);
router.post("/", postBlogData);
router.get("/", getblogpage);
router.get("/:id", getBlogPageById);
router.put("/:id", uploads.single("blogImage"), updateBlogpageById);
router.delete("/:id", deleteBlogById);

module.exports = router;
