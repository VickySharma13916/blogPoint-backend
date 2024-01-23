const express = require("express");
const {
  postUserDetailData,
  getUserDetail,
  deleteUserdetailById
} = require("../controllers/userDetail");
const router = express.Router();

// Use the uploads middleware to handle file uploads
router.post("/", postUserDetailData);
router.get("/", getUserDetail);
// router.get("/:id", getwhitepaperPageById);
router.delete("/:id", deleteUserdetailById);

module.exports = router;
