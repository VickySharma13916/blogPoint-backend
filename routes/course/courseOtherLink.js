const express = require("express");
const router = express.Router();
const {
  addCourseOtherLinks,
  updateCourseOtherLinks,
  deleteCourseOtherLinks,
} = require("../../controllers/course/courseOtherLink"); // Import your controller

router.post("/", addCourseOtherLinks);
router.put("/:id", updateCourseOtherLinks);
router.delete("/:id", deleteCourseOtherLinks);

module.exports = router;
