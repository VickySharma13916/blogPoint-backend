const express = require("express");
const router = express.Router();
const {
  createAccordion,
  updateAccordion,
  deleteAccordion,
} = require("../../controllers/workshop/accordionSection"); // Import your controller

router.post("/", createAccordion);
router.put("/:id", updateAccordion);
router.delete("/:id", deleteAccordion);

module.exports = router;
