const express = require("express");
const {
  postCarrerFile,
  postCarrerData,
  postCarrerDataOfUser,
  getCarrerpage,
  getCarrerPageById,
  updateCarrerpageById,
  deleteCarrerById,
  deleteCarrerUserData,
} = require("../controllers/carrer");
const uploads = require("../middleware/uploadCarrerFile"); // Import the uploads middleware
const router = express.Router();

// Use the uploads middleware to handle file uploads
router.post("/uploads", uploads.single("carrerFile"), postCarrerFile);

router.post("/", postCarrerData);
router.get("/", getCarrerpage);
router.get("/:id", getCarrerPageById);
router.delete("/:id", deleteCarrerById);
router.put("/:id", uploads.single("carrerFile"), updateCarrerpageById);

// Carrer user details endpoints
router.post("/:id/userdetails", postCarrerDataOfUser);
router.delete("/:id/userdetails/:userid", deleteCarrerUserData);

module.exports = router;
