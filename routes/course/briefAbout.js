const express = require("express");
const router = express.Router();
const {
  addBriefAbout,
  updateBriefAbout,
  deleteBriefAbout,
} = require("../../controllers/course/briefAbout"); // Import your controller

// Define routes related to briefAbout
router.post("/", addBriefAbout);
router.put("/:id", updateBriefAbout);
router.delete("/:id", deleteBriefAbout);

module.exports = router;
