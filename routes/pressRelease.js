const express = require("express");
const uploads = require("../middleware/uploadfile"); // Import the uploads middleware
const {
  postPressReleaseImage,
  postPressReleaseData,
  getPressReleasepage,
  getPressReleaseById,
  updatePressReleasepageById,
  deletePressReleaseById,
} = require("../controllers/pressRelease");

const router = express.Router();

// Use the uploads middleware to handle file uploads
router.post(
  "/uploads",
  uploads.single("pressReleaseImage"),
  postPressReleaseImage
);
router.post("/", postPressReleaseData);
router.get("/", getPressReleasepage);
router.get("/:id", getPressReleaseById);
router.put(
  "/:id",
  uploads.single("pressReleaseImage"),
  updatePressReleasepageById
);
router.delete("/:id", deletePressReleaseById);

module.exports = router;
