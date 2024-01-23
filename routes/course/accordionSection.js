const express = require("express");
const router = express.Router();
const accordionSectionController = require("../../controllers/course/accordionSection"); // Import your controller

router.post("/", accordionSectionController.createAccordion);
router.put("/:id", accordionSectionController.updateAccordion);
router.delete("/:id", accordionSectionController.deleteAccordion);

module.exports = router;
