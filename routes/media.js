const express = require("express");
const {
  getMediaFiles,
  postMediaFile,
  deleteMediaFile,
} = require("../controllers/media");
const uploads = require("../middleware/uploadRequestProposal");

const router = express.Router();

// Get a list of all images in the uploads folder
router.get("/", getMediaFiles);
router.post("/", uploads.single("file"), postMediaFile);
router.delete("/uploads/:file", deleteMediaFile);

module.exports = router;
