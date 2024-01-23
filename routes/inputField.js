const express = require("express");
const {
  postInputFieldData,
  getInputField,
  getInputFieldById,
  updateInputFieldById,
  deleteInputFieldMember,
} = require("../controllers/inputField");
const router = express.Router();

router.post("/", postInputFieldData);
router.get("/", getInputField);
router.get("/:id", getInputFieldById);
router.put("/:id", updateInputFieldById);
router.delete("/:id", deleteInputFieldMember);

module.exports = router;
