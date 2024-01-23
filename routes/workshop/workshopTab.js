const express = require("express");
const {
  postWorkshopImage,
  getAllWorkshop,
  getWorkshopById,
  createWorkshop,
  updateWorkshop,
  deleteWorkshop,
} = require("../../controllers/workshop/workshopTab");
const router = express.Router();
const accordionSectionRoutes = require("./accordionSection");
const briefAboutRoutes = require("./briefAbout");
const workshopOtherLinks = require("./workshopOtherLink");
const trainingProfileRoutes = require("./trainerProfile");
const joinImageRoutes = require("./workshopJoinImageSlider");
const testimonialRoutes = require("./testimonial");

const uploads = require("../../middleware/uploadfile");

// Define routes related to image uploads
router.post(
  "/upload/workshopImage",
  uploads.single("workshopImage"),
  postWorkshopImage
);
router.post(
  "/upload/workshopTimeLineImage",
  uploads.single("workshopTimeLineImage"),
  postWorkshopImage
);
router.post(
  "/upload/trainerImage",
  uploads.single("trainerImage"),
  postWorkshopImage
);

router.post(
  "/upload/AboutImage",
  uploads.single("AboutImage"),
  postWorkshopImage
);

router.post(
  "/upload/studentImage",
  uploads.single("studentImage"),
  postWorkshopImage
);
router.post(
  "/upload/joinImage",
  uploads.single("joinImage"),
  postWorkshopImage
);

// Rest of your routes that use :id parameter
router.get("/", getAllWorkshop);
router.get("/:id", getWorkshopById);
router.post("/", createWorkshop);
router.put("/:id", updateWorkshop);
router.delete("/:id", deleteWorkshop);

// Routes for other related resources
router.use("/:id/accordion", accordionSectionRoutes);
router.use("/:id/briefabout", briefAboutRoutes);
router.use("/:id/links", workshopOtherLinks);
router.use("/:id/trainingProfile", trainingProfileRoutes);
router.use("/:id/joinImage", joinImageRoutes);
router.use("/:id/testimonial", testimonialRoutes);

module.exports = router;
