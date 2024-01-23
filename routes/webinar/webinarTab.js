const express = require("express");
const {
  getAllWebinars,
  getWebinarById,
  createWebinar,
  updateWebinar,
  deleteWebinar,
  postWebinarImage,
} = require("../../controllers/webinar/webinarTab");
const router = express.Router();
const accordionSectionRoutes = require("./accordionSection");
const briefAboutRoutes = require("./briefAbout");
const WebinarOtherLinksRoutes = require("./webinarOtherLink");
const trainingProfileRoutes = require("./trainerProfile");
const joinImageRoutes = require("./webinarJoinImageSlider");
const testimonialRoutes = require("./testimonial");

const uploads = require("../../middleware/uploadfile");

// Define routes related to image uploads
router.post(
  "/upload/webinarImage",
  uploads.single("webinarImage"),
  postWebinarImage
);
router.post(
  "/upload/webinarTimeLineImage",
  uploads.single("webinarTimeLineImage"),
  postWebinarImage
);
router.post(
  "/upload/trainerImage",
  uploads.single("trainerImage"),
  postWebinarImage
);

router.post(
  "/upload/AboutImage",
  uploads.single("AboutImage"),
  postWebinarImage
);

router.post(
  "/upload/studentImage",
  uploads.single("studentImage"),
  postWebinarImage
);
router.post("/upload/joinImage", uploads.single("joinImage"), postWebinarImage);

// Rest of your routes that use :id parameter
router.get("/", getAllWebinars);
router.get("/:id", getWebinarById);
router.post("/", createWebinar);
router.put("/:id", updateWebinar);
router.delete("/:id", deleteWebinar);

// Routes for other related resources
router.use("/:id/accordion", accordionSectionRoutes);
router.use("/:id/briefabout", briefAboutRoutes);
router.use("/:id/links", WebinarOtherLinksRoutes);
router.use("/:id/trainingProfile", trainingProfileRoutes);
router.use("/:id/joinImage", joinImageRoutes);
router.use("/:id/testimonial", testimonialRoutes);

module.exports = router;
