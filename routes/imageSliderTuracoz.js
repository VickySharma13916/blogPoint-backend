const express = require("express");
const {
  getImageSliderAbout,
  getImageSliderAboutById,
  updateImageSliderAboutById,
  deleteImageSliderAboutMember,
  postImageSliderAboutImage,
  postImageSliderAboutData,
} = require("../controllers/imageSliderTuracoz");
const uploads = require("../middleware/uploadfile"); // Import the uploads middleware
const router = express.Router();

// Use the uploads middleware to handle file uploads
router.post(
  "/uploads",
  uploads.single("turacozImage"),
  postImageSliderAboutImage
);
router.post("/", postImageSliderAboutData);
router.get("/", getImageSliderAbout);
router.get("/:id", getImageSliderAboutById);
router.put("/:id", uploads.single("turacozImage"), updateImageSliderAboutById);
router.delete("/:id", deleteImageSliderAboutMember);

module.exports = router;
