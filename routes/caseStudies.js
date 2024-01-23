const express = require("express");
const {
  postCaseStudiesImage,
  getCaseStudiespage,
  getCaseStudiesPageById,
  updateCaseStudiespageById,
  postCaseStudiesDataOfUser,
  postCaseStudiesData,
  deleteCaseStudiesById,
  deleteCaseStudyUserData,
} = require("../controllers/caseStudies");
const uploads = require("../middleware/uploadfile"); // Import the uploads middleware
const uploadFile = require("../middleware/uploadRequestProposal"); // Import the uploads middleware
const { postRequestFile } = require("../controllers/requestProposal");
const router = express.Router();

// Use the uploads middleware to handle file uploads
router.post(
  "/uploadFile",
  uploadFile.single("CaseStudiesFile"),
  postRequestFile
);
router.post(
  "/uploads",
  uploads.single("CaseStudiesImage"),
  postCaseStudiesImage
);
router.post("/", postCaseStudiesData);
router.get("/", getCaseStudiespage);
router.get("/:id", getCaseStudiesPageById);
router.put(
  "/:id",
  uploads.single("CaseStudiesImage"),
  updateCaseStudiespageById
);
router.delete("/:id", deleteCaseStudiesById);
router.post("/:id/userdetails", postCaseStudiesDataOfUser);
router.delete("/:id/userdetails/:userid", deleteCaseStudyUserData);

module.exports = router;
