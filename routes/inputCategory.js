const express = require("express");
const {
  getinputCategoryList,
  updateinputCategoryById,
  deleteinputCategoryById,
  postinputCategory,
} = require("../controllers/inputCategory");
const router = express.Router();

router.post("/", postinputCategory);
router.get("/", getinputCategoryList);
router.put("/:id", updateinputCategoryById);
router.delete("/:id", deleteinputCategoryById);

module.exports = router;
