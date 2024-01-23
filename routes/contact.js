const express = require("express");
const {
  postContactData,
  getContactpage,
  getContactPageById,
  updateContactById,
  deleteContactById,
} = require("../controllers/contact");
const router = express.Router();

router.post("/", postContactData);
router.get("/", getContactpage);
router.get("/:id", getContactPageById);
router.put("/:id", updateContactById);
router.delete("/:id", deleteContactById);

module.exports = router;
