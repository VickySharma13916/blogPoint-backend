const express = require("express");
const router = express.Router();
const {
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../../controllers/course/testimonial"); // Import your controller

router.post("/", createTestimonial);
router.put("/:id", updateTestimonial);
router.delete("/:id", deleteTestimonial);

module.exports = router;
