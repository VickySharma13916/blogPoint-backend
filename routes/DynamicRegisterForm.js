const express = require("express");
const {
  postDynamicRegisterFormData,
  getDynamicRegisterFormData,
  getDynamicRegisterFormDataById,
  updateDynamicRegisterFormDataById,
  deleteDynamicRegisterFormDataById,
} = require("../controllers/DynamicRegisterForm");
const router = express.Router();

router.post("/", postDynamicRegisterFormData);
router.get("/", getDynamicRegisterFormData);
router.get("/:id", getDynamicRegisterFormDataById);
// router.put("/:id", updateDynamicRegisterFormDataById);
router.delete("/:id", deleteDynamicRegisterFormDataById);

module.exports = router;
