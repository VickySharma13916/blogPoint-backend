const express = require("express");
const {
  postFooterData,
  getFooterData,
  getFooterDataById,
  updateFooterDataById,
  deleteFooterDataById,
} = require("../controllers/footer");
const router = express.Router();

router.post("/", postFooterData);
router.get("/", getFooterData);
router.get("/:id", getFooterDataById);
router.put("/:id", updateFooterDataById);
router.delete("/:id", deleteFooterDataById);

module.exports = router;
