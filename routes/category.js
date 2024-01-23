const express = require("express");
const {
  getCategoryList,
  updatecategoryById,
  deletecategoryById,
  postCategory,
} = require("../controllers/category");
const router = express.Router();

router.post("/", postCategory);
router.get("/", getCategoryList);
router.put("/:id", updatecategoryById);
router.delete("/:id", deletecategoryById);

module.exports = router;
