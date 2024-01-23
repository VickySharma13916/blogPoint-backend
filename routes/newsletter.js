const express = require("express");
const {
  postNewsletterImage,
  getNewsletterpage,
  getNewsletterPageById,
  updateNewsletterpageById,
  postNewsletterData,
  deleteNewsletterById,
  postNewsLetterDataOfUser,
  deleteNewsletterUserData,
} = require("../controllers/newsletter");
const uploads = require("../middleware/uploadfile"); // Import the uploads middleware
const router = express.Router();
const uploadFile = require("../middleware/uploadRequestProposal"); // Import the uploads middleware
const { postRequestFile } = require("../controllers/requestProposal");

// Use the uploads middleware to handle file uploads
router.post(
  "/uploadFile",
  uploadFile.single("NewsletterFile"),
  postRequestFile
);
router.post("/uploads", uploads.single("NewsletterImage"), postNewsletterImage);
router.post("/", postNewsletterData);
router.get("/", getNewsletterpage);
router.get("/:id", getNewsletterPageById);
router.put("/:id", uploads.single("NewsletterImage"), updateNewsletterpageById);
router.delete("/:id", deleteNewsletterById);
router.post("/:id/userdetails", postNewsLetterDataOfUser);
router.delete("/:id/userdetails/:userid", deleteNewsletterUserData);

module.exports = router;
