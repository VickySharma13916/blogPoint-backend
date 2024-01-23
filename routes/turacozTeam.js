const express = require("express");
const {
  postTuracozTeamImage,
  getTuracozTeam,
  getTuracozTeamById,
  updateTuracozTeamById,
  deleteTuracozTeamMember,
  postTuracozTeamData,
} = require("../controllers/turacozTeam");
const uploads = require("../middleware/uploadfile"); // Import the uploads middleware
const router = express.Router();

// Use the uploads middleware to handle file uploads
router.post("/uploads", uploads.single("teamImage"), postTuracozTeamImage);
router.post("/", postTuracozTeamData);
router.get("/", getTuracozTeam);
router.get("/:id", getTuracozTeamById);
router.put("/:id", uploads.single("teamImage"), updateTuracozTeamById);
router.delete("/:id", deleteTuracozTeamMember);

module.exports = router;
