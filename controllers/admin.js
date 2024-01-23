const admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendVerificationMail = require("./forgotPasswordEmailSend");

const postAdminImage = async (req, res) => {
  try {
    let pressReleaseImage = "";
    if (req.file) {
      const { mimetype } = req.file;
      if (mimetype.startsWith("image/")) {
        pressReleaseImage = req.file.destination + req.file.filename;
      }
    }
    res.status(200).json({ imageUrl: pressReleaseImage });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
const createVerificationToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "10m" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userAdmin = await admin.login(email, password);
    const token = createToken(userAdmin._id);
    const userDetail = await admin.findById(userAdmin._id);
    res.status(200).json({ user: userDetail, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const adminUpdate = async (req, res) => {
  const userId = req.params.id;
  const updateData = req.body; // Updated fields
  try {
    // Perform the update operation
    const updatedUser = await admin.findByIdAndUpdate(userId, updateData, {
      new: true, // To return the updated document
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user: updatedUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const signUp = async (req, res) => {
  const { email, password, firstName, lastName, mobileNumber, adminImage } =
    req.body;
  try {
    const userAdmin = await admin.signup(
      email,
      password,
      firstName,
      lastName,
      mobileNumber,
      adminImage
    );
    const token = createToken(userAdmin._id);
    res.status(200).json({ user: userAdmin, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const changePasswordAdmin = async (req, res) => {
  // Change password route
  const { email, currentPassword, newPassword } = req.body;
  try {
    // Find the user by email
    const user = await admin.findOne({ email });
    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Check if the current password is correct
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect current password" });
    }
    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    // Update the user's password
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  // Change password route
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await admin.findOne({ email });
    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Update the user's password
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({ message: "Password Reset successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAdminDetail = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = req.query.limit
      ? parseInt(req.query.limit)
      : req.query.pageNumber
      ? 6
      : undefined;
    const result = {};
    const totalPosts = await admin.countDocuments().exec();
    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;
    result.totalDocs = totalPosts;
    if (startIndex > 0) {
      result.previous = {
        pageNumber: pageNumber - 1,
        limit: limit,
      };
    }
    if (endIndex < totalPosts) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }
    result.data = await admin
      .find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .exec();
    result.limit = limit;
    return res
      .status(200)
      .json({ msg: "Admin List Fetched Successfully", docs: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const forgotpassword = async (req, res) => {
  // Change password route
  const { email } = req.body;
  try {
    // Find the user by email
    const user = await admin.findOne({ email });
    // Check if the user exists
    if (!user) {
      return res.status(200).json({ message: "User Email not found" });
    }
    const token = createVerificationToken(user._id);
    const payload = {
      email: user.email,
      token: token,
    };
    sendVerificationMail(payload);
    return res
      .status(200)
      .json({ message: "Verification Link Send to the Email." });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const verifyforgotpassword = async (req, res) => {
  // Change password route
  const { id, token } = req.body;
  try {
    // Find the user by id
    const user = await admin.findOne({ id });
    // Check if the user exists
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    // Verify the token
    const checkToken = jwt.verify(token, process.env.JWT_SECRET);
    if (checkToken) {
      // Token is valid, you can proceed with password reset
      return res.status(200).json({ message: "Email Token Verified" });
    } else {
      // Token is invalid
      return res.status(400).json({ message: "Invalid Token" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const adminDelete = async (req, res) => {
  try {
      const { id } = req.params;
      const deletedData = await admin.findByIdAndRemove(id);
    if (!deletedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  forgotpassword,
  verifyforgotpassword,
  login,
  resetPassword,
  signUp,
  getAdminDetail,
  changePasswordAdmin,
  adminUpdate,
  postAdminImage,
  adminDelete,
};
