const express = require("express");
const router = express.Router();
const {
  addWorkshopOtherLinks,
  deleteWorkshopOtherLinks,
  updateWorkshopOtherLinks,
} = require("../../controllers/workshop/workshopOtherLink"); // Import your controller

router.post("/", addWorkshopOtherLinks);
router.put("/:id", updateWorkshopOtherLinks);
router.delete("/:id", deleteWorkshopOtherLinks);

module.exports = router;
