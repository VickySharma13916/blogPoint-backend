const express = require("express");
const uploads = require("../middleware/uploadfile"); // Import the uploads middleware
const {
  postwebinarConferenceImage,
  postWebinarConferenceData,
  getWebinarConference,
  getWebinarConferenceById,
  updateWebinarConferenceById,
} = require("../controllers/webinarConference");
const { deleteEventConferenceById } = require("../controllers/eventConference");
const router = express.Router();

// Use the uploads middleware to handle file uploads
router.post(
  "/uploads",
  uploads.single("webinarConferenceImage"),
  postwebinarConferenceImage
);
router.post("/", postWebinarConferenceData);
router.get("/", getWebinarConference);
router.get("/:id", getWebinarConferenceById);
router.put(
  "/:id",
  uploads.single("webinarConferenceImage"),
  updateWebinarConferenceById
);
router.delete("/:id", deleteEventConferenceById);

module.exports = router;
