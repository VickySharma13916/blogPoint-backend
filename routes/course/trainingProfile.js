const express = require("express");
const router = express.Router();
const {
  createTrainerProfile,
  updateTrainerProfile,
  deleteTrainerProfile,
} = require("../../controllers/course/trainerProfile");

router.post("/", createTrainerProfile);
router.put("/:id", updateTrainerProfile);
router.delete("/:id", deleteTrainerProfile);
module.exports = router;
