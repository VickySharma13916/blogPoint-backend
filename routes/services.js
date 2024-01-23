const express = require("express");
const {
  getService,
  getServiceById,
  updateServiceById,
  postService,
  deleteServiceById,
} = require("../controllers/services");
const router = express.Router();

router.post("/", postService);
router.get("/", getService);
router.get("/:id", getServiceById);
router.put("/:id", updateServiceById);
router.delete("/:id", deleteServiceById);

module.exports = router;
