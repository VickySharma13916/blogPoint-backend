const express = require("express");
const router = express.Router();
const {
  createJoinCourseImageSlider,
  updateJoinCourseImageSlider,
  deleteJoinCourseImageSlider,
} = require("../../controllers/course/courseJoinImageSlider"); // Import your controller

router.post("/", createJoinCourseImageSlider);
router.put("/:id", updateJoinCourseImageSlider);
router.delete("/:id", deleteJoinCourseImageSlider);

module.exports = router;
