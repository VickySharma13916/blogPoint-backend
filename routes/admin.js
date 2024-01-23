const express = require("express");
const uploads = require("../middleware/uploadfile"); // Import the uploads middleware
const {
  login,
  signUp,
  adminUpdate,
  changePasswordAdmin,
  forgotpassword,
  verifyforgotpassword,
  resetPassword,
  getAdminDetail,
  postAdminImage,
  adminDelete,
} = require("../controllers/admin");
const router = express.Router();

router.post("/uploads", uploads.single("adminImage"), postAdminImage);

// Login users
router.post("/login", login);

// Sign up users
router.post("/signup", signUp);

//password Change Admin
router.put("/change-password", changePasswordAdmin);

// Forgot Password
router.post("/forgot-password", forgotpassword);

// Forgot Password
router.post("/verify-token", verifyforgotpassword);

// Reset Password
router.post("/reset-password", resetPassword);

// Get Admin Detail
router.get("/", getAdminDetail);

//update Admin
router.put("/:id", uploads.single("adminImage"), adminUpdate);

//delete Admin
router.delete("/:id", adminDelete);

module.exports = router;
