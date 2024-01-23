const express = require("express");

const uploads = require("../middleware/uploadfile"); // Import the uploads middleware
const {
  postAnnouncementImage,
  postAnnouncementData,
  getAnnouncement,
  getAnnouncementById,
  updateAnnouncementById,
  deleteAnnouncementById,
} = require("../controllers/announcement");
const router = express.Router();

// Use the uploads middleware to handle file uploads
router.post(
  "/uploads",
  uploads.single("announcementImage"),
  postAnnouncementImage
);
router.post("/", postAnnouncementData);
router.get("/", getAnnouncement);
router.get("/:id", getAnnouncementById);
router.put("/:id", uploads.single("announcementImage"), updateAnnouncementById);
router.delete("/:id", deleteAnnouncementById);

module.exports = router;
