const express = require("express");
const {
  postTuracozTeamImage,
  getTuracozTeam,
  getTuracozTeamById,
  updateTuracozTeamById,
  deleteTuracozTeamMember,
  postTuracozTeamData,
} = require("../controllers/lifeAtTuracoz");
const uploads = require("../middleware/uploadfile"); // Import the uploads middleware
const router = express.Router();

// Use the uploads middleware to handle file uploads
router.post(
  "/uploads",
  uploads.single("turacozteamImage"),
  postTuracozTeamImage
);
router.post("/", postTuracozTeamData);
router.get("/", getTuracozTeam);
router.get("/:id", getTuracozTeamById);
router.put("/:id", uploads.single("turacozteamImage"), updateTuracozTeamById);
router.delete("/:id", deleteTuracozTeamMember);

module.exports = router;
