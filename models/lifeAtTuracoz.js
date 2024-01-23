const mongoose = require("mongoose");

const lifeAtTuracozSchema = new mongoose.Schema({
  turacozteamName: {
    type: String,
    required: [true, "Name is required"],
  },
  turacozteamAbout: {
    type: String,
    required: [true, "Description is required"],
  },
  turacozteamDesignation: {
    type: String,
    required: [true, "Designation is required"],
  },
  turacozteamImage: {
    type: String,
    required: [true, "Image is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("lifeAtTuracoz", lifeAtTuracozSchema);
