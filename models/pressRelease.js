const mongoose = require("mongoose");

const pressReleaseSchema = new mongoose.Schema({
  pressReleaseName: {
    type: String,
  },
  pressReleaseImage: {
    type: String,
  },
  pressReleaseLink: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("pressRelease", pressReleaseSchema);
