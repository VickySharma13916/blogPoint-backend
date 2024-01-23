const express = require("express");
const uploads = require("../middleware/uploadRequestProposal"); // Import the uploads middleware
const {
  postRequestFile,
  postRequestProposalData,
  getRequestProposalpage,
  getRequestProposalPageById,
  updateRequestProposalById,
  deleteRequestProposalById,
} = require("../controllers/requestProposal");
const router = express.Router();

// Use the uploads middleware to handle file uploads
router.post("/uploads", uploads.single("proposalFile"), postRequestFile);
router.post("/", postRequestProposalData);
router.get("/", getRequestProposalpage);
router.get("/:id", getRequestProposalPageById);
router.put("/:id", uploads.single("proposalFile"), updateRequestProposalById);
router.delete("/:id", deleteRequestProposalById);

module.exports = router;
