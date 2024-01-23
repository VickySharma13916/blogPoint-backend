const express = require("express");
const {
  deleteHeaderById,
  updateheaderpageById,
  getheaderPageById,
  getheaderpage,
  postheaderData,
} = require("../controllers/header");
const router = express.Router();

router.post("/", postheaderData);
router.get("/", getheaderpage);
router.get("/:id", getheaderPageById);
router.put("/:id", updateheaderpageById);
router.delete("/:id", deleteHeaderById);

module.exports = router;
