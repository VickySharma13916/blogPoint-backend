const express = require("express");
const router = express.Router();
const accordionSectionRoutes = require("./accordionSection");
const briefAboutRoutes = require("./briefAbout");
const courseOtherLinksRoutes = require("./courseOtherLink");
const joinImageRoutes = require("./courseJoinImageSlider");
const testimonialRoutes = require("./testimonials");
const trainingProfileRoutes = require("./trainingProfile");
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  postCourseImage,
} = require("../../controllers/course/courseTab");
const uploads = require("../../middleware/uploadfile");
const { postCourseTrainerImage } = require("../../controllers/course/trainerProfile");

// Define routes related to image uploads
router.post(
  "/upload/courseImage",
  uploads.single("courseImage"),
  postCourseImage
);
router.post(
  "/upload/courseTimeLineImage",
  uploads.single("courseTimeLineImage"),
  postCourseImage
);
router.post(
  "/upload/trainerImage",
  uploads.single("trainerImage"),
  postCourseTrainerImage
);
router.post(
  "/upload/studentImage",
  uploads.single("studentImage"),
  postCourseTrainerImage
);
router.post(
  "/upload/joinImage",
  uploads.single("joinImage"),
  postCourseTrainerImage
);
router.post(
  "/upload/AboutImage",
  uploads.single("AboutImage"),
  postCourseTrainerImage
);

// Rest of your routes that use :id parameter
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.post("/", createCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

// Routes for other related resources
router.use("/:id/accordion", accordionSectionRoutes);
router.use("/:id/briefabout", briefAboutRoutes);
router.use("/:id/joinImage", joinImageRoutes);
router.use("/:id/links", courseOtherLinksRoutes);
router.use("/:id/testimonial", testimonialRoutes);
router.use("/:id/trainingProfile", trainingProfileRoutes);

module.exports = router;
