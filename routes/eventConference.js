const express = require("express");
const uploads = require("../middleware/uploadfile"); // Import the uploads middleware
const {
  postEventConferenceImage,
  postEventConferenceData,
  getEventConference,
  getEventConferenceById,
  updateEventConferenceById,
  deleteEventConferenceById,
} = require("../controllers/eventConference");
const router = express.Router();

// Use the uploads middleware to handle file uploads
router.post(
  "/uploads",
  uploads.single("eventConferenceImage"),
  postEventConferenceImage
);
router.post("/", postEventConferenceData);
router.get("/", getEventConference);
router.get("/:id", getEventConferenceById);
router.put(
  "/:id",
  uploads.single("eventConferenceImage"),
  updateEventConferenceById
);
router.delete("/:id", deleteEventConferenceById);

module.exports = router;
