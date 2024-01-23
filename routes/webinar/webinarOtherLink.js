const express = require("express");
const router = express.Router();
const {
  addWebinarOtherLinks,
  updateWebinarOtherLinks,
  deleteWebinarOtherLinks,
} = require("../../controllers/webinar/webinarOtherLink"); // Import your controller

router.post("/", addWebinarOtherLinks);
router.put("/:id", updateWebinarOtherLinks);
router.delete("/:id", deleteWebinarOtherLinks);

module.exports = router;
