const express = require("express");
const {
  getClient,
  getClientById,
  updateClientById,
  deleteClientById,
  postImage,
  postClientData,
} = require("../controllers/client");
const uploads = require("../middleware/uploadfile"); // Import the uploads middleware
const router = express.Router();

// Use the uploads middleware to handle file uploads
router.post("/uploads", uploads.single("clientImage"), postImage);
router.post("/", postClientData);
router.get("/", getClient);
router.get("/:id", getClientById);
router.put("/:id", uploads.single("clientImage"), updateClientById);
router.delete("/:id", deleteClientById);

module.exports = router;
