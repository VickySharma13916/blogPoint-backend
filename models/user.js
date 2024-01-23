const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  mobileNumber: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
  },
  isProposalRequest: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", userSchema);
