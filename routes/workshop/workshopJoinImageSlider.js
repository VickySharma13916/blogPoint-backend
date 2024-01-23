const express = require("express");
const router = express.Router();
const {
  createJoinWorkshopImageSlider,
  updateJoinWorkshopImageSlider,
  deleteJoinWorkshopImageSlider,
} = require("../../controllers/workshop/workshopJoinImageSlider");

router.post("/", createJoinWorkshopImageSlider);
router.put("/:id", updateJoinWorkshopImageSlider);
router.delete("/:id", deleteJoinWorkshopImageSlider);

module.exports = router;
