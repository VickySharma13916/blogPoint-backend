const express = require("express");
const {
  getSeoData,
  getSeoDataById,
  postSeoData,
  postSeoImage,
  updateSeoDataById,
} = require("../controllers/seodata");
const router = express.Router();
const uploads = require("../middleware/uploadfile");

// Use the uploads middleware to handle file uploads
router.post("/uploads", uploads.single("metaImage"), postSeoImage);
router.post("/", postSeoData);
router.get("/", getSeoData);
router.get("/:id", getSeoDataById);
router.put("/:id", uploads.single("metaImage"), updateSeoDataById);

module.exports = router;
