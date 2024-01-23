const express = require("express");
const {
  postwhitepaperImage,
  getwhitepaperpage,
  getwhitepaperPageById,
  updatewhitepaperpageById,
  postWhitepaperDataOfUser,
  postwhitepaperData,
  deleteWhitepaperById,
  deleteWhitepaperUserData,
} = require("../controllers/whitepaper");
const uploads = require("../middleware/uploadfile"); // Import the uploads middleware
const uploadFile = require("../middleware/uploadRequestProposal"); // Import the uploads middleware
const { postRequestFile } = require("../controllers/requestProposal");
const router = express.Router();

// Use the uploads middleware to handle file uploads
router.post(
  "/uploadFile",
  uploadFile.single("whitepaperFile"),
  postRequestFile
);
router.post("/uploads", uploads.single("whitepaperImage"), postwhitepaperImage);
router.post("/", postwhitepaperData);
router.get("/", getwhitepaperpage);
router.get("/:id", getwhitepaperPageById);
router.put("/:id", uploads.single("whitepaperImage"), updatewhitepaperpageById);
router.delete("/:id", deleteWhitepaperById);

router.post("/:id/userdetails", postWhitepaperDataOfUser);
router.delete("/:id/userdetails/:userid", deleteWhitepaperUserData);
module.exports = router;
