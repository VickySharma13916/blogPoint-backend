const express = require("express");
const {
  getUserDetail,
  updateUserById,
  postUserData,
  getUserById,
  deleteUserById,
} = require("../controllers/user");
const router = express.Router();

router.get("/", getUserDetail);
router.post("/", postUserData);
router.put("/:id", updateUserById);
router.get("/:id", getUserById);
router.delete("/:id", deleteUserById);

module.exports = router;
