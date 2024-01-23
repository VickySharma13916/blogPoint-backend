const express = require("express");
const router = express.Router();
const {
  createJoinWebinarImageSlider,
  updateJoinWebinarImageSlider,
  deleteJoinWebinarImageSlider,
} = require("../../controllers/webinar/webinarJoinImageSlider");

router.post("/", createJoinWebinarImageSlider);
router.put("/:id", updateJoinWebinarImageSlider);
router.delete("/:id", deleteJoinWebinarImageSlider);

module.exports = router;
